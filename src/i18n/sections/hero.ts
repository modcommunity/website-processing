import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-2 hover:duration-300'

export const hero: SectionCatalog = {
    en: {
        paraHtml:
            'A <span class="text-accent">welcoming</span> and <span class="text-accent">inclusive</span> home for modding and game development &mdash; browse <span class="text-accent">assets</span>, <span class="text-accent">mods</span> and <span class="text-accent">servers</span>, build communities, and curate collections, all in one platform.',
        card1Title: 'Who Are We?',
        card1Html: `We're a <span class="special">modding</span> and <span class="special">game development</span> community building one platform for the things that usually live in a dozen different places. <a href="/assets" class="${A}">Assets</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servers</a>, <a href="/communities" class="${A}">communities</a> and <a href="/collections" class="${A}">collections</a> are all live today, alongside our <a href="https://moddingcommunity.com/blog/" class="${A}">blog</a> and <a href="https://forum.moddingcommunity.com" class="${A}">forum</a>.`,
        card2Title: 'Built For Everyone',
        card2Html: `Whether you ship a <span class="special">singleplayer</span> mod, maintain a <span class="special">multiplayer</span> server or are writing your very first script, you get the same <span class="special">tools</span> and <span class="special">insights</span>. No gatekeeping, no pay-to-be-seen, and a <span class="special">welcoming</span> place to ask questions.`,
        card3Title: 'Open Source',
        card3Html: `We build in the open. Our <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub organization</a> hosts the platform itself along with the tooling behind it, so you can read the code, <span class="special">report issues</span> and <span class="special">contribute</span> to anything you rely on.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Source',
        titleAnim1: 'A Modding & Game Dev Community',
        devWarningHtml: `We are currently under <span class="special">heavy development</span>. Community updates are often posted on our <a href="https://forum.moddingcommunity.com" class="${A}">forum</a>!`,
    },
    es: {
        paraHtml:
            'Un hogar <span class="text-accent">acogedor</span> e <span class="text-accent">inclusivo</span> para el modding y el desarrollo de juegos &mdash; explora <span class="text-accent">recursos</span>, <span class="text-accent">mods</span> y <span class="text-accent">servidores</span>, crea comunidades y organiza colecciones, todo en una sola plataforma.',
        card1Title: '¿Quiénes Somos?',
        card1Html: `Somos una comunidad de <span class="special">modding</span> y <span class="special">desarrollo de juegos</span> que construye una sola plataforma para las cosas que suelen estar repartidas en una docena de sitios distintos. Los <a href="/assets" class="${A}">recursos</a>, los <a href="/mods" class="${A}">mods</a>, los <a href="/servers" class="${A}">servidores</a>, las <a href="/communities" class="${A}">comunidades</a> y las <a href="/collections" class="${A}">colecciones</a> ya están disponibles, junto a nuestro <a href="https://moddingcommunity.com/blog/" class="${A}">blog</a> y nuestro <a href="https://forum.moddingcommunity.com" class="${A}">foro</a>.`,
        card2Title: 'Hecho Para Todos',
        card2Html: `Ya sea que publiques un mod <span class="special">para un jugador</span>, mantengas un servidor <span class="special">multijugador</span> o estés escribiendo tu primer script, obtienes las mismas <span class="special">herramientas</span> y <span class="special">perspectivas</span>. Sin barreras, sin pagar para que te vean, y un lugar <span class="special">acogedor</span> para hacer preguntas.`,
        card3Title: 'Código Abierto',
        card3Html: `Construimos de forma abierta. Nuestra <a href="https://github.com/modcommunity" target="_blank" class="${A}">organización de GitHub</a> aloja la propia plataforma junto con las herramientas que la respaldan, para que puedas leer el código, <span class="special">reportar problemas</span> y <span class="special">contribuir</span> a todo aquello de lo que dependes.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Código fuente',
        titleAnim1: 'Una Comunidad de Modding y Desarrollo de Juegos',
        devWarningHtml: `Actualmente estamos en <span class="special">pleno desarrollo</span>. ¡Las novedades de la comunidad se publican a menudo en nuestro <a href="https://forum.moddingcommunity.com" class="${A}">foro</a>!`,
    },
    fr: {
        paraHtml:
            'Un foyer <span class="text-accent">accueillant</span> et <span class="text-accent">inclusif</span> pour le modding et le développement de jeux &mdash; parcourez des <span class="text-accent">ressources</span>, des <span class="text-accent">mods</span> et des <span class="text-accent">serveurs</span>, créez des communautés et composez des collections, le tout sur une seule plateforme.',
        card1Title: 'Qui Sommes-nous ?',
        card1Html: `Nous sommes une communauté de <span class="special">modding</span> et de <span class="special">développement de jeux</span> qui construit une seule plateforme pour les choses habituellement dispersées dans une dizaine d'endroits différents. Les <a href="/assets" class="${A}">ressources</a>, les <a href="/mods" class="${A}">mods</a>, les <a href="/servers" class="${A}">serveurs</a>, les <a href="/communities" class="${A}">communautés</a> et les <a href="/collections" class="${A}">collections</a> sont déjà en ligne, aux côtés de notre <a href="https://moddingcommunity.com/blog/" class="${A}">blog</a> et de notre <a href="https://forum.moddingcommunity.com" class="${A}">forum</a>.`,
        card2Title: 'Conçu Pour Tous',
        card2Html: `Que vous publiiez un mod <span class="special">solo</span>, gériez un serveur <span class="special">multijoueur</span> ou écriviez votre tout premier script, vous bénéficiez des mêmes <span class="special">outils</span> et des mêmes <span class="special">analyses</span>. Pas de favoritisme, pas de visibilité payante, et un lieu <span class="special">accueillant</span> pour poser vos questions.`,
        card3Title: 'Open Source',
        card3Html: `Nous construisons au grand jour. Notre <a href="https://github.com/modcommunity" target="_blank" class="${A}">organisation GitHub</a> héberge la plateforme elle-même ainsi que les outils qui la sous-tendent, pour que vous puissiez lire le code, <span class="special">signaler des problèmes</span> et <span class="special">contribuer</span> à tout ce dont vous dépendez.`,
        ghButton: 'Org GitHub',
        sourceButton: 'Source',
        titleAnim1: 'Une Communauté de Modding et de Développement de Jeux',
        devWarningHtml: `Nous sommes actuellement en <span class="special">plein développement</span>. Les actualités de la communauté sont souvent publiées sur notre <a href="https://forum.moddingcommunity.com" class="${A}">forum</a> !`,
    },
    de: {
        paraHtml:
            'Ein <span class="text-accent">einladendes</span> und <span class="text-accent">inklusives</span> Zuhause für Modding und Spieleentwicklung &mdash; durchstöbere <span class="text-accent">Ressourcen</span>, <span class="text-accent">Mods</span> und <span class="text-accent">Server</span>, baue Communitys auf und kuratiere Sammlungen, alles auf einer Plattform.',
        card1Title: 'Wer Sind Wir?',
        card1Html: `Wir sind eine <span class="special">Modding</span>- und <span class="special">Spieleentwicklungs</span>-Community, die eine einzige Plattform für die Dinge baut, die sonst an einem Dutzend verschiedener Orte liegen. <a href="/assets" class="${A}">Ressourcen</a>, <a href="/mods" class="${A}">Mods</a>, <a href="/servers" class="${A}">Server</a>, <a href="/communities" class="${A}">Communitys</a> und <a href="/collections" class="${A}">Sammlungen</a> sind bereits live &mdash; zusammen mit unserem <a href="https://moddingcommunity.com/blog/" class="${A}">Blog</a> und unserem <a href="https://forum.moddingcommunity.com" class="${A}">Forum</a>.`,
        card2Title: 'Für Alle Gemacht',
        card2Html: `Ob du einen <span class="special">Singleplayer</span>-Mod veröffentlichst, einen <span class="special">Multiplayer</span>-Server betreibst oder dein allererstes Skript schreibst &mdash; du bekommst die gleichen <span class="special">Werkzeuge</span> und <span class="special">Einblicke</span>. Kein Gatekeeping, kein Bezahlen für Sichtbarkeit und ein <span class="special">einladender</span> Ort, um Fragen zu stellen.`,
        card3Title: 'Open Source',
        card3Html: `Wir entwickeln offen. Unsere <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub-Organisation</a> beherbergt die Plattform selbst sowie die dahinterstehenden Werkzeuge, sodass du den Code lesen, <span class="special">Probleme melden</span> und zu allem <span class="special">beitragen</span> kannst, worauf du dich verlässt.`,
        ghButton: 'GitHub-Org',
        sourceButton: 'Quellcode',
        titleAnim1: 'Eine Modding- & Spieleentwicklungs-Community',
        devWarningHtml: `Wir befinden uns derzeit in <span class="special">intensiver Entwicklung</span>. Community-Neuigkeiten werden oft in unserem <a href="https://forum.moddingcommunity.com" class="${A}">Forum</a> gepostet!`,
    },
    ru: {
        paraHtml:
            '<span class="text-accent">Гостеприимный</span> и <span class="text-accent">открытый</span> дом для моддинга и разработки игр &mdash; просматривайте <span class="text-accent">ресурсы</span>, <span class="text-accent">моды</span> и <span class="text-accent">серверы</span>, создавайте сообщества и собирайте коллекции — всё на одной платформе.',
        card1Title: 'Кто Мы?',
        card1Html: `Мы — сообщество <span class="special">моддинга</span> и <span class="special">разработки игр</span>, создающее единую платформу для того, что обычно разбросано по десятку разных мест. <a href="/assets" class="${A}">Ресурсы</a>, <a href="/mods" class="${A}">моды</a>, <a href="/servers" class="${A}">серверы</a>, <a href="/communities" class="${A}">сообщества</a> и <a href="/collections" class="${A}">коллекции</a> уже доступны — вместе с нашими <a href="https://moddingcommunity.com/blog/" class="${A}">блогом</a> и <a href="https://forum.moddingcommunity.com" class="${A}">форумом</a>.`,
        card2Title: 'Создано Для Всех',
        card2Html: `Публикуете ли вы <span class="special">одиночный</span> мод, поддерживаете <span class="special">многопользовательский</span> сервер или пишете свой самый первый скрипт — вы получаете одни и те же <span class="special">инструменты</span> и <span class="special">аналитику</span>. Никакого гейткипинга, никакой платы за видимость и <span class="special">приветливое</span> место, где можно задать вопрос.`,
        card3Title: 'Открытый Исходный Код',
        card3Html: `Мы разрабатываем открыто. Наша <a href="https://github.com/modcommunity" target="_blank" class="${A}">организация на GitHub</a> содержит саму платформу вместе с инструментами за ней, так что вы можете читать код, <span class="special">сообщать о проблемах</span> и <span class="special">вносить вклад</span> во всё, на что полагаетесь.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Исходный код',
        titleAnim1: 'Сообщество Моддинга и Разработки Игр',
        devWarningHtml: `Сейчас мы находимся в стадии <span class="special">активной разработки</span>. Новости сообщества часто публикуются на нашем <a href="https://forum.moddingcommunity.com" class="${A}">форуме</a>!`,
    },
    nl: {
        paraHtml:
            'Een <span class="text-accent">gastvrij</span> en <span class="text-accent">inclusief</span> thuis voor modding en game-ontwikkeling &mdash; blader door <span class="text-accent">assets</span>, <span class="text-accent">mods</span> en <span class="text-accent">servers</span>, bouw communities op en stel collecties samen, allemaal op één platform.',
        card1Title: 'Wie Zijn Wij?',
        card1Html: `We zijn een <span class="special">modding</span>- en <span class="special">game-ontwikkelings</span>community die één platform bouwt voor de dingen die normaal op een dozijn verschillende plekken staan. <a href="/assets" class="${A}">Assets</a>, <a href="/mods" class="${A}">mods</a>, <a href="/servers" class="${A}">servers</a>, <a href="/communities" class="${A}">communities</a> en <a href="/collections" class="${A}">collecties</a> zijn er nu al, naast ons <a href="https://moddingcommunity.com/blog/" class="${A}">blog</a> en <a href="https://forum.moddingcommunity.com" class="${A}">forum</a>.`,
        card2Title: 'Gemaakt Voor Iedereen',
        card2Html: `Of je nu een <span class="special">singleplayer</span>-mod uitbrengt, een <span class="special">multiplayer</span>-server beheert of je allereerste script schrijft, je krijgt dezelfde <span class="special">tools</span> en <span class="special">inzichten</span>. Geen gatekeeping, geen betalen om gezien te worden, en een <span class="special">gastvrije</span> plek om vragen te stellen.`,
        card3Title: 'Open Source',
        card3Html: `We bouwen in de openbaarheid. Onze <a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub-organisatie</a> host het platform zelf samen met de tooling erachter, zodat je de code kunt lezen, <span class="special">problemen kunt melden</span> en kunt <span class="special">bijdragen</span> aan alles waarop je vertrouwt.`,
        ghButton: 'GitHub-org',
        sourceButton: 'Broncode',
        titleAnim1: 'Een Modding- & Game Dev-community',
        devWarningHtml: `We zijn momenteel volop in <span class="special">ontwikkeling</span>. Community-updates worden vaak geplaatst op ons <a href="https://forum.moddingcommunity.com" class="${A}">forum</a>!`,
    },
    ja: {
        paraHtml:
            'モッディングとゲーム開発のための<span class="text-accent">居心地のよい</span>、<span class="text-accent">包括的な</span>ホーム &mdash; <span class="text-accent">アセット</span>、<span class="text-accent">Mod</span>、<span class="text-accent">サーバー</span>を閲覧し、コミュニティを築き、コレクションを整理する、そのすべてを一つのプラットフォームで。',
        card1Title: '私たちについて',
        card1Html: `私たちは<span class="special">モッディング</span>と<span class="special">ゲーム開発</span>のコミュニティで、普段は十数か所に散らばっているものを一つのプラットフォームにまとめています。<a href="/assets" class="${A}">アセット</a>、<a href="/mods" class="${A}">Mod</a>、<a href="/servers" class="${A}">サーバー</a>、<a href="/communities" class="${A}">コミュニティ</a>、<a href="/collections" class="${A}">コレクション</a>はすべて公開済みで、<a href="https://moddingcommunity.com/blog/" class="${A}">ブログ</a>と<a href="https://forum.moddingcommunity.com" class="${A}">フォーラム</a>もあります。`,
        card2Title: 'みんなのために',
        card2Html: `<span class="special">シングルプレイ</span>の Mod を公開する人も、<span class="special">マルチプレイ</span>のサーバーを運営する人も、初めてのスクリプトを書く人も、同じ<span class="special">ツール</span>と<span class="special">インサイト</span>が手に入ります。門番も、見てもらうための課金もなく、質問しやすい<span class="special">居心地のよい</span>場所です。`,
        card3Title: 'オープンソース',
        card3Html: `私たちはオープンに開発しています。<a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub 組織</a>にはプラットフォーム本体とそれを支えるツールがあり、コードを読み、<span class="special">問題を報告し</span>、頼りにしているものすべてに<span class="special">貢献</span>できます。`,
        ghButton: 'GitHub 組織',
        sourceButton: 'ソース',
        titleAnim1: 'モッディング＆ゲーム開発のコミュニティ',
        devWarningHtml: `現在、<span class="special">鋭意開発中</span>です。コミュニティの最新情報は<a href="https://forum.moddingcommunity.com" class="${A}">フォーラム</a>によく投稿されます！`,
    },
    zh: {
        paraHtml:
            '一个<span class="text-accent">友好</span>且<span class="text-accent">包容</span>的模组制作与游戏开发之家 &mdash; 浏览<span class="text-accent">资源</span>、<span class="text-accent">模组</span>和<span class="text-accent">服务器</span>，建立社区并整理合集，全部集于一个平台。',
        card1Title: '我们是谁？',
        card1Html: `我们是一个<span class="special">模组制作</span>与<span class="special">游戏开发</span>社区，正在把通常分散在十几个地方的东西整合到一个平台上。<a href="/assets" class="${A}">资源</a>、<a href="/mods" class="${A}">模组</a>、<a href="/servers" class="${A}">服务器</a>、<a href="/communities" class="${A}">社区</a>和<a href="/collections" class="${A}">合集</a>现已全部上线，还有我们的<a href="https://moddingcommunity.com/blog/" class="${A}">博客</a>和<a href="https://forum.moddingcommunity.com" class="${A}">论坛</a>。`,
        card2Title: '为每个人打造',
        card2Html: `无论你是发布<span class="special">单人</span>模组、维护<span class="special">多人</span>服务器，还是在编写你的第一个脚本，你都能获得相同的<span class="special">工具</span>和<span class="special">洞察</span>。没有门槛，没有付费曝光，还有一个<span class="special">友好</span>的提问之地。`,
        card3Title: '开源',
        card3Html: `我们公开地进行开发。我们的<a href="https://github.com/modcommunity" target="_blank" class="${A}">GitHub 组织</a>托管着平台本身以及背后的工具，因此你可以阅读代码、<span class="special">报告问题</span>，并为你所依赖的一切做出<span class="special">贡献</span>。`,
        ghButton: 'GitHub 组织',
        sourceButton: '源代码',
        titleAnim1: '一个模组制作与游戏开发社区',
        devWarningHtml: `我们目前正在<span class="special">紧张开发中</span>。社区更新经常发布在我们的<a href="https://forum.moddingcommunity.com" class="${A}">论坛</a>上！`,
    },
    pt: {
        paraHtml:
            'Um lar <span class="text-accent">acolhedor</span> e <span class="text-accent">inclusivo</span> para o modding e o desenvolvimento de jogos &mdash; explore <span class="text-accent">recursos</span>, <span class="text-accent">mods</span> e <span class="text-accent">servidores</span>, crie comunidades e organize coleções, tudo em uma única plataforma.',
        card1Title: 'Quem Somos?',
        card1Html: `Somos uma comunidade de <span class="special">modding</span> e <span class="special">desenvolvimento de jogos</span> construindo uma única plataforma para as coisas que normalmente vivem em uma dúzia de lugares diferentes. Os <a href="/assets" class="${A}">recursos</a>, os <a href="/mods" class="${A}">mods</a>, os <a href="/servers" class="${A}">servidores</a>, as <a href="/communities" class="${A}">comunidades</a> e as <a href="/collections" class="${A}">coleções</a> já estão no ar, ao lado do nosso <a href="https://moddingcommunity.com/blog/" class="${A}">blog</a> e do nosso <a href="https://forum.moddingcommunity.com" class="${A}">fórum</a>.`,
        card2Title: 'Feito Para Todos',
        card2Html: `Seja publicando um mod <span class="special">para um jogador</span>, mantendo um servidor <span class="special">multijogador</span> ou escrevendo seu primeiro script, você recebe as mesmas <span class="special">ferramentas</span> e <span class="special">informações</span>. Sem barreiras, sem pagar para ser visto, e um lugar <span class="special">acolhedor</span> para fazer perguntas.`,
        card3Title: 'Código Aberto',
        card3Html: `Construímos de forma aberta. Nossa <a href="https://github.com/modcommunity" target="_blank" class="${A}">organização no GitHub</a> hospeda a própria plataforma junto com as ferramentas por trás dela, para que você possa ler o código, <span class="special">relatar problemas</span> e <span class="special">contribuir</span> com tudo aquilo de que depende.`,
        ghButton: 'GitHub Org',
        sourceButton: 'Código-fonte',
        titleAnim1: 'Uma Comunidade de Modding e Desenvolvimento de Jogos',
        devWarningHtml: `Estamos atualmente em <span class="special">intenso desenvolvimento</span>. As novidades da comunidade costumam ser publicadas em nosso <a href="https://forum.moddingcommunity.com" class="${A}">fórum</a>!`,
    },
}
