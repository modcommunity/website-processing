import { getT } from '../../i18n/t'

const KEYS = [
    'now', 'subGeneric', 'sub_deb', 'sub_setup', 'sub_dmg', 'version', 'other', 'otherTitle',
    'allOnGithub', 'also_appimage', 'also_portable', 'also_msi', 'list_setup', 'list_portable',
    'list_msi', 'list_deb', 'list_appimage', 'list_dmg', 'list_checksums',
] as const

/** The Download button's labels as one serialisable object for the island. */
export function dlLabels(t: ReturnType<typeof getT>): Record<string, string> {
    return Object.fromEntries(KEYS.map((k) => [k, t(`landing.tmcApp.${k}`)]))
}
