import type { LocaleT } from '../config'

/**
 * Primary-sidebar labels, ported verbatim from website-city's
 * `locales/<lang>/nav.json` (`nav.sections.*`, `nav.items.*.label` and
 * `nav.sidebar.*`) so the two rails read identically in all nine languages.
 *
 * Keys mirror city's, minus the `.label` leaf its catalogue carries for the
 * header's sub-labels: `sections.<name>` for a group heading, `items.<name>`
 * for a leaf, `share.title` / `share.desc` for the bottom call-to-action. The
 * shape is nested so `getT` can resolve it by dot-path.
 *
 * Keep in sync with website-city's `SIDEBAR_SECTIONS`
 * (`src/app/_components/ui/shell/nav-config.ts`) — that config is the source of
 * truth for which entries the rail shows and in what order; this file only
 * carries their text.
 *
 * Several keys are English-only here (`overview`, `maps`, `activity`, `media`,
 * `messages`, `myFriends`, `myGroups`, and the Groups / Community / External
 * Sources headings). That is not an omission: city's own `locales/<lang>/nav.json`
 * carries them in English too — its request pipeline merges English under every
 * locale — so translating them here would make the landing site's rail read
 * DIFFERENTLY from the app's in the other eight languages, which is exactly what
 * this catalogue exists to prevent. `getT` falls back to English per key, so the
 * rest of a locale still renders. When city translates one of them, copy it across.
 */
export type SidebarCatalog = Record<
    LocaleT,
    {
        sections?: Record<string, string>
        items?: Record<string, string>
        share?: Record<string, string>
    }
>

export const shellSidebar: SidebarCatalog = {
    en: {
        sections: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Servers',
            parties: 'Parties',
            communities: 'Communities',
            articles: 'Articles',
            collections: 'Collections',
            groups: 'Groups',
            community: 'Community',
            sources: 'External Sources',
        },
        items: {
            overview: 'Overview',
            add: 'Add',
            browse: 'Browse',
            maps: 'Maps',
            knowledgebase: 'Knowledgebase',
            blog: 'Blog',
            activity: 'Activity',
            users: 'Users',
            media: 'Media',
            messages: 'Messages',
            liveParties: 'Live now',
            friendParties: "Friends' parties",
            myAssets: 'My Assets',
            myMods: 'My Mods',
            myServers: 'My Servers',
            myParties: 'My parties',
            myCommunities: 'My Communities',
            myArticles: 'My Articles',
            myCollections: 'My Collections',
            myGroups: 'My Groups',
            myFriends: 'My Friends',
        },
        share: {
            title: 'Share your work',
            desc: 'Create a mod, asset, server and more.',
        },
    },
    es: {
        sections: {
            apps: 'Aplicaciones',
            assets: 'Recursos',
            mods: 'Mods',
            servers: 'Servidores',
            parties: 'Partidas',
            communities: 'Comunidades',
            articles: 'Artículos',
            collections: 'Colecciones',
        },
        items: {
            add: 'Añadir',
            browse: 'Explorar',
            knowledgebase: 'Base de conocimiento',
            blog: 'Blog',
            users: 'Usuarios',
            liveParties: 'En directo',
            friendParties: 'Partidas de amigos',
            myAssets: 'Mis recursos',
            myMods: 'Mis mods',
            myServers: 'Mis servidores',
            myParties: 'Mis partidas',
            myCommunities: 'Mis comunidades',
            myArticles: 'Mis artículos',
            myCollections: 'Mis colecciones',
        },
        share: {
            title: 'Comparte tu trabajo',
            desc: 'Crea un mod, un recurso, un servidor y más.',
        },
    },
    fr: {
        sections: {
            apps: 'Applis',
            assets: 'Ressources',
            mods: 'Mods',
            servers: 'Serveurs',
            parties: 'Sessions',
            communities: 'Communautés',
            articles: 'Articles',
            collections: 'Collections',
        },
        items: {
            add: 'Ajouter',
            browse: 'Parcourir',
            knowledgebase: 'Base de connaissances',
            blog: 'Blog',
            users: 'Utilisateurs',
            liveParties: 'En direct',
            friendParties: "Sessions d'amis",
            myAssets: 'Mes ressources',
            myMods: 'Mes mods',
            myServers: 'Mes serveurs',
            myParties: 'Mes sessions',
            myCommunities: 'Mes communautés',
            myArticles: 'Mes articles',
            myCollections: 'Mes collections',
        },
        share: {
            title: 'Partagez votre travail',
            desc: 'Créez un mod, une ressource, un serveur et plus encore.',
        },
    },
    de: {
        sections: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Server',
            parties: 'Partys',
            communities: 'Communitys',
            articles: 'Artikel',
            collections: 'Sammlungen',
        },
        items: {
            add: 'Hinzufügen',
            browse: 'Durchsuchen',
            knowledgebase: 'Wissensdatenbank',
            blog: 'Blog',
            users: 'Benutzer',
            liveParties: 'Jetzt live',
            friendParties: 'Partys von Freunden',
            myAssets: 'Meine Assets',
            myMods: 'Meine Mods',
            myServers: 'Meine Server',
            myParties: 'Meine Partys',
            myCommunities: 'Meine Communitys',
            myArticles: 'Meine Artikel',
            myCollections: 'Meine Sammlungen',
        },
        share: {
            title: 'Teilen Sie Ihre Arbeit',
            desc: 'Erstellen Sie eine Mod, ein Asset, einen Server und mehr.',
        },
    },
    ru: {
        sections: {
            apps: 'Игры',
            assets: 'Ресурсы',
            mods: 'Моды',
            servers: 'Серверы',
            parties: 'Пати',
            communities: 'Сообщества',
            articles: 'Статьи',
            collections: 'Коллекции',
        },
        items: {
            add: 'Добавить',
            browse: 'Обзор',
            knowledgebase: 'База знаний',
            blog: 'Блог',
            users: 'Пользователи',
            liveParties: 'Сейчас в игре',
            friendParties: 'Пати друзей',
            myAssets: 'Мои ресурсы',
            myMods: 'Мои моды',
            myServers: 'Мои серверы',
            myParties: 'Мои пати',
            myCommunities: 'Мои сообщества',
            myArticles: 'Мои статьи',
            myCollections: 'Мои коллекции',
        },
        share: {
            title: 'Поделитесь своей работой',
            desc: 'Создайте мод, ресурс, сервер и не только.',
        },
    },
    nl: {
        sections: {
            apps: 'Apps',
            assets: 'Assets',
            mods: 'Mods',
            servers: 'Servers',
            parties: "Party's",
            communities: 'Communities',
            articles: 'Artikelen',
            collections: 'Collecties',
        },
        items: {
            add: 'Toevoegen',
            browse: 'Bekijken',
            knowledgebase: 'Kennisbank',
            blog: 'Blog',
            users: 'Gebruikers',
            liveParties: 'Nu live',
            friendParties: "Party's van vrienden",
            myAssets: 'Mijn assets',
            myMods: 'Mijn mods',
            myServers: 'Mijn servers',
            myParties: "Mijn party's",
            myCommunities: 'Mijn communities',
            myArticles: 'Mijn artikelen',
            myCollections: 'Mijn collecties',
        },
        share: {
            title: 'Deel je werk',
            desc: 'Maak een mod, asset, server en meer.',
        },
    },
    ja: {
        sections: {
            apps: 'アプリ',
            assets: 'アセット',
            mods: 'MOD',
            servers: 'サーバー',
            parties: 'パーティー',
            communities: 'コミュニティ',
            articles: '記事',
            collections: 'コレクション',
        },
        items: {
            add: '追加',
            browse: '探す',
            knowledgebase: 'ナレッジベース',
            blog: 'ブログ',
            users: 'ユーザー',
            liveParties: '進行中',
            friendParties: 'フレンドのパーティー',
            myAssets: 'マイアセット',
            myMods: 'マイ MOD',
            myServers: 'マイサーバー',
            myParties: '自分のパーティー',
            myCommunities: 'マイコミュニティ',
            myArticles: 'マイ記事',
            myCollections: 'マイコレクション',
        },
        share: {
            title: '作品を共有しよう',
            desc: 'MOD、アセット、サーバーなどを作成できます。',
        },
    },
    zh: {
        sections: {
            apps: '游戏',
            assets: '资源',
            mods: '模组',
            servers: '服务器',
            parties: '组队',
            communities: '社区',
            articles: '文章',
            collections: '合集',
        },
        items: {
            add: '添加',
            browse: '浏览',
            knowledgebase: '知识库',
            blog: '博客',
            users: '用户',
            liveParties: '进行中',
            friendParties: '好友的组队',
            myAssets: '我的资源',
            myMods: '我的模组',
            myServers: '我的服务器',
            myParties: '我的组队',
            myCommunities: '我的社区',
            myArticles: '我的文章',
            myCollections: '我的合集',
        },
        share: {
            title: '分享你的作品',
            desc: '创建模组、资源、服务器等。',
        },
    },
    pt: {
        sections: {
            apps: 'Aplicações',
            assets: 'Recursos',
            mods: 'Mods',
            servers: 'Servidores',
            parties: 'Partidas',
            communities: 'Comunidades',
            articles: 'Artigos',
            collections: 'Coleções',
        },
        items: {
            add: 'Adicionar',
            browse: 'Explorar',
            knowledgebase: 'Base de conhecimento',
            blog: 'Blog',
            users: 'Utilizadores',
            liveParties: 'Ao vivo',
            friendParties: 'Partidas de amigos',
            myAssets: 'Os meus recursos',
            myMods: 'Os meus mods',
            myServers: 'Os meus servidores',
            myParties: 'As minhas partidas',
            myCommunities: 'As minhas comunidades',
            myArticles: 'Os meus artigos',
            myCollections: 'As minhas coleções',
        },
        share: {
            title: 'Partilhe o seu trabalho',
            desc: 'Crie um mod, recurso, servidor e mais.',
        },
    },
}
