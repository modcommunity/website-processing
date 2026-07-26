import type { LocaleT } from '../config'

/**
 * Header navigation labels + dropdown descriptions, ported verbatim from
 * website-city's `locales/<lang>/nav.json` so the two headers read identically
 * in all nine languages. Keys mirror city's `nav.items.*`; the shape is flat
 * (`apps.label` / `apps.desc`) so `getT` can resolve it by dot-path.
 *
 * Keep in sync with website-city's PRIMARY_NAV — that config is the source of
 * truth for which entries the header shows and in what order.
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
        resources: {
            label: 'Resources',
            desc: 'Blog, forum, and community links',
        },
        blog: {
            label: 'Blog',
            desc: 'News & write-ups',
        },
        forum: {
            label: 'Forum',
            desc: 'Discuss with the community',
        },
        discord: {
            label: 'Discord Server',
            desc: 'Join our Discord community',
        },
        users: {
            label: 'Users',
            desc: 'Browse community members',
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
        resources: {
            label: 'Recursos',
            desc: 'Blog, foro y enlaces de la comunidad',
        },
        blog: {
            label: 'Blog',
            desc: 'Noticias y artículos',
        },
        forum: {
            label: 'Foro',
            desc: 'Debate con la comunidad',
        },
        discord: {
            label: 'Servidor de Discord',
            desc: 'Únete a nuestra comunidad de Discord',
        },
        users: {
            label: 'Usuarios',
            desc: 'Explora los miembros de la comunidad',
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
        resources: {
            label: 'Ressources',
            desc: 'Blog, forum et liens de la communauté',
        },
        blog: {
            label: 'Blog',
            desc: 'Actualités et articles',
        },
        forum: {
            label: 'Forum',
            desc: 'Échangez avec la communauté',
        },
        discord: {
            label: 'Serveur Discord',
            desc: 'Rejoignez notre communauté Discord',
        },
        users: {
            label: 'Utilisateurs',
            desc: 'Parcourir les membres de la communauté',
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
        resources: {
            label: 'Ressourcen',
            desc: 'Blog, Forum und Community-Links',
        },
        blog: {
            label: 'Blog',
            desc: 'News & Berichte',
        },
        forum: {
            label: 'Forum',
            desc: 'Mit der Community diskutieren',
        },
        discord: {
            label: 'Discord-Server',
            desc: 'Treten Sie unserer Discord-Community bei',
        },
        users: {
            label: 'Benutzer',
            desc: 'Community-Mitglieder durchsuchen',
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
        resources: {
            label: 'Ресурсы',
            desc: 'Блог, форум и ссылки сообщества',
        },
        blog: {
            label: 'Блог',
            desc: 'Новости и статьи',
        },
        forum: {
            label: 'Форум',
            desc: 'Обсуждения с сообществом',
        },
        discord: {
            label: 'Сервер Discord',
            desc: 'Присоединяйтесь к нашему сообществу в Discord',
        },
        users: {
            label: 'Пользователи',
            desc: 'Просмотр участников сообщества',
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
        resources: {
            label: 'Bronnen',
            desc: 'Blog, forum en communitylinks',
        },
        blog: {
            label: 'Blog',
            desc: 'Nieuws en artikelen',
        },
        forum: {
            label: 'Forum',
            desc: 'Praat mee met de community',
        },
        discord: {
            label: 'Discord-server',
            desc: 'Word lid van onze Discord-community',
        },
        users: {
            label: 'Gebruikers',
            desc: 'Blader door communityleden',
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
        resources: {
            label: 'リソース',
            desc: 'ブログ、フォーラム、コミュニティリンク',
        },
        blog: {
            label: 'ブログ',
            desc: 'ニュースと記事',
        },
        forum: {
            label: 'フォーラム',
            desc: 'コミュニティで語り合う',
        },
        discord: {
            label: 'Discord サーバー',
            desc: 'Discord コミュニティに参加',
        },
        users: {
            label: 'ユーザー',
            desc: 'コミュニティメンバーを見る',
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
        resources: {
            label: '资源',
            desc: '博客、论坛和社区链接',
        },
        blog: {
            label: '博客',
            desc: '新闻与文章',
        },
        forum: {
            label: '论坛',
            desc: '与社区一起讨论',
        },
        discord: {
            label: 'Discord 服务器',
            desc: '加入我们的 Discord 社区',
        },
        users: {
            label: '用户',
            desc: '浏览社区成员',
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
        resources: {
            label: 'Recursos',
            desc: 'Blog, fórum e links da comunidade',
        },
        blog: {
            label: 'Blog',
            desc: 'Notícias e artigos',
        },
        forum: {
            label: 'Fórum',
            desc: 'Discuta com a comunidade',
        },
        discord: {
            label: 'Servidor Discord',
            desc: 'Junte-se à nossa comunidade no Discord',
        },
        users: {
            label: 'Utilizadores',
            desc: 'Explore os membros da comunidade',
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
