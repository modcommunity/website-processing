import type { SectionCatalog } from './types'

/*
 * Communities.
 *
 * The angle here is that a community is USER-RUN and open to anybody: city's
 * `/communities/add` is gated on being signed in and nothing else (see
 * `src/app/[locale]/communities/add/page.tsx` there — `if (!session)
 * redirect('/login')`, no role check), so "anyone with an account can start
 * one, no application and no approval" is a claim the code actually backs.
 *
 * What can be linked to one is likewise checked rather than invented: every
 * model carrying a `communityId` in city's schema. That is mods, servers,
 * assets and articles, and also discussions, questions, a roadmap, a changelog
 * and a bug tracker — which is why the copy says "and more" and then names a
 * few of them instead of stopping at the first four.
 */
export const communities: SectionCatalog = {
    en: {
        eyebrow: 'Communities',
        titleHtml:
            'Start And Run Your Own <span class="special">Community</span>',
        introHtml:
            'Communities are <span class="special">user-run</span> hubs. Anyone with an account can start one, with no application and no approval queue. Link your <span class="special">mods</span>, <span class="special">servers</span> and <span class="special">assets</span>, add articles, discussions and a roadmap, and run it with your own team.',
        c1t: 'Anybody Can Start One',
        c1b: 'Sign in and create one in a minute. It is <span class="special">yours to run</span>.',
        c2t: 'Link What You Already Made',
        c2b:
            'Attach your <span class="special">mods</span>, <span class="special">servers</span>, <span class="special">assets</span> and articles. Each community also gets discussions, a roadmap and a changelog.',
        c3t: 'Spans Several Games',
        c3b:
            'One community can cover <span class="special">several games</span>, so people follow <span class="special">you</span> instead of a game tag.',
        c4t: 'Stats Dashboard',
        c4b:
            'Reach, <span class="special">contributors</span> and engagement over time, plus <span class="special">combined player counts</span> across every server you run.',
        button: 'Browse Communities',
        buttonCreate: 'Create A Community',
    },
    es: {
        eyebrow: 'Comunidades',
        titleHtml: 'Crea Y Dirige Tu Propia <span class="special">Comunidad</span>',
        introHtml:
            'Las comunidades son espacios <span class="special">gestionados por usuarios</span>. Cualquiera con una cuenta puede crear una, sin solicitud ni cola de aprobación. Enlaza tus <span class="special">mods</span>, <span class="special">servidores</span> y <span class="special">recursos</span>, añade artículos, debates y una hoja de ruta, y llévala con tu propio equipo.',
        c1t: 'Cualquiera Puede Crear Una',
        c1b: 'Inicia sesión y crea una en un minuto. Es <span class="special">tuya para gestionar</span>.',
        c2t: 'Enlaza Lo Que Ya Has Hecho',
        c2b:
            'Adjunta tus <span class="special">mods</span>, <span class="special">servidores</span>, <span class="special">recursos</span> y artículos. Cada comunidad también tiene debates, hoja de ruta y registro de cambios.',
        c3t: 'Abarca Varios Juegos',
        c3b:
            'Una comunidad puede abarcar <span class="special">varios juegos</span>, así que la gente te sigue a <span class="special">ti</span> y no a una etiqueta de juego.',
        c4t: 'Panel De Estadísticas',
        c4b:
            'Alcance, <span class="special">colaboradores</span> y participación a lo largo del tiempo, más los <span class="special">jugadores combinados</span> de todos tus servidores.',
        button: 'Explorar Comunidades',
        buttonCreate: 'Crear Una Comunidad',
    },
    fr: {
        eyebrow: 'Communautés',
        titleHtml:
            'Créez Et Animez Votre Propre <span class="special">Communauté</span>',
        introHtml:
            `Les communautés sont des espaces <span class="special">gérés par leurs membres</span>. Toute personne avec un compte peut en créer une, sans demande ni file d'approbation. Liez vos <span class="special">mods</span>, <span class="special">serveurs</span> et <span class="special">ressources</span>, ajoutez des articles, des discussions et une feuille de route, et gérez le tout avec votre équipe.`,
        c1t: "N'importe Qui Peut En Créer Une",
        c1b: 'Connectez-vous et créez-en une en une minute. Elle est <span class="special">à vous</span>.',
        c2t: 'Reliez Ce Que Vous Avez Déjà Fait',
        c2b:
            'Rattachez vos <span class="special">mods</span>, <span class="special">serveurs</span>, <span class="special">ressources</span> et articles. Chaque communauté a aussi des discussions, une feuille de route et un journal des modifications.',
        c3t: 'Couvre Plusieurs Jeux',
        c3b:
            'Une communauté peut couvrir <span class="special">plusieurs jeux</span> : on vous suit <span class="special">vous</span>, pas une étiquette de jeu.',
        c4t: 'Tableau De Statistiques',
        c4b:
            'Audience, <span class="special">contributeurs</span> et activité dans le temps, plus le <span class="special">total des joueurs</span> sur tous vos serveurs.',
        button: 'Parcourir Les Communautés',
        buttonCreate: 'Créer Une Communauté',
    },
    de: {
        eyebrow: 'Communitys',
        titleHtml:
            'Gründe Und Leite Deine Eigene <span class="special">Community</span>',
        introHtml:
            'Communitys sind <span class="special">selbstverwaltete</span> Treffpunkte. Jeder mit Konto kann eine gründen, ohne Antrag und ohne Freigabe. Verknüpfe deine <span class="special">Mods</span>, <span class="special">Server</span> und <span class="special">Assets</span>, ergänze Artikel, Diskussionen und eine Roadmap und leite alles mit deinem eigenen Team.',
        c1t: 'Jeder Kann Eine Gründen',
        c1b: 'Melde dich an und erstelle eine in einer Minute. Sie gehört <span class="special">dir</span>.',
        c2t: 'Verknüpfe, Was Du Schon Gebaut Hast',
        c2b:
            'Hänge deine <span class="special">Mods</span>, <span class="special">Server</span>, <span class="special">Assets</span> und Artikel an. Jede Community hat außerdem Diskussionen, eine Roadmap und ein Changelog.',
        c3t: 'Umfasst Mehrere Spiele',
        c3b:
            'Eine Community kann <span class="special">mehrere Spiele</span> abdecken, sodass Leute <span class="special">dir</span> folgen statt einem Spiele-Tag.',
        c4t: 'Statistik-Dashboard',
        c4b:
            'Reichweite, <span class="special">Mitwirkende</span> und Aktivität im Zeitverlauf, dazu die <span class="special">gesamten Spielerzahlen</span> aller deiner Server.',
        button: 'Communitys Durchstöbern',
        buttonCreate: 'Community Gründen',
    },
    ru: {
        eyebrow: 'Сообщества',
        titleHtml:
            'Создайте И Ведите Собственное <span class="special">Сообщество</span>',
        introHtml:
            'Сообщества это площадки, которыми <span class="special">управляют пользователи</span>. Создать сообщество может любой владелец аккаунта, без заявки и очереди на одобрение. Привяжите свои <span class="special">моды</span>, <span class="special">серверы</span> и <span class="special">ассеты</span>, добавьте статьи, обсуждения и дорожную карту и управляйте всем вместе со своей командой.',
        c1t: 'Создать Может Каждый',
        c1b: 'Войдите и создайте сообщество за минуту. Оно <span class="special">полностью ваше</span>.',
        c2t: 'Привяжите То, Что Уже Сделали',
        c2b:
            'Прикрепляйте свои <span class="special">моды</span>, <span class="special">серверы</span>, <span class="special">ассеты</span> и статьи. У каждого сообщества также есть обсуждения, дорожная карта и список изменений.',
        c3t: 'Охватывает Несколько Игр',
        c3b:
            'Одно сообщество может охватывать <span class="special">несколько игр</span>, так что люди следят за <span class="special">вами</span>, а не за тегом игры.',
        c4t: 'Панель Статистики',
        c4b:
            'Охват, <span class="special">участники</span> и вовлечённость во времени, а также <span class="special">суммарный онлайн</span> на всех ваших серверах.',
        button: 'Смотреть Сообщества',
        buttonCreate: 'Создать Сообщество',
    },
    nl: {
        eyebrow: 'Gemeenschappen',
        titleHtml:
            'Start En Run Je Eigen <span class="special">Gemeenschap</span>',
        introHtml:
            'Communities zijn hubs <span class="special">door gebruikers beheerd</span>. Iedereen met een account kan er een starten, zonder aanvraag of goedkeuringswachtrij. Koppel je <span class="special">mods</span>, <span class="special">servers</span> en <span class="special">assets</span>, voeg artikelen, discussies en een roadmap toe en run het met je eigen team.',
        c1t: 'Iedereen Kan Er Een Starten',
        c1b: 'Log in en maak er in een minuut een. Ze is <span class="special">van jou</span>.',
        c2t: 'Koppel Wat Je Al Maakte',
        c2b:
            'Koppel je <span class="special">mods</span>, <span class="special">servers</span>, <span class="special">assets</span> en artikelen. Elke community heeft ook discussies, een roadmap en een changelog.',
        c3t: 'Omvat Meerdere Games',
        c3b:
            'Eén community kan <span class="special">meerdere games</span> omvatten, zodat mensen <span class="special">jou</span> volgen in plaats van een gametag.',
        c4t: 'Statistiekendashboard',
        c4b:
            'Bereik, <span class="special">bijdragers</span> en betrokkenheid in de tijd, plus de <span class="special">totale spelersaantallen</span> van al je servers.',
        button: 'Gemeenschappen Bekijken',
        buttonCreate: 'Gemeenschap Starten',
    },
    ja: {
        eyebrow: 'コミュニティ',
        titleHtml:
            '自分の <span class="special">コミュニティ</span> を作って運営しよう',
        introHtml:
            'コミュニティは<span class="special">ユーザーが運営する</span>拠点です。アカウントがあれば誰でも、申請も承認待ちもなく作れます。公開している<span class="special">MOD</span>、<span class="special">サーバー</span>、<span class="special">アセット</span>をひも付け、記事、ディスカッション、ロードマップを加えて、自分のチームで運営できます。',
        c1t: '誰でも作れます',
        c1b: 'ログインして1分で作成できます。運営は<span class="special">あなた次第</span>です。',
        c2t: '作ったものをひも付ける',
        c2b:
            '<span class="special">MOD</span>、<span class="special">サーバー</span>、<span class="special">アセット</span>、記事を添付できます。コミュニティごとにディスカッション、ロードマップ、変更履歴も使えます。',
        c3t: '複数のゲームにまたがる',
        c3b:
            'ひとつのコミュニティで<span class="special">複数のゲーム</span>を扱えるので、ゲームのタグではなく<span class="special">あなた</span>をフォローしてもらえます。',
        c4t: '統計ダッシュボード',
        c4b:
            'リーチ、<span class="special">貢献者</span>、エンゲージメントの推移に加え、運営する全サーバーの<span class="special">合計プレイヤー数</span>を確認できます。',
        button: 'コミュニティを見る',
        buttonCreate: 'コミュニティを作る',
    },
    zh: {
        eyebrow: '社区',
        titleHtml: '创建并运营属于你的<span class="special">社区</span>',
        introHtml:
            '社区是<span class="special">由用户自己运营</span>的据点。有账号的人都能创建，不用申请，也没有审核队列。把你发布的<span class="special">模组</span>、<span class="special">服务器</span>和<span class="special">资源</span>关联进来，再加上文章、讨论和路线图，由你自己的团队来运营。',
        c1t: '人人都能创建',
        c1b: '登录后一分钟就能创建。社区<span class="special">由你来运营</span>。',
        c2t: '关联你已有的作品',
        c2b:
            '关联你的<span class="special">模组</span>、<span class="special">服务器</span>、<span class="special">资源</span>和文章。每个社区还有讨论、路线图和更新日志。',
        c3t: '横跨多款游戏',
        c3b: '一个社区可以涵盖<span class="special">多款游戏</span>，大家关注的是<span class="special">你</span>，而不是某个游戏标签。',
        c4t: '统计面板',
        c4b: '触达、<span class="special">贡献者</span>和活跃度的变化，以及你运营的所有服务器的<span class="special">合计玩家数</span>。',
        button: '浏览社区',
        buttonCreate: '创建社区',
    },
    pt: {
        eyebrow: 'Comunidades',
        titleHtml: 'Crie E Dirija Sua Própria <span class="special">Comunidade</span>',
        introHtml:
            'As comunidades são espaços <span class="special">geridos por utilizadores</span>. Qualquer pessoa com conta pode criar uma, sem candidatura nem fila de aprovação. Ligue os seus <span class="special">mods</span>, <span class="special">servidores</span> e <span class="special">recursos</span>, adicione artigos, discussões e um roteiro, e gira tudo com a sua equipa.',
        c1t: 'Qualquer Um Pode Criar',
        c1b: 'Inicie sessão e crie uma em um minuto. É <span class="special">sua para gerir</span>.',
        c2t: 'Vincule O Que Você Já Fez',
        c2b:
            'Anexe os seus <span class="special">mods</span>, <span class="special">servidores</span>, <span class="special">recursos</span> e artigos. Cada comunidade tem ainda discussões, roteiro e registo de alterações.',
        c3t: 'Abrange Vários Jogos',
        c3b:
            'Uma comunidade pode abranger <span class="special">vários jogos</span>, por isso as pessoas seguem <span class="special">a si</span> e não uma etiqueta de jogo.',
        c4t: 'Painel De Estatísticas',
        c4b:
            'Alcance, <span class="special">colaboradores</span> e envolvimento ao longo do tempo, mais os <span class="special">jogadores somados</span> de todos os seus servidores.',
        button: 'Explorar Comunidades',
        buttonCreate: 'Criar Uma Comunidade',
    },
}
