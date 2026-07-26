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
import { joinCommunity } from './sections/joinCommunity'
import { shellNav } from './sections/shellNav'

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
    common: {
        home: 'Home',
        apps: 'Apps',
        assets: 'Assets',
        mods: 'Mods',
        servers: 'Servers',
        communities: 'Communities',
        collections: 'Collections',
        blog: 'Blog',
        forum: 'Forum',
        discord: 'Discord',
        roadmap: 'Roadmap',
        knowledgebase: 'Knowledgebase',
        browse: 'Browse',
        tos: 'Terms of Service',
        privacy: 'Privacy Policy',
        licenses: 'Licenses',
    },
    sections: {
        explore: 'Explore',
        discover: 'Discover',
        community: 'Community',
        legal: 'Legal',
    },
    footer: {
        slogan: 'Taking modding to the next level.',
        copyright: '© {year} The Modding Community. All rights reserved.',
    },
    sidebar: {
        expand: 'Expand sidebar',
        collapse: 'Collapse sidebar',
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
    common: {
        home: 'Inicio',
        apps: 'Aplicaciones',
        assets: 'Recursos',
        mods: 'Mods',
        servers: 'Servidores',
        communities: 'Comunidades',
        collections: 'Colecciones',
        blog: 'Blog',
        forum: 'Foro',
        discord: 'Discord',
        roadmap: 'Hoja de ruta',
        knowledgebase: 'Base de conocimientos',
        browse: 'Explorar',
        tos: 'Términos del servicio',
        privacy: 'Política de privacidad',
        licenses: 'Licencias',
    },
    sections: {
        explore: 'Explorar',
        discover: 'Descubrir',
        community: 'Comunidad',
        legal: 'Legal',
    },
    footer: {
        slogan: 'Llevando el modding al siguiente nivel.',
        copyright:
            '© {year} The Modding Community. Todos los derechos reservados.',
    },
    sidebar: {
        expand: 'Expandir barra lateral',
        collapse: 'Contraer barra lateral',
    },
    account: { signIn: 'Iniciar sesión', myAccount: 'Mi cuenta' },
    theme: {
        toLight: 'Cambiar a modo claro',
        toDark: 'Cambiar a modo oscuro',
    },
    picker: { select: 'Seleccionar idioma', current: 'Idioma actual: {name}' },
}

const fr: DeepPartial<Messages> = {
    common: {
        home: 'Accueil',
        apps: 'Applications',
        assets: 'Ressources',
        mods: 'Mods',
        servers: 'Serveurs',
        communities: 'Communautés',
        collections: 'Collections',
        blog: 'Blog',
        forum: 'Forum',
        discord: 'Discord',
        roadmap: 'Feuille de route',
        knowledgebase: 'Base de connaissances',
        browse: 'Parcourir',
        tos: "Conditions d'utilisation",
        privacy: 'Politique de confidentialité',
        licenses: 'Licences',
    },
    sections: {
        explore: 'Explorer',
        discover: 'Découvrir',
        community: 'Communauté',
        legal: 'Mentions légales',
    },
    footer: {
        slogan: 'Le modding passe à la vitesse supérieure.',
        copyright: '© {year} The Modding Community. Tous droits réservés.',
    },
    sidebar: {
        expand: 'Développer la barre latérale',
        collapse: 'Réduire la barre latérale',
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
    common: {
        home: 'Startseite',
        apps: 'Apps',
        assets: 'Ressourcen',
        mods: 'Mods',
        servers: 'Server',
        communities: 'Communitys',
        collections: 'Sammlungen',
        blog: 'Blog',
        forum: 'Forum',
        discord: 'Discord',
        roadmap: 'Roadmap',
        knowledgebase: 'Wissensdatenbank',
        browse: 'Durchsuchen',
        tos: 'Nutzungsbedingungen',
        privacy: 'Datenschutzerklärung',
        licenses: 'Lizenzen',
    },
    sections: {
        explore: 'Erkunden',
        discover: 'Entdecken',
        community: 'Community',
        legal: 'Rechtliches',
    },
    footer: {
        slogan: 'Modding auf das nächste Level bringen.',
        copyright: '© {year} The Modding Community. Alle Rechte vorbehalten.',
    },
    sidebar: {
        expand: 'Seitenleiste ausklappen',
        collapse: 'Seitenleiste einklappen',
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
    common: {
        home: 'Главная',
        apps: 'Приложения',
        assets: 'Ресурсы',
        mods: 'Моды',
        servers: 'Серверы',
        communities: 'Сообщества',
        collections: 'Коллекции',
        blog: 'Блог',
        forum: 'Форум',
        discord: 'Discord',
        roadmap: 'Дорожная карта',
        knowledgebase: 'База знаний',
        browse: 'Обзор',
        tos: 'Условия использования',
        privacy: 'Политика конфиденциальности',
        licenses: 'Лицензии',
    },
    sections: {
        explore: 'Обзор',
        discover: 'Найти',
        community: 'Сообщество',
        legal: 'Правовая информация',
    },
    footer: {
        slogan: 'Моддинг на новом уровне.',
        copyright: '© {year} The Modding Community. Все права защищены.',
    },
    sidebar: {
        expand: 'Развернуть боковую панель',
        collapse: 'Свернуть боковую панель',
    },
    account: { signIn: 'Войти', myAccount: 'Мой аккаунт' },
    theme: {
        toLight: 'Переключить на светлую тему',
        toDark: 'Переключить на тёмную тему',
    },
    picker: { select: 'Выбрать язык', current: 'Текущий язык: {name}' },
}

const nl: DeepPartial<Messages> = {
    common: {
        home: 'Home',
        apps: 'Apps',
        assets: 'Assets',
        mods: 'Mods',
        servers: 'Servers',
        communities: 'Gemeenschappen',
        collections: 'Collecties',
        blog: 'Blog',
        forum: 'Forum',
        discord: 'Discord',
        roadmap: 'Roadmap',
        knowledgebase: 'Kennisbank',
        browse: 'Bladeren',
        tos: 'Servicevoorwaarden',
        privacy: 'Privacybeleid',
        licenses: 'Licenties',
    },
    sections: {
        explore: 'Verkennen',
        discover: 'Ontdekken',
        community: 'Community',
        legal: 'Juridisch',
    },
    footer: {
        slogan: 'Modding naar een hoger niveau tillen.',
        copyright:
            '© {year} The Modding Community. Alle rechten voorbehouden.',
    },
    sidebar: {
        expand: 'Zijbalk uitklappen',
        collapse: 'Zijbalk inklappen',
    },
    account: { signIn: 'Inloggen', myAccount: 'Mijn account' },
    theme: {
        toLight: 'Schakel naar lichte modus',
        toDark: 'Schakel naar donkere modus',
    },
    picker: { select: 'Taal kiezen', current: 'Huidige taal: {name}' },
}

const ja: DeepPartial<Messages> = {
    common: {
        home: 'ホーム',
        apps: 'アプリ',
        assets: 'アセット',
        mods: 'Mod',
        servers: 'サーバー',
        communities: 'コミュニティ',
        collections: 'コレクション',
        blog: 'ブログ',
        forum: 'フォーラム',
        discord: 'Discord',
        roadmap: 'ロードマップ',
        knowledgebase: 'ナレッジベース',
        browse: '閲覧',
        tos: '利用規約',
        privacy: 'プライバシーポリシー',
        licenses: 'ライセンス',
    },
    sections: {
        explore: '探索',
        discover: '見つける',
        community: 'コミュニティ',
        legal: '法的情報',
    },
    footer: {
        slogan: 'モッディングを次のレベルへ。',
        copyright: '© {year} The Modding Community. 無断複写・転載を禁じます。',
    },
    sidebar: {
        expand: 'サイドバーを展開',
        collapse: 'サイドバーを折りたたむ',
    },
    account: { signIn: 'ログイン', myAccount: 'マイアカウント' },
    theme: {
        toLight: 'ライトモードに切り替える',
        toDark: 'ダークモードに切り替える',
    },
    picker: { select: '言語を選択', current: '現在の言語: {name}' },
}

const zh: DeepPartial<Messages> = {
    common: {
        home: '主页',
        apps: '应用',
        assets: '资源',
        mods: '模组',
        servers: '服务器',
        communities: '社区',
        collections: '合集',
        blog: '博客',
        forum: '论坛',
        discord: 'Discord',
        roadmap: '路线图',
        knowledgebase: '知识库',
        browse: '浏览',
        tos: '服务条款',
        privacy: '隐私政策',
        licenses: '许可证',
    },
    sections: {
        explore: '探索',
        discover: '发现',
        community: '社区',
        legal: '法律',
    },
    footer: {
        slogan: '将模组制作提升到新高度。',
        copyright: '© {year} The Modding Community. 保留所有权利。',
    },
    sidebar: {
        expand: '展开侧边栏',
        collapse: '折叠侧边栏',
    },
    account: { signIn: '登录', myAccount: '我的账户' },
    theme: {
        toLight: '切换到浅色模式',
        toDark: '切换到深色模式',
    },
    picker: { select: '选择语言', current: '当前语言：{name}' },
}

const pt: DeepPartial<Messages> = {
    common: {
        home: 'Início',
        apps: 'Aplicativos',
        assets: 'Recursos',
        mods: 'Mods',
        servers: 'Servidores',
        communities: 'Comunidades',
        collections: 'Coleções',
        blog: 'Blog',
        forum: 'Fórum',
        discord: 'Discord',
        roadmap: 'Roteiro',
        knowledgebase: 'Base de conhecimento',
        browse: 'Explorar',
        tos: 'Termos de Serviço',
        privacy: 'Política de Privacidade',
        licenses: 'Licenças',
    },
    sections: {
        explore: 'Explorar',
        discover: 'Descobrir',
        community: 'Comunidade',
        legal: 'Jurídico',
    },
    footer: {
        slogan: 'Levando o modding para o próximo nível.',
        copyright:
            '© {year} The Modding Community. Todos os direitos reservados.',
    },
    sidebar: {
        expand: 'Expandir barra lateral',
        collapse: 'Recolher barra lateral',
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
    blog,
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
    }
}

/** Every locale's shell strings plus its merged landing-page catalogue. */
export const MESSAGES: Record<LocaleT, Record<string, unknown>> = BY_LOCALE
