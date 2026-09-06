import { useEffect, useRef } from 'react'

/**
 * The front page's hero animation — a slow drift of points in depth.
 *
 * Deliberately small. This used to be a wireframe terrain: a lattice displaced
 * by three sines in a custom vertex shader, plus a second shader for pulsing
 * beacons, ~400 lines of GLSL and buffer plumbing. It also fought the backdrop
 * it sat on — the `blueprint` variant painted its OWN flat CSS grid, so two
 * lattices at two different alignments crossed each other, which is the
 * interference you could see. That CSS grid is gone now (see HeroBackdrop),
 * and so is the terrain.
 *
 * What is left is a point cloud turning slowly. No custom shaders: depth fade
 * is scene fog, which `PointsMaterial` honours for free, and the dot is a
 * radial gradient drawn once into a canvas so the points are round rather than
 * square. There are no lines in it at all, so there is nothing for the copy or
 * the backdrop to collide with.
 *
 * Everything operational about the old component is kept, because that part
 * was never the problem:
 *
 * - `three` is imported dynamically inside the effect, so it stays a separate
 *   chunk fetched after the hero has painted rather than part of the entry
 *   bundle.
 * - No JS, no WebGL, or a context that fails to create leaves the hero exactly
 *   as it is without this — the backdrop underneath is complete on its own.
 * - `prefers-reduced-motion: reduce` renders one frame and never starts the
 *   loop. The points are still there, they just hold still.
 * - The loop stops whenever the hero is off-screen or the tab is hidden, and
 *   time advances only on frames actually drawn, so a hero that was away for a
 *   minute resumes rather than jumping a minute of rotation.
 */

type Props = {
    className?: string
}

/** How many points, and the box they are scattered through, in world units. */
const COUNT = 560
const SPAN_X = 78
const SPAN_Y = 42
const SPAN_Z = 64

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
                return // No field; the backdrop stands on its own.
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

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
            renderer.setClearAlpha(0)

            const canvas = renderer.domElement
            canvas.style.cssText =
                'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 900ms ease'
            host.appendChild(canvas)

            const scene = new THREE.Scene()
            // The depth fade. `PointsMaterial` reads scene fog, so this is the
            // whole of it — no distance maths in a shader of our own. The
            // colour matches the backdrop's base (#04060d) so far points sink
            // into it rather than into grey.
            scene.fog = new THREE.FogExp2(0x04060d, 0.021)

            const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200)
            camera.position.set(0, 0, 40)

            // A soft round dot, drawn once. Without it every point is a square,
            // which is unmistakable and cheap-looking at any size.
            const dot = document.createElement('canvas')
            dot.width = dot.height = 64
            const ctx = dot.getContext('2d')
            if (ctx) {
                const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
                g.addColorStop(0, 'rgba(255,255,255,1)')
                g.addColorStop(0.35, 'rgba(255,255,255,0.5)')
                g.addColorStop(1, 'rgba(255,255,255,0)')
                ctx.fillStyle = g
                ctx.fillRect(0, 0, 64, 64)
            }
            const sprite = new THREE.CanvasTexture(dot)

            // Fixed pseudo-random placement rather than Math.random, so every
            // load looks the same.
            let seed = 20260827
            const rnd = () => {
                seed = (seed * 1664525 + 1013904223) >>> 0
                return seed / 4294967296
            }

            const pos = new Float32Array(COUNT * 3)
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] = (rnd() - 0.5) * SPAN_X
                pos[i * 3 + 1] = (rnd() - 0.5) * SPAN_Y
                pos[i * 3 + 2] = (rnd() - 0.5) * SPAN_Z
            }

            const geo = new THREE.BufferGeometry()
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))

            const mat = new THREE.PointsMaterial({
                size: 0.62,
                sizeAttenuation: true,
                map: sprite,
                color: new THREE.Color('#9cc4ff'),
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            })

            // The cloud lives on a group so the animation is one rotation
            // rather than 460 position writes a frame.
            const cloud = new THREE.Points(geo, mat)
            scene.add(cloud)

            // ---- Sizing ------------------------------------------------------
            const resize = () => {
                const w = host.clientWidth || 1
                const h = host.clientHeight || 1
                renderer.setSize(w, h, false)
                camera.aspect = w / h
                // A tall, narrow hero sees a much smaller slice of the box, so
                // widen the lens there to keep the same amount of field in it.
                camera.fov = camera.aspect < 1.05 ? 68 : 55
                camera.updateProjectionMatrix()
            }
            resize()
            const ro = new ResizeObserver(resize)
            ro.observe(host)

            // ---- Loop, only while it can be seen ------------------------------
            let elapsed = 0
            let lastFrame = 0

            const draw = () => {
                if (!reduced) {
                    cloud.rotation.y = elapsed * 0.035
                    cloud.rotation.x = Math.sin(elapsed * 0.11) * 0.06
                }
                renderer.render(scene, camera)
            }

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
            sync()

            teardown = () => {
                if (raf) cancelAnimationFrame(raf)
                io.disconnect()
                ro.disconnect()
                document.removeEventListener('visibilitychange', onVisibility)
                geo.dispose()
                mat.dispose()
                sprite.dispose()
                renderer.dispose()
                canvas.remove()
            }
        })()

        return () => {
            disposed = true
            teardown?.()
        }
    }, [])

    return <div ref={hostRef} aria-hidden="true" className={className} />
}
