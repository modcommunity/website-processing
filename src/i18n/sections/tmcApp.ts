import type { SectionCatalog } from './types'

/**
 * Copy for the install-command copy button on `/tmc-cli` (`apiTool/Install.astro`).
 * The `/tmc-app` page it was written for is gone: it now redirects to
 * https://gamespice.net/app. Nine locales; `en` is the reference shape.
 */
export const tmcApp: SectionCatalog = {
    en: {
        copy: `Copy`,
        copied: `Copied`,
    },
    de: {
        copy: `Kopieren`,
        copied: `Kopiert`,
    },
    es: {
        copy: `Copiar`,
        copied: `Copiado`,
    },
    fr: {
        copy: `Copier`,
        copied: `Copié`,
    },
    ja: {
        copy: `コピー`,
        copied: `コピーしました`,
    },
    nl: {
        copy: `Kopiëren`,
        copied: `Gekopieerd`,
    },
    pt: {
        copy: `Copiar`,
        copied: `Copiado`,
    },
    ru: {
        copy: `Копировать`,
        copied: `Скопировано`,
    },
    zh: {
        copy: `复制`,
        copied: `已复制`,
    },
}
