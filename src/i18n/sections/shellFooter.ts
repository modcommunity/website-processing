import type { LocaleT } from '../config'

/**
 * Footer slogan, copyright, column headings and link labels, ported verbatim
 * from website-city's `locales/<lang>/footer.json` so both footers read
 * identically in all nine languages. Keys mirror city's exactly
 * (`slogan`, `copyright`, `headings.*`, `links.*`), and the shape is nested so
 * `getT` can resolve it by dot-path.
 *
 * Keep in sync with website-city's `FOOTER_LINKS`
 * (`src/app/_components/ui/shell/nav-config.ts`) — that config is the source of
 * truth for which links the footer shows, in which column and in what order;
 * this file only carries their text.
 *
 * Most of the second, third and fourth columns are English-only here (the
 * Resources heading, `parties`, `groups`, `community`, `activity`, `media`,
 * `banners`, `contact`, `discussions`, `changelog`, `roadmap`, `feedback`,
 * `bugs`). That is not an omission: city's own `locales/<lang>/footer.json`
 * carries them in English too — its request pipeline merges English under every
 * locale — so translating them here would make the landing site's footer read
 * DIFFERENTLY from the app's in the other eight languages, which is exactly what
 * this catalogue exists to prevent. `getT` falls back to English per key, so the
 * rest of a locale still renders. When city translates one of them, copy it
 * across.
 */
export type FooterCatalog = Record<
    LocaleT,
    {
        slogan?: string
        copyright?: string
        headings?: Record<string, string>
        links?: Record<string, string>
    }
>

export const shellFooter: FooterCatalog = {
    en: {
        slogan: 'Taking modding to the next level — mods, game assets, and servers for everyone.',
        copyright: '© {year} The Modding Community. All rights reserved.',
        headings: {
            explore: 'Explore',
            community: 'Community',
            resources: 'Resources',
            legal: 'Legal',
        },
        links: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Servers',
            parties: 'Parties',
            communities: 'Communities',
            collections: 'Collections',
            groups: 'Groups',
            community: 'Community',
            banners: 'Banners',
            discord: 'Discord',
            blog: 'Blog',
            activity: 'Activity',
            discussions: 'Discussions',
            media: 'Media',
            contact: 'Contact Us',
            changelog: 'Changelog',
            roadmap: 'Roadmap',
            feedback: 'Feedback',
            bugs: 'Bug Tracker',
            tos: 'Terms of Service',
            privacy: 'Privacy Policy',
            licenses: 'Licenses',
        },
    },
    es: {
        slogan: 'Llevamos el modding al siguiente nivel: mods, recursos de juego y servidores para todos.',
        copyright:
            '© {year} The Modding Community. Todos los derechos reservados.',
        headings: {
            explore: 'Explorar',
            community: 'Comunidad',
            legal: 'Legal',
        },
        links: {
            apps: 'Aplicaciones',
            assets: 'Recursos',
            mods: 'Mods',
            servers: 'Servidores',
            communities: 'Comunidades',
            collections: 'Colecciones',
            discord: 'Discord',
            blog: 'Blog',
            tos: 'Términos del servicio',
            privacy: 'Política de privacidad',
            licenses: 'Licencias',
        },
    },
    fr: {
        slogan: 'Le modding passe à la vitesse supérieure — mods, ressources de jeu et serveurs pour tous.',
        copyright: '© {year} The Modding Community. Tous droits réservés.',
        headings: {
            explore: 'Explorer',
            community: 'Communauté',
            legal: 'Mentions légales',
        },
        links: {
            apps: 'Applis',
            assets: 'Ressources',
            mods: 'Mods',
            servers: 'Serveurs',
            communities: 'Communautés',
            collections: 'Collections',
            discord: 'Discord',
            blog: 'Blog',
            tos: "Conditions d'utilisation",
            privacy: 'Politique de confidentialité',
            licenses: 'Licences',
        },
    },
    de: {
        slogan: 'Modding auf das nächste Level bringen — Mods, Game-Assets und Server für alle.',
        copyright: '© {year} The Modding Community. Alle Rechte vorbehalten.',
        headings: {
            explore: 'Entdecken',
            community: 'Community',
            legal: 'Rechtliches',
        },
        links: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Server',
            communities: 'Communitys',
            collections: 'Sammlungen',
            discord: 'Discord',
            blog: 'Blog',
            tos: 'Nutzungsbedingungen',
            privacy: 'Datenschutzerklärung',
            licenses: 'Lizenzen',
        },
    },
    ru: {
        slogan: 'Моддинг на новом уровне — моды, игровые ресурсы и серверы для всех.',
        copyright: '© {year} The Modding Community. Все права защищены.',
        headings: {
            explore: 'Обзор',
            community: 'Сообщество',
            legal: 'Правовая информация',
        },
        links: {
            apps: 'Игры',
            assets: 'Ресурсы',
            mods: 'Моды',
            servers: 'Серверы',
            communities: 'Сообщества',
            collections: 'Коллекции',
            discord: 'Discord',
            blog: 'Блог',
            tos: 'Условия использования',
            privacy: 'Политика конфиденциальности',
            licenses: 'Лицензии',
        },
    },
    nl: {
        slogan: 'Modding naar een hoger niveau — mods, game assets en servers voor iedereen.',
        copyright: '© {year} The Modding Community. Alle rechten voorbehouden.',
        headings: {
            explore: 'Ontdekken',
            community: 'Community',
            legal: 'Juridisch',
        },
        links: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Servers',
            communities: 'Communities',
            collections: 'Collecties',
            discord: 'Discord',
            blog: 'Blog',
            tos: 'Servicevoorwaarden',
            privacy: 'Privacybeleid',
            licenses: 'Licenties',
        },
    },
    ja: {
        slogan: 'モッディングを次のレベルへ — MOD、ゲームアセット、サーバーをすべての人に。',
        copyright: '© {year} The Modding Community. 無断転載を禁じます。',
        headings: {
            explore: '探す',
            community: 'コミュニティ',
            legal: '規約',
        },
        links: {
            apps: 'アプリ',
            assets: 'アセット',
            mods: 'MOD',
            servers: 'サーバー',
            communities: 'コミュニティ',
            collections: 'コレクション',
            discord: 'Discord',
            blog: 'ブログ',
            tos: '利用規約',
            privacy: 'プライバシーポリシー',
            licenses: 'ライセンス',
        },
    },
    zh: {
        slogan: '让模组创作更进一步——面向所有人的模组、游戏资源与服务器。',
        copyright: '© {year} The Modding Community. 保留所有权利。',
        headings: {
            explore: '探索',
            community: '社区',
            legal: '法律信息',
        },
        links: {
            apps: '游戏',
            assets: '资源',
            mods: '模组',
            servers: '服务器',
            communities: '社区',
            collections: '合集',
            discord: 'Discord',
            blog: '博客',
            tos: '服务条款',
            privacy: '隐私政策',
            licenses: '许可协议',
        },
    },
    pt: {
        slogan: 'A levar o modding ao próximo nível — mods, recursos de jogo e servidores para todos.',
        copyright:
            '© {year} The Modding Community. Todos os direitos reservados.',
        headings: {
            explore: 'Explorar',
            community: 'Comunidade',
            legal: 'Legal',
        },
        links: {
            apps: 'Aplicações',
            assets: 'Recursos',
            mods: 'Mods',
            servers: 'Servidores',
            communities: 'Comunidades',
            collections: 'Coleções',
            discord: 'Discord',
            blog: 'Blog',
            tos: 'Termos de Serviço',
            privacy: 'Política de Privacidade',
            licenses: 'Licenças',
        },
    },
}
