import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-1-light hover:duration-300'

export const mods: SectionCatalog = {
    en: {
        eyebrow: 'Mods',
        titleHtml: 'Publish And Version Your <span class="special">Mods</span>',
        introHtml:
            'Upload a mod, write its page and post each build as a release. Cut releases by hand or from your own <span class="special">CI/CD</span> pipeline.',
        c1t: 'Browse & Search',
        c1b:
            '<span class="special">Browse</span> and <span class="special">search</span> community mods, game by game.',
        c2t: 'Uploads & Downloads',
        c2b:
            `<span class="special">Upload</span> your own mods and <span class="special">download</span> other people's. Unique downloads are counted.`,
        c3t: 'Versioned Releases',
        c3b:
            'Each build is a <span class="special">versioned release</span> with a changelog and its mod files. Post it by hand, or from <span class="special">CI/CD</span> through the developer API.',
        c4t: 'Screenshots & Videos',
        c4b:
            'Add <span class="special">images and videos</span> so players can see the mod before they install it.',
        c5t: 'Licenses & Install Guides',
        c5b:
            'Pick a <span class="special">license</span> and write <span class="special">install instructions</span> on the mod page.',
        c6t: 'Dependencies',
        c6b: 'List the mods and assets yours needs as <span class="special">dependencies</span>.',
        highlightTitle: 'Mod Manager',
        highlightBadge: 'Available Now',
        highlightHtml:
            `The official, <span class="special">open-source</span> TMC app is out, with a mod launcher: install mods in one click, then manage and update them from the same place. It is still in heavy development, so expect rough edges.`,
        highlightCta: 'Get the app',
        button: 'Explore Mods',
    },
    es: {
        eyebrow: 'Mods',
        titleHtml: 'Publica Y Versiona Tus <span class="special">Mods</span>',
        introHtml:
            'Sube un mod, escribe su página y publica cada compilación como una versión. Puedes hacerlo a mano o desde tu propio pipeline de <span class="special">CI/CD</span>.',
        c1t: 'Explorar y Buscar',
        c1b:
            '<span class="special">Explora</span> y <span class="special">busca</span> mods de la comunidad, juego por juego.',
        c2t: 'Subidas Y Descargas',
        c2b:
            '<span class="special">Sube</span> tus propios mods y <span class="special">descarga</span> los de otros. Se cuentan las descargas únicas.',
        c3t: 'Lanzamientos Versionados',
        c3b:
            'Cada compilación es una <span class="special">versión</span> con su registro de cambios y sus archivos. Publícala a mano o desde <span class="special">CI/CD</span> con la API para desarrolladores.',
        c4t: 'Capturas y Vídeos',
        c4b:
            'Añade <span class="special">imágenes y vídeos</span> para que los jugadores vean el mod antes de instalarlo.',
        c5t: 'Licencias y Guías de Instalación',
        c5b:
            'Elige una <span class="special">licencia</span> y escribe las <span class="special">instrucciones de instalación</span> en la página del mod.',
        c6t: 'Dependencias',
        c6b:
            'Indica los mods y recursos que necesita el tuyo como <span class="special">dependencias</span>.',
        highlightTitle: 'Gestor de Mods',
        highlightBadge: 'Disponible Ya',
        highlightHtml:
            `La aplicación oficial de <span class="special">código abierto</span> de TMC ya está disponible, con un lanzador de mods: instala mods con un clic y gestiónalos y actualízalos desde el mismo sitio. Sigue en pleno desarrollo, así que habrá asperezas.`,
        highlightCta: 'Obtener la app',
        button: 'Explorar Mods',
    },
    fr: {
        eyebrow: 'Mods',
        titleHtml: 'Publiez Et Versionnez Vos <span class="special">Mods</span>',
        introHtml:
            'Envoyez un mod, rédigez sa page et publiez chaque build comme une version. À la main ou depuis votre propre pipeline <span class="special">CI/CD</span>.',
        c1t: 'Parcourir et Rechercher',
        c1b:
            '<span class="special">Parcourez</span> et <span class="special">recherchez</span> les mods de la communauté, jeu par jeu.',
        c2t: 'Envois Et Téléchargements',
        c2b:
            '<span class="special">Envoyez</span> vos propres mods et <span class="special">téléchargez</span> ceux des autres. Les téléchargements uniques sont comptés.',
        c3t: 'Versions Publiées',
        c3b:
            `Chaque build est une <span class="special">version</span> avec son journal des modifications et ses fichiers. Publiez-la à la main ou depuis <span class="special">CI/CD</span> via l'API développeur.`,
        c4t: 'Captures et Vidéos',
        c4b:
            `Ajoutez des <span class="special">images et des vidéos</span> pour que les joueurs voient le mod avant de l'installer.`,
        c5t: 'Licences et Guides d\'Installation',
        c5b:
            `Choisissez une <span class="special">licence</span> et rédigez les <span class="special">instructions d'installation</span> sur la page du mod.`,
        c6t: 'Dépendances',
        c6b:
            'Indiquez les mods et ressources dont le vôtre a besoin comme <span class="special">dépendances</span>.',
        highlightTitle: 'Gestionnaire de Mods',
        highlightBadge: 'Disponible Maintenant',
        highlightHtml:
            `L'application officielle <span class="special">open source</span> de TMC est disponible, avec un lanceur de mods : installez des mods en un clic, puis gérez-les et mettez-les à jour au même endroit. Elle est encore en plein développement, attendez-vous à des défauts.`,
        highlightCta: "Obtenir l'application",
        button: 'Découvrir les Mods',
    },
    de: {
        eyebrow: 'Mods',
        titleHtml: 'Veröffentliche Und Versioniere Deine <span class="special">Mods</span>',
        introHtml:
            'Lade einen Mod hoch, schreib seine Seite und veröffentliche jeden Build als Release. Releases entstehen von Hand oder in deiner eigenen <span class="special">CI/CD</span>-Pipeline.',
        c1t: 'Durchsuchen & Suchen',
        c1b: '<span class="special">Durchsuche</span> die Mods der Community, Spiel für Spiel.',
        c2t: 'Uploads & Downloads',
        c2b:
            '<span class="special">Lade</span> eigene Mods <span class="special">hoch</span> und fremde <span class="special">herunter</span>. Einzigartige Downloads werden gezählt.',
        c3t: 'Versionierte Releases',
        c3b:
            'Jeder Build ist ein <span class="special">versioniertes Release</span> mit Changelog und seinen Mod-Dateien. Per Hand oder aus <span class="special">CI/CD</span> über die Entwickler-API.',
        c4t: 'Screenshots & Videos',
        c4b:
            'Füge <span class="special">Bilder und Videos</span> hinzu, damit Spieler den Mod vor der Installation sehen.',
        c5t: 'Lizenzen & Installationsanleitungen',
        c5b:
            'Wähle eine <span class="special">Lizenz</span> und schreibe eine <span class="special">Installationsanleitung</span> auf die Mod-Seite.',
        c6t: 'Abhängigkeiten',
        c6b:
            'Trage die Mods und Assets, die dein Mod braucht, als <span class="special">Abhängigkeiten</span> ein.',
        highlightTitle: 'Mod-Manager',
        highlightBadge: 'Jetzt Verfügbar',
        highlightHtml:
            `Die offizielle, <span class="special">quelloffene</span> TMC-App ist da, mit Mod-Launcher: Mods mit einem Klick installieren und am selben Ort verwalten und aktualisieren. Sie befindet sich noch in intensiver Entwicklung, rechne also mit Ecken und Kanten.`,
        highlightCta: 'App holen',
        button: 'Mods Entdecken',
    },
    ru: {
        eyebrow: 'Моды',
        titleHtml: 'Публикуйте И Версионируйте Свои <span class="special">Моды</span>',
        introHtml:
            'Загрузите мод, напишите его страницу и выпускайте каждую сборку как релиз. Вручную или из собственного <span class="special">CI/CD</span>-пайплайна.',
        c1t: 'Просмотр и Поиск',
        c1b:
            '<span class="special">Просматривайте</span> и <span class="special">ищите</span> моды сообщества по играм.',
        c2t: 'Загрузка И Скачивание',
        c2b:
            '<span class="special">Загружайте</span> свои моды и <span class="special">скачивайте</span> чужие. Уникальные скачивания считаются.',
        c3t: 'Версионированные Релизы',
        c3b:
            'Каждая сборка это <span class="special">версионный релиз</span> с журналом изменений и файлами мода. Публикуйте вручную или из <span class="special">CI/CD</span> через API для разработчиков.',
        c4t: 'Скриншоты и Видео',
        c4b:
            'Добавьте <span class="special">изображения и видео</span>, чтобы игроки увидели мод до установки.',
        c5t: 'Лицензии и Инструкции по Установке',
        c5b:
            'Выберите <span class="special">лицензию</span> и напишите <span class="special">инструкцию по установке</span> на странице мода.',
        c6t: 'Зависимости',
        c6b:
            'Укажите моды и ассеты, которые нужны вашему моду, как <span class="special">зависимости</span>.',
        highlightTitle: 'Менеджер Модов',
        highlightBadge: 'Уже Доступно',
        highlightHtml:
            `Официальное <span class="special">приложение TMC с открытым кодом</span> уже вышло, с лаунчером модов: устанавливайте моды в один клик, затем управляйте и обновляйте их в одном месте. Оно всё ещё в активной разработке, так что возможны шероховатости.`,
        highlightCta: 'Скачать приложение',
        button: 'Смотреть Моды',
    },
    nl: {
        eyebrow: 'Mods',
        titleHtml: 'Publiceer En Versioneer Je <span class="special">Mods</span>',
        introHtml:
            'Upload een mod, schrijf de pagina en publiceer elke build als release. Met de hand of vanuit je eigen <span class="special">CI/CD</span>-pipeline.',
        c1t: 'Bladeren & Zoeken',
        c1b:
            '<span class="special">Blader</span> door mods van de community en <span class="special">zoek</span> per game.',
        c2t: 'Uploads & Downloads',
        c2b:
            '<span class="special">Upload</span> je eigen mods en <span class="special">download</span> die van anderen. Unieke downloads worden geteld.',
        c3t: 'Geversioneerde Releases',
        c3b:
            'Elke build is een <span class="special">release met versie</span>, changelog en modbestanden. Plaats hem met de hand of vanuit <span class="special">CI/CD</span> via de ontwikkelaars-API.',
        c4t: 'Schermafbeeldingen & Video\'s',
        c4b:
            `Voeg <span class="special">afbeeldingen en video's</span> toe zodat spelers de mod zien voordat ze hem installeren.`,
        c5t: 'Licenties & Installatiegidsen',
        c5b:
            'Kies een <span class="special">licentie</span> en schrijf <span class="special">installatie-instructies</span> op de modpagina.',
        c6t: 'Afhankelijkheden',
        c6b:
            'Geef de mods en assets die jouw mod nodig heeft op als <span class="special">afhankelijkheden</span>.',
        highlightTitle: 'Mod-Beheerder',
        highlightBadge: 'Nu Beschikbaar',
        highlightHtml:
            `De officiële, <span class="special">open-source</span> TMC-app is uit, met een modlauncher: installeer mods met één klik en beheer en update ze op dezelfde plek. Hij is nog volop in ontwikkeling, dus verwacht ruwe kanten.`,
        highlightCta: 'App ophalen',
        button: 'Mods Verkennen',
    },
    ja: {
        eyebrow: 'Mod',
        titleHtml: '<span class="special">MOD</span>を公開してバージョン管理',
        introHtml:
            'MODをアップロードし、ページを書き、ビルドごとにリリースとして公開できます。リリースは手動でも、自分の<span class="special">CI/CD</span>パイプラインからでも作れます。',
        c1t: '閲覧と検索',
        c1b: 'コミュニティのMODをゲームごとに<span class="special">閲覧</span>・<span class="special">検索</span>できます。',
        c2t: 'アップロードとダウンロード',
        c2b:
            '自作MODを<span class="special">アップロード</span>し、他の人のMODを<span class="special">ダウンロード</span>できます。ユニークなダウンロード数が集計されます。',
        c3t: 'バージョン付きリリース',
        c3b:
            'ビルドごとに、変更履歴とMODファイルを付けた<span class="special">バージョン付きリリース</span>を作成。手動でも、開発者API経由で<span class="special">CI/CD</span>からでも投稿できます。',
        c4t: 'スクリーンショットと動画',
        c4b: '<span class="special">画像や動画</span>を追加すれば、インストール前にMODの中身を確認してもらえます。',
        c5t: 'ライセンスとインストールガイド',
        c5b: '<span class="special">ライセンス</span>を選び、MODのページに<span class="special">導入手順</span>を書けます。',
        c6t: '依存関係',
        c6b: '必要なMODやアセットを<span class="special">依存関係</span>として登録できます。',
        highlightTitle: 'Modマネージャー',
        highlightBadge: '提供中',
        highlightHtml:
            `公式の<span class="special">オープンソース</span>TMCアプリを公開しました。MODランチャーを備え、ワンクリックでMODを導入し、同じ場所で管理・更新できます。現在も活発に開発中のため、不具合があることをご了承ください。`,
        highlightCta: 'アプリを入手',
        button: 'Modを見る',
    },
    zh: {
        eyebrow: '模组',
        titleHtml: '发布并管理你的<span class="special">模组</span>版本',
        introHtml:
            '上传模组、写好页面，每个构建都可以作为一个发布版本。可以手动发布，也可以从你自己的 <span class="special">CI/CD</span> 流水线发布。',
        c1t: '浏览与搜索',
        c1b: '按游戏<span class="special">浏览</span>和<span class="special">搜索</span>社区模组。',
        c2t: '上传与下载',
        c2b: '<span class="special">上传</span>自己的模组，<span class="special">下载</span>别人的模组。独立下载量会被统计。',
        c3t: '版本化发布',
        c3b:
            '每个构建都是一个带更新日志和模组文件的<span class="special">版本发布</span>。可以手动发布，也可以通过开发者 API 从 <span class="special">CI/CD</span> 发布。',
        c4t: '截图与视频',
        c4b: '添加<span class="special">图片和视频</span>，让玩家安装前就能看到模组的样子。',
        c5t: '许可证与安装指南',
        c5b: '选择<span class="special">许可证</span>，并在模组页面写上<span class="special">安装说明</span>。',
        c6t: '依赖项',
        c6b: '把你的模组需要的其他模组和资源列为<span class="special">依赖项</span>。',
        highlightTitle: '模组管理器',
        highlightBadge: '现已推出',
        highlightHtml:
            `官方<span class="special">开源</span> TMC 应用现已发布，带模组启动器：一键安装模组，并在同一处管理和更新。它仍在大力开发中，可能存在不完善之处。`,
        highlightCta: '获取应用',
        button: '探索模组',
    },
    pt: {
        eyebrow: 'Mods',
        titleHtml: 'Publique E Versione Os Seus <span class="special">Mods</span>',
        introHtml:
            'Envie um mod, escreva a página e publique cada build como uma versão. À mão ou a partir do seu próprio pipeline de <span class="special">CI/CD</span>.',
        c1t: 'Navegar e Pesquisar',
        c1b:
            '<span class="special">Explore</span> e <span class="special">pesquise</span> mods da comunidade, jogo a jogo.',
        c2t: 'Envios E Transferências',
        c2b:
            '<span class="special">Envie</span> os seus mods e <span class="special">transfira</span> os de outros. As transferências únicas são contadas.',
        c3t: 'Lançamentos Versionados',
        c3b:
            'Cada build é uma <span class="special">versão</span> com registo de alterações e os ficheiros do mod. Publique-a à mão ou a partir de <span class="special">CI/CD</span> pela API de programadores.',
        c4t: 'Capturas de Tela e Vídeos',
        c4b:
            'Adicione <span class="special">imagens e vídeos</span> para os jogadores verem o mod antes de o instalarem.',
        c5t: 'Licenças e Guias de Instalação',
        c5b:
            'Escolha uma <span class="special">licença</span> e escreva as <span class="special">instruções de instalação</span> na página do mod.',
        c6t: 'Dependências',
        c6b:
            'Indique os mods e recursos de que o seu precisa como <span class="special">dependências</span>.',
        highlightTitle: 'Gerenciador de Mods',
        highlightBadge: 'Disponível Agora',
        highlightHtml:
            `O app oficial de <span class="special">código aberto</span> do TMC já está disponível, com um launcher de mods: instale mods com um clique e gira e atualize-os no mesmo sítio. Ainda está em desenvolvimento intenso, por isso espere arestas.`,
        highlightCta: 'Obter o app',
        button: 'Explorar Mods',
    },
}
