import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-1-light hover:duration-300'

export const hero: SectionCatalog = {
    en: {
        paraHtml:
            'A place for modding and game development. Browse <span class="text-accent">game assets</span> and <span class="text-accent">mods</span>, check <span class="text-accent">game</span> and <span class="text-accent">social servers</span>, and start your own <span class="text-accent">communities</span>.',
        card1Title: 'Who We Are',
        card1Html:
            `We're a <span class="special">modding</span> and <span class="special">game development</span> community. <a href="/assets" class="${A}">Assets</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servers</a>, <a href="/communities" class="${A}">communities</a> and <a href="/collections" class="${A}">collections</a> are live, and we write about it on the <a href="https://moddingcommunity.com/blog" class="${A}">blog</a>.`,
        card2Title: 'Open To Everyone',
        card2Html:
            'Singleplayer mod, multiplayer server or your first script: you get the same site and the same <span class="special">tools</span>. No gatekeeping, no paying to be seen, and a place to ask questions.',
        card3Title: 'Open Source',
        card3Html:
            `Our <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub organization</a> has the platform and the tools around it. Read the code, <span class="special">report issues</span> or send a fix.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Source',
        title: 'A Modding & Game Dev Community',
        eyebrow: 'Open source · Community-run',
        ctaExplore: 'Browse The Site',
        ctaDiscord: 'Join The Discord',
        tagline: 'We are creating our own gaming platform!',
        shelfLabel: 'On the site',
        devWarningHtml:
            `The site is under <span class="special">heavy development</span>. See what just shipped in the <a href="/changelog" class="${A}">changelog</a> and what is next on the <a href="/roadmap" class="${A}">roadmap</a>.`,
    },
    es: {
        paraHtml:
            'Un lugar para el modding y el desarrollo de juegos. Explora <span class="text-accent">recursos de juegos</span> y <span class="text-accent">mods</span>, consulta <span class="text-accent">servidores de juegos</span> y <span class="text-accent">sociales</span>, y crea tus propias <span class="text-accent">comunidades</span>.',
        card1Title: 'Quiénes Somos',
        card1Html:
            `Somos una comunidad de <span class="special">modding</span> y <span class="special">desarrollo de juegos</span>. <a href="/assets" class="${A}">Recursos</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servidores</a>, <a href="/communities" class="${A}">comunidades</a> y <a href="/collections" class="${A}">colecciones</a> ya están disponibles, y escribimos sobre ello en el <a href="https://moddingcommunity.com/blog" class="${A}">blog</a>.`,
        card2Title: 'Abierto A Todos',
        card2Html:
            'Un mod para un jugador, un servidor multijugador o tu primer script: tienes el mismo sitio y las mismas <span class="special">herramientas</span>. Sin elitismo, sin pagar por ser visto y con un lugar donde hacer preguntas.',
        card3Title: 'Código Abierto',
        card3Html:
            `Nuestra <a href="https://github.com/modcommunity" target="_blank" class="${A}">organización de GitHub</a> contiene la plataforma y las herramientas que la rodean. Lee el código, <span class="special">informa de errores</span> o envía una corrección.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Código fuente',
        title: 'Una Comunidad de Modding y Desarrollo de Juegos',
        eyebrow: 'Código abierto · Gestionado por la comunidad',
        ctaExplore: 'Explorar El Sitio',
        ctaDiscord: 'Únete Al Discord',
        tagline: '¡Estamos creando nuestra propia plataforma de juegos!',
        shelfLabel: 'En el sitio',
        devWarningHtml:
            `El sitio está en <span class="special">pleno desarrollo</span>. Consulta lo que acaba de salir en el <a href="/changelog" class="${A}">registro de cambios</a> y lo que viene en la <a href="/roadmap" class="${A}">hoja de ruta</a>.`,
    },
    fr: {
        paraHtml:
            'Un lieu pour le modding et le développement de jeux. Parcourez des <span class="text-accent">ressources de jeu</span> et des <span class="text-accent">mods</span>, consultez des <span class="text-accent">serveurs de jeu</span> et <span class="text-accent">sociaux</span>, et créez vos propres <span class="text-accent">communautés</span>.',
        card1Title: 'Qui Sommes-Nous ?',
        card1Html:
            `Nous sommes une communauté de <span class="special">modding</span> et de <span class="special">développement de jeux</span>. <a href="/assets" class="${A}">Ressources</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">serveurs</a>, <a href="/communities" class="${A}">communautés</a> et <a href="/collections" class="${A}">collections</a> sont en ligne, et nous en parlons sur le <a href="https://moddingcommunity.com/blog" class="${A}">blog</a>.`,
        card2Title: 'Ouvert À Tous',
        card2Html:
            `Un mod solo, un serveur multijoueur ou votre premier script : vous avez le même site et les mêmes <span class="special">outils</span>. Pas d'élitisme, pas de paiement pour être vu, et un endroit pour poser vos questions.`,
        card3Title: 'Open Source',
        card3Html:
            `Notre <a href="https://github.com/modcommunity" target="_blank" class="${A}">organisation GitHub</a> héberge la plateforme et les outils qui l'entourent. Lisez le code, <span class="special">signalez des problèmes</span> ou proposez un correctif.`,
        ghButton: 'Org GitHub',
        sourceButton: 'Source',
        title: 'Une Communauté de Modding et de Développement de Jeux',
        eyebrow: 'Open source · Gérée par la communauté',
        ctaExplore: 'Parcourir Le Site',
        ctaDiscord: 'Rejoindre Le Discord',
        tagline: 'Nous créons notre propre plateforme de jeu !',
        shelfLabel: 'Sur le site',
        devWarningHtml:
            `Le site est en <span class="special">plein développement</span>. Voyez ce qui vient de sortir dans le <a href="/changelog" class="${A}">journal des modifications</a> et la suite sur la <a href="/roadmap" class="${A}">feuille de route</a>.`,
    },
    de: {
        paraHtml:
            'Ein Ort für Modding und Spieleentwicklung. Durchstöbere <span class="text-accent">Spiel-Assets</span> und <span class="text-accent">Mods</span>, sieh dir <span class="text-accent">Spiel-</span> und <span class="text-accent">Social-Server</span> an und gründe deine eigenen <span class="text-accent">Communitys</span>.',
        card1Title: 'Wer Wir Sind',
        card1Html:
            `Wir sind eine <span class="special">Modding</span>- und <span class="special">Spieleentwicklungs</span>-Community. <a href="/assets" class="${A}">Ressourcen</a>, <a href="/mods" class="${A}">Mods</a>, <a href="/servers" class="${A}">Server</a>, <a href="/communities" class="${A}">Communitys</a> und <a href="/collections" class="${A}">Sammlungen</a> sind live, und im <a href="https://moddingcommunity.com/blog" class="${A}">Blog</a> schreiben wir darüber.`,
        card2Title: 'Offen Für Alle',
        card2Html:
            'Singleplayer-Mod, Multiplayer-Server oder dein erstes Skript: Du bekommst dieselbe Seite und dieselben <span class="special">Werkzeuge</span>. Kein Gatekeeping, kein Bezahlen für Sichtbarkeit und ein Ort für deine Fragen.',
        card3Title: 'Open Source',
        card3Html:
            `Unsere <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub-Organisation</a> enthält die Plattform und die Werkzeuge drumherum. Lies den Code, <span class="special">melde Probleme</span> oder schick einen Fix.`,
        ghButton: 'GitHub-Org',
        sourceButton: 'Quellcode',
        title: 'Eine Modding- & Spieleentwicklungs-Community',
        eyebrow: 'Open Source · Von der Community betrieben',
        ctaExplore: 'Seite Durchstöbern',
        ctaDiscord: 'Discord Beitreten',
        tagline: 'Wir bauen unsere eigene Gaming-Plattform!',
        shelfLabel: 'Auf der Seite',
        devWarningHtml:
            `Die Seite befindet sich in <span class="special">reger Entwicklung</span>. Was gerade erschienen ist, steht im <a href="/changelog" class="${A}">Änderungsprotokoll</a>, was als Nächstes kommt, auf der <a href="/roadmap" class="${A}">Roadmap</a>.`,
    },
    ru: {
        paraHtml:
            'Место для моддинга и разработки игр. Просматривайте <span class="text-accent">игровые ассеты</span> и <span class="text-accent">моды</span>, смотрите <span class="text-accent">игровые</span> и <span class="text-accent">социальные серверы</span> и создавайте собственные <span class="text-accent">сообщества</span>.',
        card1Title: 'Кто Мы',
        card1Html:
            `Мы сообщество <span class="special">моддинга</span> и <span class="special">разработки игр</span>. <a href="/assets" class="${A}">Ассеты</a>, <a href="/mods" class="${A}">моды</a>, <a href="/servers" class="${A}">серверы</a>, <a href="/communities" class="${A}">сообщества</a> и <a href="/collections" class="${A}">коллекции</a> уже работают, а о новостях мы пишем в <a href="https://moddingcommunity.com/blog" class="${A}">блоге</a>.`,
        card2Title: 'Открыто Для Всех',
        card2Html:
            'Мод для одиночной игры, мультиплеерный сервер или ваш первый скрипт: сайт и <span class="special">инструменты</span> у всех одни и те же. Без снобизма, без платы за видимость, и есть где задать вопрос.',
        card3Title: 'Открытый Исходный Код',
        card3Html:
            `В нашей <a href="https://github.com/modcommunity" target="_blank" class="${A}">организации на GitHub</a> лежит платформа и инструменты вокруг неё. Читайте код, <span class="special">сообщайте о проблемах</span> или присылайте исправления.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Исходный код',
        title: 'Сообщество Моддинга и Разработки Игр',
        eyebrow: 'Открытый код · Сообщество',
        ctaExplore: 'Открыть Сайт',
        ctaDiscord: 'Присоединиться К Discord',
        tagline: 'Мы создаём собственную игровую платформу!',
        shelfLabel: 'На сайте',
        devWarningHtml:
            `Сайт находится в стадии <span class="special">активной разработки</span>. Что уже вышло, смотрите в <a href="/changelog" class="${A}">списке изменений</a>, а что дальше, в <a href="/roadmap" class="${A}">дорожной карте</a>.`,
    },
    nl: {
        paraHtml:
            'Een plek voor modding en gameontwikkeling. Blader door <span class="text-accent">game-assets</span> en <span class="text-accent">mods</span>, bekijk <span class="text-accent">game-</span> en <span class="text-accent">socialservers</span> en start je eigen <span class="text-accent">communities</span>.',
        card1Title: 'Wie Zijn Wij?',
        card1Html:
            `Wij zijn een community voor <span class="special">modding</span> en <span class="special">gameontwikkeling</span>. <a href="/assets" class="${A}">Assets</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servers</a>, <a href="/communities" class="${A}">communities</a> en <a href="/collections" class="${A}">collecties</a> zijn live, en op de <a href="https://moddingcommunity.com/blog" class="${A}">blog</a> schrijven we erover.`,
        card2Title: 'Open Voor Iedereen',
        card2Html:
            'Singleplayer-mod, multiplayerserver of je eerste script: je krijgt dezelfde site en dezelfde <span class="special">tools</span>. Geen gatekeeping, niet betalen om gezien te worden en een plek om vragen te stellen.',
        card3Title: 'Open Source',
        card3Html:
            `Onze <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub-organisatie</a> bevat het platform en de tools eromheen. Lees de code, <span class="special">meld problemen</span> of stuur een fix.`,
        ghButton: 'GitHub-org',
        sourceButton: 'Broncode',
        title: 'Een Modding- & Game Dev-community',
        eyebrow: 'Open source · Door de community beheerd',
        ctaExplore: 'Bekijk De Site',
        ctaDiscord: 'Word Lid Van Discord',
        tagline: 'We bouwen ons eigen gamingplatform!',
        shelfLabel: 'Op de site',
        devWarningHtml:
            `De site is volop in <span class="special">ontwikkeling</span>. Zie wat net is uitgebracht in het <a href="/changelog" class="${A}">changelog</a> en wat er hierna komt op de <a href="/roadmap" class="${A}">roadmap</a>.`,
    },
    ja: {
        paraHtml:
            'MODとゲーム開発のための場所です。<span class="text-accent">ゲームアセット</span>や<span class="text-accent">MOD</span>を探し、<span class="text-accent">ゲームサーバー</span>や<span class="text-accent">ソーシャルサーバー</span>を確認し、自分の<span class="text-accent">コミュニティ</span>を作れます。',
        card1Title: '私たちについて',
        card1Html:
            `<span class="special">MOD</span>と<span class="special">ゲーム開発</span>のコミュニティです。<a href="/assets" class="${A}">アセット</a>、<a href="/mods" class="${A}">MOD</a>、<a href="/servers" class="${A}">サーバー</a>、<a href="/communities" class="${A}">コミュニティ</a>、<a href="/collections" class="${A}">コレクション</a>はすでに公開中で、<a href="https://moddingcommunity.com/blog" class="${A}">ブログ</a>でも情報を発信しています。`,
        card2Title: '誰でも歓迎',
        card2Html:
            'シングルプレイのMOD、マルチプレイのサーバー、初めてのスクリプト。どれでも同じサイトと同じ<span class="special">ツール</span>を使えます。排他的な空気も、掲載のための課金もなく、質問しやすい場所です。',
        card3Title: 'オープンソース',
        card3Html:
            `GitHubの<a href="https://github.com/modcommunity" target="_blank" class="${A}">組織アカウント</a>に、プラットフォーム本体と周辺ツールを置いています。コードを読み、<span class="special">問題を報告</span>し、修正を送ることもできます。`,
        ghButton: 'GitHub 組織',
        sourceButton: 'ソース',
        title: 'モッディング＆ゲーム開発のコミュニティ',
        eyebrow: 'オープンソース · コミュニティ運営',
        ctaExplore: 'サイトを見る',
        ctaDiscord: 'Discord に参加',
        tagline: '私たち自身のゲーミングプラットフォームを作っています！',
        shelfLabel: 'サイト内',
        devWarningHtml:
            `サイトは<span class="special">開発の真っ最中</span>です。公開されたばかりの内容は<a href="/changelog" class="${A}">変更履歴</a>で、次の予定は<a href="/roadmap" class="${A}">ロードマップ</a>でご確認ください。`,
    },
    zh: {
        paraHtml:
            '一个做模组和游戏开发的地方。可以浏览<span class="text-accent">游戏资源</span>和<span class="text-accent">模组</span>，查看<span class="text-accent">游戏服务器</span>和<span class="text-accent">社交服务器</span>，也可以创建自己的<span class="text-accent">社区</span>。',
        card1Title: '我们是谁',
        card1Html:
            `我们是一个<span class="special">模组</span>与<span class="special">游戏开发</span>社区。<a href="/assets" class="${A}">资源</a>、<a href="/mods" class="${A}">模组</a>、<a href="/servers" class="${A}">服务器</a>、<a href="/communities" class="${A}">社区</a>和<a href="/collections" class="${A}">合集</a>均已上线，我们也在<a href="https://moddingcommunity.com/blog" class="${A}">博客</a>里写这些事。`,
        card2Title: '对所有人开放',
        card2Html:
            '单机模组、多人服务器或你的第一个脚本：大家用的是同一个网站和同样的<span class="special">工具</span>。没有门槛，不用付费才能被看到，有问题也有地方问。',
        card3Title: '开源',
        card3Html:
            `我们的 <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub 组织</a> 里有平台本身和周边工具。你可以读代码、<span class="special">报告问题</span>，也可以提交修复。`,
        ghButton: 'GitHub 组织',
        sourceButton: '源代码',
        title: '一个模组制作与游戏开发社区',
        eyebrow: '开源 · 由社区运营',
        ctaExplore: '浏览网站',
        ctaDiscord: '加入 Discord',
        tagline: '我们正在打造属于自己的游戏平台！',
        shelfLabel: '站内',
        devWarningHtml:
            `网站正在<span class="special">密集开发</span>中。刚发布的内容见<a href="/changelog" class="${A}">更新日志</a>，接下来的计划见<a href="/roadmap" class="${A}">路线图</a>。`,
    },
    pt: {
        paraHtml:
            'Um lugar para modding e desenvolvimento de jogos. Explore <span class="text-accent">recursos de jogos</span> e <span class="text-accent">mods</span>, veja <span class="text-accent">servidores de jogos</span> e <span class="text-accent">sociais</span> e crie as suas próprias <span class="text-accent">comunidades</span>.',
        card1Title: 'Quem Somos',
        card1Html:
            `Somos uma comunidade de <span class="special">modding</span> e <span class="special">desenvolvimento de jogos</span>. <a href="/assets" class="${A}">Recursos</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servidores</a>, <a href="/communities" class="${A}">comunidades</a> e <a href="/collections" class="${A}">coleções</a> já estão no ar, e escrevemos sobre isso no <a href="https://moddingcommunity.com/blog" class="${A}">blogue</a>.`,
        card2Title: 'Aberto A Todos',
        card2Html:
            'Um mod single-player, um servidor multijogador ou o seu primeiro script: tem o mesmo site e as mesmas <span class="special">ferramentas</span>. Sem elitismo, sem pagar para ser visto e com um lugar para fazer perguntas.',
        card3Title: 'Código Aberto',
        card3Html:
            `A nossa <a href="https://github.com/modcommunity" target="_blank" class="${A}">organização no GitHub</a> tem a plataforma e as ferramentas à volta dela. Leia o código, <span class="special">reporte problemas</span> ou envie uma correção.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Código-fonte',
        title: 'Uma Comunidade de Modding e Desenvolvimento de Jogos',
        eyebrow: 'Código aberto · Gerido pela comunidade',
        ctaExplore: 'Explorar O Site',
        ctaDiscord: 'Entrar No Discord',
        tagline: 'Estamos criando a nossa própria plataforma de jogos!',
        shelfLabel: 'No site',
        devWarningHtml:
            `O site está em <span class="special">pleno desenvolvimento</span>. Veja o que acabou de sair no <a href="/changelog" class="${A}">registo de alterações</a> e o que vem a seguir no <a href="/roadmap" class="${A}">roteiro</a>.`,
    },
}
