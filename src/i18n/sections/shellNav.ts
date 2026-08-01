import type { LocaleT } from '../config'

/**
 * Header navigation labels + dropdown descriptions, ported verbatim from
 * website-city's `locales/<lang>/nav.json` so the two headers read identically
 * in all nine languages. Keys mirror city's `nav.items.*`; the shape is flat
 * (`apps.label` / `apps.desc`) so `getT` can resolve it by dot-path.
 *
 * Keep in sync with website-city's PRIMARY_NAV — that config is the source of
 * truth for which entries the header shows and in what order.
 *
 * `community` and `banners` are English-only on purpose: city's own
 * `locales/<lang>/nav.json` only carries them in English too, and its request
 * pipeline merges English under every locale. Translating them here would make
 * processing's header read differently from city's in the other eight
 * languages, which is exactly what this catalogue exists to prevent. `getT`
 * falls back to English per key, so the rest of a locale still renders.
 */
export type NavCatalog = Record<LocaleT, Record<string, { label: string; desc: string }>>

export const shellNav: NavCatalog = {
    en: {
        home: {
            label: 'Home',
            desc: 'Back to the community hub',
        },
        apps: {
            label: 'Apps',
            desc: 'Games & applications we support',
        },
        assets: {
            label: 'Assets',
            desc: 'Skins, maps, models & more',
        },
        mods: {
            label: 'Mods',
            desc: 'Community-built modifications',
        },
        servers: {
            label: 'Servers',
            desc: 'Find & track game servers',
        },
        parties: {
            label: 'Parties',
            desc: 'Find a game to jump into or start your own',
        },
        resources: {
            label: 'Resources',
            desc: 'Community links, roadmap and dev tracker',
        },
        discord: {
            label: 'Discord Server',
            desc: 'Join our Discord community',
        },
        blog: {
            label: 'Blog',
            desc: 'News & write-ups',
        },
        community: {
            label: 'Community',
            desc: "What's new with the community",
        },
        banners: {
            label: 'Banners',
            desc: 'Embeddable banner images for the site and your content',
        },
        roadmap: {
            label: 'Roadmap',
            desc: 'Where we\'re headed',
        },
        devTracker: {
            label: 'Dev Tracker',
            desc: 'Track development issues',
        },
    },
    es: {
        home: {
            label: 'Inicio',
            desc: 'Volver al centro de la comunidad',
        },
        apps: {
            label: 'Aplicaciones',
            desc: 'Juegos y aplicaciones compatibles',
        },
        assets: {
            label: 'Recursos',
            desc: 'Skins, mapas, modelos y más',
        },
        mods: {
            label: 'Mods',
            desc: 'Modificaciones creadas por la comunidad',
        },
        servers: {
            label: 'Servidores',
            desc: 'Encuentra y monitoriza servidores de juego',
        },
        parties: {
            label: 'Partidas',
            desc: 'Encuentra una partida a la que unirte o crea la tuya',
        },
        resources: {
            label: 'Recursos',
            desc: 'Blog, foro y enlaces de la comunidad',
        },
        discord: {
            label: 'Servidor de Discord',
            desc: 'Únete a nuestra comunidad de Discord',
        },
        blog: {
            label: 'Blog',
            desc: 'Noticias y artículos',
        },
        roadmap: {
            label: 'Hoja de ruta',
            desc: 'Hacia dónde vamos',
        },
        devTracker: {
            label: 'Seguimiento de desarrollo',
            desc: 'Sigue las incidencias de desarrollo',
        },
    },
    fr: {
        home: {
            label: 'Accueil',
            desc: 'Retour au hub de la communauté',
        },
        apps: {
            label: 'Applis',
            desc: 'Jeux et applications pris en charge',
        },
        assets: {
            label: 'Ressources',
            desc: 'Skins, cartes, modèles et plus',
        },
        mods: {
            label: 'Mods',
            desc: 'Modifications créées par la communauté',
        },
        servers: {
            label: 'Serveurs',
            desc: 'Trouver et suivre des serveurs de jeu',
        },
        parties: {
            label: 'Sessions',
            desc: 'Trouvez une partie à rejoindre ou lancez la vôtre',
        },
        resources: {
            label: 'Ressources',
            desc: 'Blog, forum et liens de la communauté',
        },
        discord: {
            label: 'Serveur Discord',
            desc: 'Rejoignez notre communauté Discord',
        },
        blog: {
            label: 'Blog',
            desc: 'Actualités et articles',
        },
        roadmap: {
            label: 'Feuille de route',
            desc: 'Nos prochaines étapes',
        },
        devTracker: {
            label: 'Suivi dev',
            desc: 'Suivre les tickets de développement',
        },
    },
    de: {
        home: {
            label: 'Startseite',
            desc: 'Zurück zum Community-Hub',
        },
        apps: {
            label: 'Apps',
            desc: 'Spiele & Anwendungen, die wir unterstützen',
        },
        assets: {
            label: 'Assets',
            desc: 'Skins, Karten, Modelle & mehr',
        },
        mods: {
            label: 'Mods',
            desc: 'Von der Community erstellte Modifikationen',
        },
        servers: {
            label: 'Server',
            desc: 'Game-Server finden & verfolgen',
        },
        parties: {
            label: 'Partys',
            desc: 'Finde eine Runde zum Mitspielen oder starte deine eigene',
        },
        resources: {
            label: 'Ressourcen',
            desc: 'Blog, Forum und Community-Links',
        },
        discord: {
            label: 'Discord-Server',
            desc: 'Treten Sie unserer Discord-Community bei',
        },
        blog: {
            label: 'Blog',
            desc: 'News & Berichte',
        },
        roadmap: {
            label: 'Roadmap',
            desc: 'Wohin es für uns geht',
        },
        devTracker: {
            label: 'Dev Tracker',
            desc: 'Entwicklungs-Issues verfolgen',
        },
    },
    ru: {
        home: {
            label: 'Главная',
            desc: 'Вернуться на главную сообщества',
        },
        apps: {
            label: 'Игры',
            desc: 'Игры и приложения, которые мы поддерживаем',
        },
        assets: {
            label: 'Ресурсы',
            desc: 'Скины, карты, модели и не только',
        },
        mods: {
            label: 'Моды',
            desc: 'Модификации от сообщества',
        },
        servers: {
            label: 'Серверы',
            desc: 'Поиск и отслеживание игровых серверов',
        },
        parties: {
            label: 'Пати',
            desc: 'Найдите игру, к которой можно присоединиться, или создайте свою',
        },
        resources: {
            label: 'Ресурсы',
            desc: 'Блог, форум и ссылки сообщества',
        },
        discord: {
            label: 'Сервер Discord',
            desc: 'Присоединяйтесь к нашему сообществу в Discord',
        },
        blog: {
            label: 'Блог',
            desc: 'Новости и статьи',
        },
        roadmap: {
            label: 'Планы развития',
            desc: 'Куда мы движемся',
        },
        devTracker: {
            label: 'Трекер разработки',
            desc: 'Отслеживание задач разработки',
        },
    },
    nl: {
        home: {
            label: 'Home',
            desc: 'Terug naar de community-hub',
        },
        apps: {
            label: 'Apps',
            desc: 'Games en applicaties die we ondersteunen',
        },
        assets: {
            label: 'Assets',
            desc: 'Skins, maps, modellen en meer',
        },
        mods: {
            label: 'Mods',
            desc: 'Modificaties gemaakt door de community',
        },
        servers: {
            label: 'Servers',
            desc: 'Vind en volg game servers',
        },
        parties: {
            label: "Party's",
            desc: 'Vind een spel om aan mee te doen of start je eigen party',
        },
        resources: {
            label: 'Bronnen',
            desc: 'Blog, forum en communitylinks',
        },
        discord: {
            label: 'Discord-server',
            desc: 'Word lid van onze Discord-community',
        },
        blog: {
            label: 'Blog',
            desc: 'Nieuws en artikelen',
        },
        roadmap: {
            label: 'Roadmap',
            desc: 'Waar we naartoe gaan',
        },
        devTracker: {
            label: 'Dev Tracker',
            desc: 'Volg ontwikkelissues',
        },
    },
    ja: {
        home: {
            label: 'ホーム',
            desc: 'コミュニティハブに戻る',
        },
        apps: {
            label: 'アプリ',
            desc: '対応しているゲーム・アプリケーション',
        },
        assets: {
            label: 'アセット',
            desc: 'スキン、マップ、モデルなど',
        },
        mods: {
            label: 'MOD',
            desc: 'コミュニティが作った MOD',
        },
        servers: {
            label: 'サーバー',
            desc: 'ゲームサーバーを検索・追跡',
        },
        parties: {
            label: 'パーティー',
            desc: '参加できるゲームを探す、または自分で立てる',
        },
        resources: {
            label: 'リソース',
            desc: 'ブログ、フォーラム、コミュニティリンク',
        },
        discord: {
            label: 'Discord サーバー',
            desc: 'Discord コミュニティに参加',
        },
        blog: {
            label: 'ブログ',
            desc: 'ニュースと記事',
        },
        roadmap: {
            label: 'ロードマップ',
            desc: '今後の展望',
        },
        devTracker: {
            label: '開発トラッカー',
            desc: '開発中の課題を追跡',
        },
    },
    zh: {
        home: {
            label: '首页',
            desc: '返回社区主页',
        },
        apps: {
            label: '游戏',
            desc: '我们支持的游戏与应用',
        },
        assets: {
            label: '资源',
            desc: '皮肤、地图、模型等',
        },
        mods: {
            label: '模组',
            desc: '社区制作的模组',
        },
        servers: {
            label: '服务器',
            desc: '查找并追踪游戏服务器',
        },
        parties: {
            label: '组队',
            desc: '找一局加入，或者自己开一局',
        },
        resources: {
            label: '资源',
            desc: '博客、论坛和社区链接',
        },
        discord: {
            label: 'Discord 服务器',
            desc: '加入我们的 Discord 社区',
        },
        blog: {
            label: '博客',
            desc: '新闻与文章',
        },
        roadmap: {
            label: '路线图',
            desc: '我们的未来规划',
        },
        devTracker: {
            label: '开发追踪',
            desc: '追踪开发问题',
        },
    },
    pt: {
        home: {
            label: 'Início',
            desc: 'Voltar ao centro da comunidade',
        },
        apps: {
            label: 'Aplicações',
            desc: 'Jogos e aplicações que suportamos',
        },
        assets: {
            label: 'Recursos',
            desc: 'Skins, mapas, modelos e mais',
        },
        mods: {
            label: 'Mods',
            desc: 'Modificações criadas pela comunidade',
        },
        servers: {
            label: 'Servidores',
            desc: 'Encontre e acompanhe servidores de jogo',
        },
        parties: {
            label: 'Partidas',
            desc: 'Encontre um jogo para entrar ou crie a sua',
        },
        resources: {
            label: 'Recursos',
            desc: 'Blog, fórum e links da comunidade',
        },
        discord: {
            label: 'Servidor Discord',
            desc: 'Junte-se à nossa comunidade no Discord',
        },
        blog: {
            label: 'Blog',
            desc: 'Notícias e artigos',
        },
        roadmap: {
            label: 'Roteiro',
            desc: 'Para onde vamos',
        },
        devTracker: {
            label: 'Dev Tracker',
            desc: 'Acompanhe os problemas de desenvolvimento',
        },
    },
}
