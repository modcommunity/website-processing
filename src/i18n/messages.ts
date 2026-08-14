import { LOCALES, type LocaleT } from './config'
import { hero } from './sections/hero'
import { pillars } from './sections/pillars'
import { servers } from './sections/servers'
import { assets } from './sections/assets'
import { mods } from './sections/mods'
import { stats } from './sections/stats'
import { communities } from './sections/communities'
import { collections } from './sections/collections'
import { api } from './sections/api'
import { blog } from './sections/blog'
import { roadmap } from './sections/roadmap'
import { feedback } from './sections/feedback'
import { platform } from './sections/platform'
import { joinCommunity } from './sections/joinCommunity'
import { shellNav } from './sections/shellNav'
import { shellSidebar } from './sections/shellSidebar'
import { shellFooter } from './sections/shellFooter'
import { notFound } from './sections/notFound'

/**
 * The landing site's message catalogue. `en` is the reference (complete) shape;
 * every other locale is a deep-partial that falls back to English per-key (see
 * ./t.ts), so a half-translated locale still renders — it just shows English for
 * the keys it hasn't filled yet.
 *
 * Progressive fill: the shell (nav / footer / sidebar / picker / chrome) is
 * translated across all 9 locales; the landing-page section copy is added
 * section by section.
 */
export const en = {
    sidebar: {
        expand: 'Expand sidebar',
        collapse: 'Collapse sidebar',
    },
    // Labels for the mobile drawer trigger, ported verbatim from website-city's
    // `nav.mobile.*` so both shells announce the menu identically.
    mobile: {
        open: 'Open navigation menu',
        close: 'Close menu',
        title: 'Navigation menu',
    },
    account: {
        signIn: 'Sign In',
        myAccount: 'My Account',
    },
    theme: {
        toLight: 'Switch to light mode',
        toDark: 'Switch to dark mode',
    },
    picker: {
        select: 'Select language',
        current: 'Current language: {name}',
    },
}

export type Messages = typeof en

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

const es: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Expandir barra lateral',
        collapse: 'Contraer barra lateral',
    },
    mobile: {
        open: 'Abrir menú de navegación',
        close: 'Cerrar menú',
        title: 'Menú de navegación',
    },
    account: { signIn: 'Iniciar sesión', myAccount: 'Mi cuenta' },
    theme: {
        toLight: 'Cambiar a modo claro',
        toDark: 'Cambiar a modo oscuro',
    },
    picker: { select: 'Seleccionar idioma', current: 'Idioma actual: {name}' },
}

const fr: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Développer la barre latérale',
        collapse: 'Réduire la barre latérale',
    },
    mobile: {
        open: 'Ouvrir le menu de navigation',
        close: 'Fermer le menu',
        title: 'Menu de navigation',
    },
    account: { signIn: 'Se connecter', myAccount: 'Mon compte' },
    theme: {
        toLight: 'Passer en mode clair',
        toDark: 'Passer en mode sombre',
    },
    picker: {
        select: 'Choisir la langue',
        current: 'Langue actuelle : {name}',
    },
}

const de: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Seitenleiste ausklappen',
        collapse: 'Seitenleiste einklappen',
    },
    mobile: {
        open: 'Navigationsmenü öffnen',
        close: 'Menü schließen',
        title: 'Navigationsmenü',
    },
    account: { signIn: 'Anmelden', myAccount: 'Mein Konto' },
    theme: {
        toLight: 'Zum hellen Modus wechseln',
        toDark: 'Zum dunklen Modus wechseln',
    },
    picker: {
        select: 'Sprache auswählen',
        current: 'Aktuelle Sprache: {name}',
    },
}

const ru: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Развернуть боковую панель',
        collapse: 'Свернуть боковую панель',
    },
    mobile: {
        open: 'Открыть меню навигации',
        close: 'Закрыть меню',
        title: 'Меню навигации',
    },
    account: { signIn: 'Войти', myAccount: 'Мой аккаунт' },
    theme: {
        toLight: 'Переключить на светлую тему',
        toDark: 'Переключить на тёмную тему',
    },
    picker: { select: 'Выбрать язык', current: 'Текущий язык: {name}' },
}

const nl: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Zijbalk uitklappen',
        collapse: 'Zijbalk inklappen',
    },
    mobile: {
        open: 'Navigatiemenu openen',
        close: 'Menu sluiten',
        title: 'Navigatiemenu',
    },
    account: { signIn: 'Inloggen', myAccount: 'Mijn account' },
    theme: {
        toLight: 'Schakel naar lichte modus',
        toDark: 'Schakel naar donkere modus',
    },
    picker: { select: 'Taal kiezen', current: 'Huidige taal: {name}' },
}

const ja: DeepPartial<Messages> = {
    sidebar: {
        expand: 'サイドバーを展開',
        collapse: 'サイドバーを折りたたむ',
    },
    mobile: {
        open: 'ナビゲーションメニューを開く',
        close: 'メニューを閉じる',
        title: 'ナビゲーションメニュー',
    },
    account: { signIn: 'ログイン', myAccount: 'マイアカウント' },
    theme: {
        toLight: 'ライトモードに切り替える',
        toDark: 'ダークモードに切り替える',
    },
    picker: { select: '言語を選択', current: '現在の言語: {name}' },
}

const zh: DeepPartial<Messages> = {
    sidebar: {
        expand: '展开侧边栏',
        collapse: '折叠侧边栏',
    },
    mobile: {
        open: '打开导航菜单',
        close: '关闭菜单',
        title: '导航菜单',
    },
    account: { signIn: '登录', myAccount: '我的账户' },
    theme: {
        toLight: '切换到浅色模式',
        toDark: '切换到深色模式',
    },
    picker: { select: '选择语言', current: '当前语言：{name}' },
}

const pt: DeepPartial<Messages> = {
    sidebar: {
        expand: 'Expandir barra lateral',
        collapse: 'Recolher barra lateral',
    },
    mobile: {
        open: 'Abrir menu de navegação',
        close: 'Fechar menu',
        title: 'Menu de navegação',
    },
    account: { signIn: 'Entrar', myAccount: 'Minha conta' },
    theme: {
        toLight: 'Mudar para o modo claro',
        toDark: 'Mudar para o modo escuro',
    },
    picker: { select: 'Selecionar idioma', current: 'Idioma atual: {name}' },
}

const SHELL: Record<LocaleT, DeepPartial<Messages>> = {
    en,
    es,
    fr,
    de,
    ru,
    nl,
    ja,
    zh,
    pt,
}

// Landing-page section catalogues, merged under the `landing` namespace. Each
// section lives in its own file (src/i18n/sections/*) so translations can be
// filled in section by section without collisions.
const SECTIONS = {
    hero,
    pillars,
    servers,
    assets,
    mods,
    stats,
    communities,
    collections,
    api,
    roadmap,
    feedback,
    blog,
    platform,
    joinCommunity,
}

function landingFor(locale: LocaleT): Record<string, Record<string, string>> {
    const out: Record<string, Record<string, string>> = {}
    for (const [name, cat] of Object.entries(SECTIONS)) {
        out[name] = cat[locale] ?? cat.en
    }
    return out
}

// Filled by iterating LOCALES, so every key is present. Built with a typed
// accumulator rather than Object.fromEntries, whose `{ [k: string]: … }` return
// type can't be cast to a Record with required locale keys.
const BY_LOCALE = {} as Record<LocaleT, Record<string, unknown>>

for (const loc of LOCALES) {
    BY_LOCALE[loc] = {
        ...SHELL[loc],
        landing: landingFor(loc),
        // Header nav labels/descriptions, shared verbatim with website-city.
        nav: shellNav[loc],
        /*
         * Primary-sidebar labels, likewise ported from city. Its own namespace
         * rather than a merge into the shell strings above: the rail needs ~35
         * strings, most of which (Overview, My Mods, Live now, …) mean nothing
         * outside it, and keeping them together is what makes "does this match
         * city's SIDEBAR_SECTIONS?" answerable by reading one file.
         */
        rail: shellSidebar[loc],
        /*
         * Footer slogan, copyright, headings and link labels, ported from
         * city's `locales/<lang>/footer.json`. Its own namespace for the same
         * reason as `rail`: it mirrors ONE of city's catalogues one-to-one, so
         * "does this match city's footer?" is a single-file diff. The labels
         * used to be spread through a generic `common.*` block that no other
         * surface read, which is how the two footers drifted apart.
         */
        footer: shellFooter[loc],
        /*
         * The 404 copy. Also its own namespace because 404.astro ships the
         * whole catalogue to the browser and picks a locale at runtime — the
         * static build cannot know which language an unmatched URL was meant
         * to be.
         */
        notFound: notFound[loc],
    }
}

/** Every locale's shell strings plus its merged landing-page catalogue. */
export const MESSAGES: Record<LocaleT, Record<string, unknown>> = BY_LOCALE
