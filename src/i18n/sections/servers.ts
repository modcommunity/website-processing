import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-1-light hover:duration-300'

export const servers: SectionCatalog = {
    en: {
        eyebrow: 'Servers',
        titleHtml:
            'Explore Over <span class="special italic">100,000</span> Servers Across <span class="special italic">40+</span> Games',
        introHtml:
            `We track servers for <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a>, and many other games.`,
        c1t: 'Server Browser',
        c1b:
            'Search over <span class="special">100,000</span> servers and filter by game, name, map, <span class="special">game mode</span>, location and more.',
        c2t: 'Live Player Counts',
        c2b:
            'We re-query tracked servers about every <span class="special">five minutes</span>, sooner for busy ones, and show player counts, map names and connection info.',
        c3t: 'History',
        c3b:
            'Player counts and maps are kept for <span class="special">over a year</span> and shown as graphs, so you can see how a server changes over time.',
        c4t: 'Player Tracking',
        c4b:
            'We record players across servers, with score, playtime and individual sessions, so each server has a list of its <span class="special">top players</span>.',
        c5t: 'Favorites & Hiding',
        c5b:
            '<span class="special">Favorite</span> the servers you play on and <span class="special">hide</span> the ones you do not want to see.',
        c6t: 'Many Games',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod and more, through <span class="special">17 query protocols</span>.`,
        browse: 'Browse Servers',
        // Links out to /tmc-app, which is translated in all nine locales too.
        appLink: 'Get Live Pings In The App',
    },
    es: {
        eyebrow: 'Servidores',
        titleHtml:
            'Explora Más de <span class="special italic">100.000</span> Servidores en <span class="special italic">40+</span> Juegos',
        introHtml:
            `Seguimos servidores de <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> y muchos otros juegos.`,
        c1t: 'Buscador De Servidores',
        c1b:
            'Busca entre más de <span class="special">100 000</span> servidores y filtra por juego, nombre, mapa, <span class="special">modo de juego</span>, ubicación y más.',
        c2t: 'Jugadores En Directo',
        c2b:
            'Consultamos los servidores seguidos cada <span class="special">cinco minutos</span> aproximadamente, antes si tienen actividad, y mostramos jugadores, mapa y datos de conexión.',
        c3t: 'Historial',
        c3b:
            'Guardamos jugadores y mapas durante <span class="special">más de un año</span> y los mostramos en gráficos para que veas cómo cambia un servidor.',
        c4t: 'Seguimiento de Jugadores',
        c4b:
            'Registramos a los jugadores entre servidores, con puntuación, tiempo de juego y sesiones, y cada servidor tiene su lista de <span class="special">mejores jugadores</span>.',
        c5t: 'Favoritos y Ocultar',
        c5b:
            '<span class="special">Marca como favoritos</span> los servidores en los que juegas y <span class="special">oculta</span> los que no quieres ver.',
        c6t: 'Muchos Juegos',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod y más, mediante <span class="special">17 protocolos de consulta</span>.`,
        browse: 'Explorar Servidores',
        appLink: 'Obtén Pings En Vivo En La App',
    },
    fr: {
        eyebrow: 'Serveurs',
        titleHtml:
            'Explorez Plus de <span class="special italic">100 000</span> Serveurs sur <span class="special italic">40+</span> Jeux',
        introHtml:
            `Nous suivons des serveurs pour <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> et de nombreux autres jeux.`,
        c1t: 'Navigateur De Serveurs',
        c1b:
            'Cherchez parmi plus de <span class="special">100 000</span> serveurs et filtrez par jeu, nom, carte, <span class="special">mode de jeu</span>, lieu et plus.',
        c2t: 'Joueurs En Direct',
        c2b:
            `Nous interrogeons les serveurs suivis environ toutes les <span class="special">cinq minutes</span>, plus souvent s'ils sont actifs, et affichons joueurs, carte et infos de connexion.`,
        c3t: 'Historique',
        c3b:
            `Joueurs et cartes sont conservés <span class="special">plus d'un an</span> et affichés en graphiques, pour voir l'évolution d'un serveur.`,
        c4t: 'Suivi des Joueurs',
        c4b:
            `Nous enregistrons les joueurs d'un serveur à l'autre, avec score, temps de jeu et sessions, et chaque serveur a sa liste de <span class="special">meilleurs joueurs</span>.`,
        c5t: 'Favoris et Masquage',
        c5b:
            'Ajoutez en <span class="special">favoris</span> les serveurs où vous jouez et <span class="special">masquez</span> ceux que vous ne voulez plus voir.',
        c6t: 'Beaucoup De Jeux',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod et plus, via <span class="special">17 protocoles de requête</span>.`,
        browse: 'Parcourir les Serveurs',
        appLink: 'Des Pings En Direct Dans L\'App',
    },
    de: {
        eyebrow: 'Server',
        titleHtml:
            'Entdecke Über <span class="special italic">100.000</span> Server in <span class="special italic">40+</span> Spielen',
        introHtml:
            `Wir verfolgen Server für <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> und viele weitere Spiele.`,
        c1t: 'Server-Browser',
        c1b:
            'Durchsuche über <span class="special">100.000</span> Server und filtere nach Spiel, Name, Map, <span class="special">Spielmodus</span>, Standort und mehr.',
        c2t: 'Live-Spielerzahlen',
        c2b:
            'Wir fragen verfolgte Server etwa alle <span class="special">fünf Minuten</span> ab, aktive öfter, und zeigen Spielerzahlen, Mapnamen und Verbindungsdaten.',
        c3t: 'Verlauf',
        c3b:
            'Spielerzahlen und Maps bleiben <span class="special">über ein Jahr</span> gespeichert und erscheinen als Diagramme, sodass du siehst, wie sich ein Server entwickelt.',
        c4t: 'Spieler-Tracking',
        c4b:
            'Wir erfassen Spieler serverübergreifend, mit Punktestand, Spielzeit und einzelnen Sitzungen, sodass jeder Server eine Liste seiner <span class="special">Top-Spieler</span> hat.',
        c5t: 'Favoriten & Ausblenden',
        c5b:
            '<span class="special">Favorisiere</span> die Server, auf denen du spielst, und <span class="special">blende</span> die aus, die du nicht sehen willst.',
        c6t: 'Viele Spiele',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod und mehr, über <span class="special">17 Abfrageprotokolle</span>.`,
        browse: 'Server Durchsuchen',
        appLink: 'Live-Pings In Der App',
    },
    ru: {
        eyebrow: 'Серверы',
        titleHtml:
            'Исследуйте Более <span class="special italic">100 000</span> Серверов в <span class="special italic">40+</span> Играх',
        introHtml:
            `Мы отслеживаем серверы <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> и многих других игр.`,
        c1t: 'Браузер Серверов',
        c1b:
            'Ищите среди более чем <span class="special">100 000</span> серверов и фильтруйте по игре, названию, карте, <span class="special">режиму игры</span>, расположению и другому.',
        c2t: 'Онлайн В Реальном Времени',
        c2b:
            'Отслеживаемые серверы мы опрашиваем примерно раз в <span class="special">пять минут</span>, загруженные чаще, и показываем онлайн, карту и данные для подключения.',
        c3t: 'История',
        c3b:
            'Онлайн и карты хранятся <span class="special">больше года</span> и показываются на графиках, так что видно, как меняется сервер.',
        c4t: 'Отслеживание Игроков',
        c4b:
            'Мы записываем игроков на разных серверах: очки, время игры и отдельные сессии. У каждого сервера есть список <span class="special">лучших игроков</span>.',
        c5t: 'Избранное и Скрытие',
        c5b:
            'Добавляйте в <span class="special">избранное</span> серверы, на которых играете, и <span class="special">скрывайте</span> ненужные.',
        c6t: 'Много Игр',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod и другие, через <span class="special">17 протоколов запросов</span>.`,
        browse: 'Смотреть Серверы',
        appLink: 'Живой Пинг В Приложении',
    },
    nl: {
        eyebrow: 'Servers',
        titleHtml:
            'Ontdek Meer dan <span class="special italic">100.000</span> Servers in <span class="special italic">40+</span> Games',
        introHtml:
            `We volgen servers voor <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> en veel andere games.`,
        c1t: 'Serverbrowser',
        c1b:
            'Zoek in meer dan <span class="special">100.000</span> servers en filter op game, naam, map, <span class="special">spelmodus</span>, locatie en meer.',
        c2t: 'Live Spelersaantallen',
        c2b:
            'We vragen gevolgde servers ongeveer elke <span class="special">vijf minuten</span> op, drukke vaker, en tonen spelersaantallen, mapnamen en verbindingsgegevens.',
        c3t: 'Geschiedenis',
        c3b:
            'Spelersaantallen en maps bewaren we <span class="special">langer dan een jaar</span> en tonen we in grafieken, zodat je ziet hoe een server verandert.',
        c4t: 'Spelers Volgen',
        c4b:
            'We registreren spelers over servers heen, met score, speeltijd en losse sessies, zodat elke server een lijst met <span class="special">topspelers</span> heeft.',
        c5t: 'Favorieten & Verbergen',
        c5b:
            '<span class="special">Favoriet</span> de servers waarop je speelt en <span class="special">verberg</span> degene die je niet wilt zien.',
        c6t: 'Veel Games',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod en meer, via <span class="special">17 queryprotocollen</span>.`,
        browse: 'Servers Bekijken',
        appLink: 'Live Pings In De App',
    },
    ja: {
        eyebrow: 'サーバー',
        titleHtml:
            '<span class="special italic">40+</span> のゲームにまたがる <span class="special italic">100,000</span> 台以上のサーバーを探索',
        introHtml:
            `<a href="/minecraft" class="${A}">Minecraft</a>、<a href="/rust" class="${A}">Rust</a>、<a href="/cs2" class="${A}">Counter-Strike</a>、<a href="/gmod" class="${A}">Garry's Mod</a>、<a href="/project-zomboid" class="${A}">Project Zomboid</a>など、多くのゲームのサーバーを追跡しています。`,
        c1t: 'サーバーブラウザ',
        c1b:
            '<span class="special">100,000</span>台以上のサーバーを検索し、ゲーム、名前、マップ、<span class="special">ゲームモード</span>、場所などで絞り込めます。',
        c2t: 'リアルタイムの人数',
        c2b: '追跡中のサーバーには約<span class="special">5分</span>ごと（混んでいるサーバーはもっと頻繁に）に問い合わせ、プレイヤー数、マップ名、接続情報を表示します。',
        c3t: '履歴',
        c3b: 'プレイヤー数とマップは<span class="special">1年以上</span>保存し、グラフで表示します。サーバーの変化を時系列で確認できます。',
        c4t: 'プレイヤー追跡',
        c4b:
            'サーバーをまたいでプレイヤーを記録し、スコア、プレイ時間、個別のセッションを保存します。各サーバーの<span class="special">トッププレイヤー</span>も確認できます。',
        c5t: 'お気に入りと非表示',
        c5b: '遊ぶサーバーを<span class="special">お気に入り</span>に追加し、見たくないサーバーは<span class="special">非表示</span>にできます。',
        c6t: '多数のゲームに対応',
        c6b: `Rust、CS2、Minecraft、Garry's Modなどに、<span class="special">17種類のクエリプロトコル</span>で対応しています。`,
        browse: 'サーバーを見る',
        appLink: 'アプリでリアルタイムの Ping を',
    },
    zh: {
        eyebrow: '服务器',
        titleHtml:
            '探索 <span class="special italic">40+</span> 款游戏中超过 <span class="special italic">100,000</span> 台服务器',
        introHtml:
            `我们追踪 <a href="/minecraft" class="${A}">Minecraft</a>、<a href="/rust" class="${A}">Rust</a>、<a href="/cs2" class="${A}">Counter-Strike</a>、<a href="/gmod" class="${A}">Garry's Mod</a>、<a href="/project-zomboid" class="${A}">Project Zomboid</a> 等众多游戏的服务器。`,
        c1t: '服务器浏览器',
        c1b:
            '可在超过 <span class="special">100,000</span> 台服务器中搜索，并按游戏、名称、地图、<span class="special">游戏模式</span>、位置等筛选。',
        c2t: '实时玩家人数',
        c2b: '我们大约每<span class="special">五分钟</span>重新查询一次被追踪的服务器，活跃的更频繁，并显示玩家数、地图名和连接信息。',
        c3t: '历史记录',
        c3b: '玩家数和地图会保存<span class="special">一年以上</span>，并以图表展示，方便查看服务器的变化。',
        c4t: '玩家追踪',
        c4b: '我们会跨服务器记录玩家的得分、游戏时长和单次会话，因此每台服务器都有自己的<span class="special">顶级玩家</span>列表。',
        c5t: '收藏与隐藏',
        c5b: '把常玩的服务器设为<span class="special">收藏</span>，把不想看到的服务器<span class="special">隐藏</span>。',
        c6t: '支持多款游戏',
        c6b: `Rust、CS2、Minecraft、Garry's Mod 等，通过 <span class="special">17 种查询协议</span>支持。`,
        browse: '浏览服务器',
        appLink: '在应用中获取实时延迟',
    },
    pt: {
        eyebrow: 'Servidores',
        titleHtml:
            'Explore Mais de <span class="special italic">100.000</span> Servidores em <span class="special italic">40+</span> Jogos',
        introHtml:
            `Acompanhamos servidores de <a href="/minecraft" class="${A}">Minecraft</a>, <a href="/rust" class="${A}">Rust</a>, <a href="/cs2" class="${A}">Counter-Strike</a>, <a href="/gmod" class="${A}">Garry's Mod</a>, <a href="/project-zomboid" class="${A}">Project Zomboid</a> e de muitos outros jogos.`,
        c1t: 'Navegador De Servidores',
        c1b:
            'Pesquise mais de <span class="special">100 000</span> servidores e filtre por jogo, nome, mapa, <span class="special">modo de jogo</span>, localização e mais.',
        c2t: 'Jogadores Em Tempo Real',
        c2b:
            'Consultamos os servidores acompanhados cerca de a cada <span class="special">cinco minutos</span>, mais vezes se tiverem atividade, e mostramos jogadores, mapa e dados de ligação.',
        c3t: 'Histórico',
        c3b:
            'Guardamos jogadores e mapas durante <span class="special">mais de um ano</span> e mostramo-los em gráficos, para ver como um servidor muda.',
        c4t: 'Rastreamento de Jogadores',
        c4b:
            'Registamos jogadores entre servidores, com pontuação, tempo de jogo e sessões, e cada servidor tem a sua lista de <span class="special">melhores jogadores</span>.',
        c5t: 'Favoritos e Ocultar',
        c5b:
            'Marque como <span class="special">favoritos</span> os servidores onde joga e <span class="special">oculte</span> os que não quer ver.',
        c6t: 'Muitos Jogos',
        c6b:
            `Rust, CS2, Minecraft, Garry's Mod e mais, através de <span class="special">17 protocolos de consulta</span>.`,
        browse: 'Explorar Servidores',
        appLink: 'Pings Ao Vivo No App',
    },
}
