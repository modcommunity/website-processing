import { afterEach, describe, expect, it, vi } from 'vitest'
import { localeFromPath, track } from './umami'

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('localeFromPath', () => {
    it('defaults to en and reads the prefix', () => {
        expect(localeFromPath('/')).toBe('en')
        expect(localeFromPath('/de/privacy')).toBe('de')
        expect(localeFromPath('/delta')).toBe('en')
    })
})

describe('track', () => {
    it('no-ops without window', () => {
        expect(() => track('back_to_top')).not.toThrow()
    })

    it('no-ops when umami has not loaded', () => {
        vi.stubGlobal('window', { location: { pathname: '/' } })
        expect(() => track('back_to_top')).not.toThrow()
    })

    it('never throws when the tracker does', () => {
        vi.stubGlobal('window', {
            location: { pathname: '/' },
            umami: { track: () => { throw new Error('boom') } },
        })
        expect(() => track('back_to_top')).not.toThrow()
    })

    it('adds path and locale', () => {
        const spy = vi.fn()
        vi.stubGlobal('window', { location: { pathname: '/fr/x' }, umami: { track: spy } })
        track('section_cta', { to: 'mods' })
        expect(spy).toHaveBeenCalledWith('section_cta', { path: '/fr/x', locale: 'fr', to: 'mods' })
    })
})
