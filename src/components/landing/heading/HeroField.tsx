import { useEffect, useRef } from 'react'

/**
 * The front page's animated hero field — a Three.js wireframe terrain.
 *
 * What it replaces: the `blueprint` backdrop drew its grid as two CSS
 * `linear-gradient` layers (a 40px minor grid and a 200px major one) behind a
 * radial mask. Two flat lattices at different pitches over a diagonal sweep
 * never line up with each other — the major rules land wherever the element's
 * top-left corner happens to be, which moves with the viewport — so the
 * backdrop read as a slightly broken drawing rather than a plan.
 *
 * This draws one real grid instead, in perspective, and moves it: a lattice on
 * the XZ plane displaced by three layered sines in the vertex shader, running
 * to a horizon behind the headline. Only ONE grid exists, so there is nothing
 * for it to be misaligned with, and the perspective convergence is computed
 * rather than faked with a mask.
 *
 * It is deliberately a fallback-first component:
 *
 * - The CSS backdrop underneath still paints everything else (the two lights,
 *   the sweep, the grain, the vignette) and still paints its own flat grid.
 *   That grid is faded out by a `:has([data-hero-field="live"])` rule in
 *   `Heading.astro` — i.e. only once this canvas has actually put a frame on
 *   screen. No WebGL, no JS, a context that fails to create: the page keeps the
 *   old backdrop and nothing is missing.
 * - `three` is imported dynamically inside the effect, so it is a separate
 *   chunk fetched after the hero has already painted rather than part of the
 *   initial bundle.
 * - `prefers-reduced-motion: reduce` renders exactly one frame and never starts
 *   the loop. The field is still there, it just holds still.
 *
 * The loop is also stopped whenever the hero scrolls out of view or the tab is
 * hidden — this is the first section of a long page, so most of a session is
 * spent somewhere it cannot be seen.
 */

type Props = {
    className?: string
}

/** Lattice resolution and extent, in world units. */
const COLS = 96
const ROWS = 92
const SPAN_X = 92
const SPAN_Z = 104
/** How far the near edge sits behind the camera, so the grid runs off-frame. */
const NEAR_Z = 12

const VERT = /* glsl */ `
uniform float uTime;
uniform float uNear;
uniform float uFar;
varying float vAlpha;
varying float vHeight;

/* Three sines at unrelated frequencies: two travelling across the plane in
   opposite directions and one diagonal. Nothing here is periodic over the
   grid's own spacing, which is what stops the surface from looking like it is
   pulsing in place. */
float relief(vec2 p, float t) {
    return sin(p.x * 0.17 + t * 0.55) * 0.85
         + sin(p.y * 0.21 - t * 0.72) * 0.62
         + sin((p.x + p.y) * 0.085 + t * 0.31) * 1.05;
}

void main() {
    vec3 p = position;
    p.y = relief(p.xz, uTime);
    vHeight = p.y;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    /* Distance fade, standing in for fog: a custom material gets none of
       three's fog chunks, and doing it here means the alpha can also carry the
       edge fades below. */
    vAlpha = 1.0 - smoothstep(uNear, uFar, dist);
    /* Side fade, so the lattice ends in air rather than at the element edge. */
    vAlpha *= 1.0 - smoothstep(0.55, 1.0, abs(p.x) / ${(SPAN_X / 2).toFixed(1)});
    /* And a short fade on the rows nearest the camera, which are enormous. */
    vAlpha *= smoothstep(0.0, 14.0, dist);

    gl_Position = projectionMatrix * mv;
}
`

const FRAG = /* glsl */ `
uniform vec3 uLow;
uniform vec3 uHigh;
uniform float uOpacity;
varying float vAlpha;
varying float vHeight;

void main() {
    /* Crests read as the drawn line, troughs sink towards the backdrop. */
    float lift = smoothstep(-1.6, 1.9, vHeight);
    vec3 col = mix(uLow, uHigh, lift);
    float a = vAlpha * uOpacity * (0.55 + 0.45 * lift);
    if (a <= 0.001) discard;
    gl_FragColor = vec4(col, a);
}
`

const POINT_VERT = /* glsl */ `
uniform float uTime;
uniform float uNear;
uniform float uFar;
uniform float uPixelRatio;
attribute float aPhase;
varying float vAlpha;

float relief(vec2 p, float t) {
    return sin(p.x * 0.17 + t * 0.55) * 0.85
         + sin(p.y * 0.21 - t * 0.72) * 0.62
         + sin((p.x + p.y) * 0.085 + t * 0.31) * 1.05;
}

void main() {
    vec3 p = position;
    p.y = relief(p.xz, uTime) + 0.35;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    float pulse = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.9 + aPhase));
    vAlpha = (1.0 - smoothstep(uNear, uFar, dist)) * pulse;
    vAlpha *= 1.0 - smoothstep(0.55, 1.0, abs(p.x) / ${(SPAN_X / 2).toFixed(1)});
    vAlpha *= smoothstep(0.0, 16.0, dist);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = (${(70).toFixed(1)} / max(dist, 1.0)) * uPixelRatio;
}
`

const POINT_FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
    /* Round, and soft to the edge — a square point sprite is unmistakable. */
    float d = length(gl_PointCoord - vec2(0.5));
    float mask = 1.0 - smoothstep(0.15, 0.5, d);
    float a = vAlpha * mask * 0.9;
    if (a <= 0.001) discard;
    gl_FragColor = vec4(uColor, a);
}
`

export default function HeroField({ className = '' }: Props) {
    const hostRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const host = hostRef.current
        if (!host) return

        let disposed = false
        let teardown: (() => void) | null = null

        void (async () => {
            let THREE: typeof import('three')
            try {
                THREE = await import('three')
            } catch {
                return // No field; the CSS backdrop keeps its own grid.
            }
            if (disposed) return

            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            let renderer: import('three').WebGLRenderer
            try {
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true,
                    powerPreference: 'low-power',
                })
            } catch {
                return // No WebGL context — same fallback.
            }

            const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
            renderer.setPixelRatio(dpr)
            renderer.setClearAlpha(0)

            const canvas = renderer.domElement
            canvas.style.cssText =
                'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 900ms ease'
            host.appendChild(canvas)

            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 240)
            camera.position.set(0, 4.6, NEAR_Z + 2)

            /* The framing has to change with the shape of the element, not just
               its size. On a wide hero the camera sits low and the terrain runs
               to a horizon behind the headline; on a phone the same hero is a
               tall box, and a low camera there fills two-thirds of it with the
               two enormous nearest rows. So portrait lifts the camera and looks
               further down — more rows, smaller cells, a field rather than a
               pair of lines. */
            const view = { camY: 4.6, lookY: 1.1 }

            // ---- The lattice ------------------------------------------------
            // One vertex per crossing, lines drawn as indices over it, so the
            // grid costs ~7k vertices rather than ~28k.
            const verts = new Float32Array((COLS + 1) * (ROWS + 1) * 3)
            const at = (c: number, r: number) => r * (COLS + 1) + c
            for (let r = 0; r <= ROWS; r++) {
                for (let c = 0; c <= COLS; c++) {
                    const i = at(c, r) * 3
                    verts[i] = (c / COLS - 0.5) * SPAN_X
                    verts[i + 1] = 0
                    verts[i + 2] = NEAR_Z - (r / ROWS) * SPAN_Z
                }
            }

            const idx: number[] = []
            for (let r = 0; r <= ROWS; r++) {
                for (let c = 0; c < COLS; c++) idx.push(at(c, r), at(c + 1, r))
            }
            for (let c = 0; c <= COLS; c++) {
                for (let r = 0; r < ROWS; r++) idx.push(at(c, r), at(c, r + 1))
            }

            const geo = new THREE.BufferGeometry()
            geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
            geo.setIndex(idx)

            // Own clock rather than THREE.Clock, which is deprecated as of
            // r18x — and this needs the pause behaviour anyway: time only
            // advances on frames that were actually drawn, so a hero that was
            // off-screen for a minute resumes where it left off instead of
            // jumping a minute of relief in one step.
            let elapsed = 0
            let lastFrame = 0
            const uTime = { value: 0 }

            // Same blues the CSS backdrop uses (#1d4ed8 → #bfdbfe), so the
            // canvas and the layers under it are one picture.
            const gridMat = new THREE.ShaderMaterial({
                vertexShader: VERT,
                fragmentShader: FRAG,
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uTime,
                    uNear: { value: 34 },
                    uFar: { value: 116 },
                    uLow: { value: new THREE.Color('#1e40af') },
                    uHigh: { value: new THREE.Color('#cfe3ff') },
                    uOpacity: { value: 0.9 },
                },
            })
            const grid = new THREE.LineSegments(geo, gridMat)
            scene.add(grid)

            // ---- Beacons ----------------------------------------------------
            // A handful of pulsing points riding the same relief, placed on a
            // fixed pseudo-random sequence rather than Math.random so every
            // load looks the same.
            const COUNT = 84
            const pPos = new Float32Array(COUNT * 3)
            const pPhase = new Float32Array(COUNT)
            let seed = 20260826
            const rnd = () => {
                seed = (seed * 1664525 + 1013904223) >>> 0
                return seed / 4294967296
            }
            for (let i = 0; i < COUNT; i++) {
                pPos[i * 3] = (rnd() - 0.5) * SPAN_X
                pPos[i * 3 + 1] = 0
                pPos[i * 3 + 2] = NEAR_Z - rnd() * SPAN_Z
                pPhase[i] = rnd() * Math.PI * 2
            }
            const pGeo = new THREE.BufferGeometry()
            pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
            pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1))
            const pointMat = new THREE.ShaderMaterial({
                vertexShader: POINT_VERT,
                fragmentShader: POINT_FRAG,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uTime,
                    uNear: { value: 36 },
                    uFar: { value: 110 },
                    uPixelRatio: { value: dpr },
                    uColor: { value: new THREE.Color('#93c5fd') },
                },
            })
            const points = new THREE.Points(pGeo, pointMat)
            scene.add(points)

            // ---- Pointer parallax -------------------------------------------
            // Small on purpose: enough that the field has depth when the cursor
            // crosses the hero, not enough to be a toy.
            const target = { x: 0, y: 0 }
            const eased = { x: 0, y: 0 }
            const onPointer = (e: PointerEvent) => {
                const r = host.getBoundingClientRect()
                if (!r.width || !r.height) return
                target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
                target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
            }
            if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

            // ---- Sizing ------------------------------------------------------
            const resize = () => {
                const w = host.clientWidth || 1
                const h = host.clientHeight || 1
                renderer.setSize(w, h, false)
                const aspect = w / h
                const portrait = aspect < 1.05
                view.camY = portrait ? 8.2 : 4.6
                view.lookY = portrait ? -1.4 : 1.1
                camera.aspect = aspect
                camera.fov = portrait ? 62 : 52
                camera.position.y = view.camY
                camera.lookAt(0, view.lookY, -26)
                camera.updateProjectionMatrix()
            }
            resize()
            const ro = new ResizeObserver(resize)
            ro.observe(host)

            const draw = () => {
                if (!reduced) {
                    uTime.value = elapsed
                    eased.x += (target.x - eased.x) * 0.035
                    eased.y += (target.y - eased.y) * 0.035
                    camera.position.x = eased.x * 1.9
                    camera.position.y = view.camY - eased.y * 0.85
                    camera.lookAt(eased.x * 0.6, view.lookY, -26)
                }
                renderer.render(scene, camera)
            }

            // ---- Loop, only while it can be seen ------------------------------
            let raf = 0
            let visible = true
            let onScreen = true
            const tick = (now: number) => {
                raf = requestAnimationFrame(tick)
                // Clamped, so one long frame (a tab waking, a GC pause) is a
                // hitch rather than a jump.
                if (lastFrame) elapsed += Math.min(now - lastFrame, 100) / 1000
                lastFrame = now
                draw()
            }
            const sync = () => {
                const run = visible && onScreen && !reduced
                if (run && !raf) {
                    lastFrame = 0 // drop the time spent paused
                    raf = requestAnimationFrame(tick)
                } else if (!run && raf) {
                    cancelAnimationFrame(raf)
                    raf = 0
                }
            }

            const io = new IntersectionObserver(
                ([entry]) => {
                    onScreen = entry.isIntersecting
                    sync()
                },
                { rootMargin: '120px' },
            )
            io.observe(host)

            const onVisibility = () => {
                visible = document.visibilityState === 'visible'
                sync()
            }
            document.addEventListener('visibilitychange', onVisibility)

            // First frame, then hand over to the loop (or not, if reduced).
            draw()
            canvas.style.opacity = '1'
            host.dataset.heroField = 'live'
            sync()

            teardown = () => {
                if (raf) cancelAnimationFrame(raf)
                io.disconnect()
                ro.disconnect()
                document.removeEventListener('visibilitychange', onVisibility)
                window.removeEventListener('pointermove', onPointer)
                geo.dispose()
                pGeo.dispose()
                gridMat.dispose()
                pointMat.dispose()
                renderer.dispose()
                canvas.remove()
                delete host.dataset.heroField
            }
        })()

        return () => {
            disposed = true
            teardown?.()
        }
    }, [])

    return <div ref={hostRef} aria-hidden="true" className={className} />
}
