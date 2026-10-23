import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-1-light hover:duration-300'

export const assets: SectionCatalog = {
    en: {
        eyebrow: 'Assets',
        titleHtml:
            'Share Game <span class="special">Assets</span> &amp; <span class="special">Tools</span>',
        introHtml:
            'Upload models, scripts, textures, plugins and libraries. Each asset gets its own page with media, categories, dependencies and <span class="special">versioned downloads</span>.',
        c1t: 'Versioned Releases',
        c1b:
            'Post <span class="special">versioned releases</span> with a changelog, and attach files of <span class="special">1 GB</span> or more, so people grab the right build.',
        c2t: 'Media Galleries',
        c2b:
            'Add <span class="special">image &amp; video</span> galleries, plus a custom icon, banner and card art.',
        c3t: 'Ratings & Reviews',
        c3b:
            'Get <span class="special">ratings</span>, <span class="special">reviews</span> and comments, so people can see what an asset is like before they download it.',
        c4t: 'File Formats',
        c4b:
            'Upload models, textures, maps, audio, scripts, binaries or archives, in whatever format your <span class="special">game</span> or <span class="special">engine</span> expects.',
        c5t: 'Dependencies',
        c5b:
            'Declare <span class="special">dependencies</span> between assets, so users get what an asset needs along with it.',
        c6t: 'Open-Source Badge',
        c6b:
            'Link a <span class="special">source repository</span> and the asset page gets an <span class="special">open-source badge</span>.',
        highlightTitle: 'Free &amp; Open-Source Assets',
        highlightBadge: 'Available Now',
        highlightHtml:
            `We publish <span class="text-accent">free, open-source assets</span> of our own, and more are on the way for engines like <a href="https://godotengine.org" class="${A}">Godot</a>: gameplay features, multiplayer networking, modding support and more. We also want to build an open source <a href="#gaming-platform" class="${A}">gaming platform</a>.`,
        button: 'Browse Assets',
    },
    es: {
        eyebrow: 'Recursos',
        titleHtml:
            'Comparte <span class="special">Recursos</span> &amp; <span class="special">Herramientas</span> de Juegos',
        introHtml:
            'Sube modelos, scripts, texturas, plugins y bibliotecas. Cada recurso tiene su propia página con medios, categorías, dependencias y <span class="special">descargas versionadas</span>.',
        c1t: 'Versiones Publicadas',
        c1b:
            'Publica <span class="special">versiones</span> con registro de cambios y adjunta archivos de <span class="special">1 GB</span> o más, para que cada persona descargue la compilación correcta.',
        c2t: 'Galerías Multimedia',
        c2b:
            'Añade galerías de <span class="special">imágenes y vídeos</span>, además de icono, banner e imagen de tarjeta propios.',
        c3t: 'Valoraciones y Reseñas',
        c3b:
            'Recibe <span class="special">valoraciones</span>, <span class="special">reseñas</span> y comentarios, para que se vea cómo es un recurso antes de descargarlo.',
        c4t: 'Formatos De Archivo',
        c4b:
            'Sube modelos, texturas, mapas, audio, scripts, binarios o archivos comprimidos, en el formato que espere tu <span class="special">juego</span> o <span class="special">motor</span>.',
        c5t: 'Dependencias',
        c5b:
            'Declara <span class="special">dependencias</span> entre recursos para que se descargue junto con lo que necesita.',
        c6t: 'Insignia de Código Abierto',
        c6b:
            'Enlaza un <span class="special">repositorio de código</span> y la página del recurso recibirá una <span class="special">insignia de código abierto</span>.',
        highlightTitle: 'Recursos Gratuitos y de Código Abierto',
        highlightBadge: 'Disponible Ya',
        highlightHtml:
            `Publicamos nuestros propios <span class="text-accent">recursos gratuitos de código abierto</span> y vienen más para motores como <a href="https://godotengine.org" class="${A}">Godot</a>: funciones de juego, red multijugador, soporte de modding y más. También queremos crear una <a href="#gaming-platform" class="${A}">plataforma de juegos</a> de código abierto.`,
        button: 'Explorar Recursos',
    },
    fr: {
        eyebrow: 'Ressources',
        titleHtml:
            'Partagez des <span class="special">Ressources</span> &amp; <span class="special">Outils</span> de Jeu',
        introHtml:
            'Envoyez modèles, scripts, textures, plugins et bibliothèques. Chaque ressource a sa propre page avec médias, catégories, dépendances et <span class="special">téléchargements versionnés</span>.',
        c1t: 'Versions Publiées',
        c1b:
            'Publiez des <span class="special">versions</span> avec journal des modifications et joignez des fichiers de <span class="special">1 Go</span> ou plus, pour que chacun récupère le bon build.',
        c2t: 'Galeries Multimédias',
        c2b:
            `Ajoutez des galeries d'<span class="special">images et de vidéos</span>, ainsi qu'une icône, une bannière et une image de carte personnalisées.`,
        c3t: 'Notes et Avis',
        c3b:
            'Recevez des <span class="special">notes</span>, des <span class="special">avis</span> et des commentaires, pour que chacun voie ce que vaut une ressource avant de la télécharger.',
        c4t: 'Formats De Fichier',
        c4b:
            `Envoyez modèles, textures, cartes, audio, scripts, binaires ou archives, dans le format qu'attend votre <span class="special">jeu</span> ou votre <span class="special">moteur</span>.`,
        c5t: 'Dépendances',
        c5b:
            `Déclarez des <span class="special">dépendances</span> entre ressources pour que l'on récupère avec elle ce dont elle a besoin.`,
        c6t: 'Badge Open-Source',
        c6b:
            'Liez un <span class="special">dépôt de code source</span> et la page de la ressource reçoit un <span class="special">badge open source</span>.',
        highlightTitle: 'Ressources Gratuites et Open-Source',
        highlightBadge: 'Disponible Maintenant',
        highlightHtml:
            `Nous publions nos propres <span class="text-accent">ressources gratuites et open source</span>, et d'autres arrivent pour des moteurs comme <a href="https://godotengine.org" class="${A}">Godot</a> : fonctions de gameplay, réseau multijoueur, prise en charge du modding et plus. Nous voulons aussi créer une <a href="#gaming-platform" class="${A}">plateforme de jeu</a> open source.`,
        button: 'Parcourir les Ressources',
    },
    de: {
        eyebrow: 'Assets',
        titleHtml:
            'Teile Spiel-<span class="special">Assets</span> &amp; <span class="special">Tools</span>',
        introHtml:
            'Lade Modelle, Skripte, Texturen, Plugins und Bibliotheken hoch. Jedes Asset bekommt eine eigene Seite mit Medien, Kategorien, Abhängigkeiten und <span class="special">versionierten Downloads</span>.',
        c1t: 'Versionierte Releases',
        c1b:
            'Veröffentliche <span class="special">versionierte Releases</span> mit Changelog und hänge Dateien von <span class="special">1 GB</span> oder mehr an, damit alle den richtigen Build bekommen.',
        c2t: 'Mediengalerien',
        c2b:
            'Füge Galerien mit <span class="special">Bildern &amp; Videos</span> hinzu, dazu eigenes Icon, Banner und Kartenbild.',
        c3t: 'Bewertungen & Rezensionen',
        c3b:
            'Sammle <span class="special">Bewertungen</span>, <span class="special">Rezensionen</span> und Kommentare, damit andere vor dem Download sehen, wie ein Asset ist.',
        c4t: 'Dateiformate',
        c4b:
            'Lade Modelle, Texturen, Maps, Audio, Skripte, Binärdateien oder Archive hoch, in dem Format, das dein <span class="special">Spiel</span> oder deine <span class="special">Engine</span> erwartet.',
        c5t: 'Abhängigkeiten',
        c5b:
            'Gib <span class="special">Abhängigkeiten</span> zwischen Assets an, damit Nutzer gleich alles bekommen, was ein Asset braucht.',
        c6t: 'Open-Source-Abzeichen',
        c6b:
            'Verknüpfe ein <span class="special">Quell-Repository</span>, und die Asset-Seite erhält ein <span class="special">Open-Source-Abzeichen</span>.',
        highlightTitle: 'Kostenlose &amp; Open-Source-Assets',
        highlightBadge: 'Jetzt Verfügbar',
        highlightHtml:
            `Wir veröffentlichen eigene <span class="text-accent">kostenlose Open-Source-Assets</span>, und für Engines wie <a href="https://godotengine.org" class="${A}">Godot</a> kommen weitere: Gameplay-Funktionen, Multiplayer-Netzwerk, Modding-Unterstützung und mehr. Außerdem wollen wir eine quelloffene <a href="#gaming-platform" class="${A}">Gaming-Plattform</a> bauen.`,
        button: 'Assets Durchsuchen',
    },
    ru: {
        eyebrow: 'Ресурсы',
        titleHtml:
            'Делитесь Игровыми <span class="special">Ресурсами</span> и <span class="special">Инструментами</span>',
        introHtml:
            'Загружайте модели, скрипты, текстуры, плагины и библиотеки. У каждого ассета своя страница с медиа, категориями, зависимостями и <span class="special">версионными загрузками</span>.',
        c1t: 'Версионированные Релизы',
        c1b:
            'Публикуйте <span class="special">версионные релизы</span> с журналом изменений и прикрепляйте файлы от <span class="special">1 ГБ</span>, чтобы все получали нужную сборку.',
        c2t: 'Медиа-галереи',
        c2b:
            'Добавьте галереи <span class="special">изображений и видео</span>, а также свои значок, баннер и картинку карточки.',
        c3t: 'Оценки и Отзывы',
        c3b:
            'Получайте <span class="special">оценки</span>, <span class="special">отзывы</span> и комментарии, чтобы перед загрузкой было видно, каков ассет на деле.',
        c4t: 'Форматы Файлов',
        c4b:
            'Загружайте модели, текстуры, карты, звук, скрипты, бинарные файлы и архивы в том формате, который ждёт ваша <span class="special">игра</span> или <span class="special">движок</span>.',
        c5t: 'Зависимости',
        c5b:
            'Указывайте <span class="special">зависимости</span> между ассетами, чтобы вместе с ассетом получать всё, что ему нужно.',
        c6t: 'Значок Открытого Кода',
        c6b:
            'Привяжите <span class="special">репозиторий с исходным кодом</span>, и на странице ассета появится <span class="special">значок открытого кода</span>.',
        highlightTitle: 'Бесплатные Ресурсы с Открытым Кодом',
        highlightBadge: 'Уже Доступно',
        highlightHtml:
            `Мы публикуем собственные <span class="text-accent">бесплатные ассеты с открытым кодом</span>, и скоро появятся новые для движков вроде <a href="https://godotengine.org" class="${A}">Godot</a>: игровые механики, сетевая игра, поддержка модов и другое. Ещё мы хотим сделать <a href="#gaming-platform" class="${A}">игровую платформу</a> с открытым кодом.`,
        button: 'Смотреть Ресурсы',
    },
    nl: {
        eyebrow: 'Assets',
        titleHtml:
            'Deel Game-<span class="special">Assets</span> &amp; <span class="special">Tools</span>',
        introHtml:
            'Upload modellen, scripts, texturen, plugins en bibliotheken. Elke asset krijgt een eigen pagina met media, categorieën, afhankelijkheden en <span class="special">downloads per versie</span>.',
        c1t: 'Geversioneerde Releases',
        c1b:
            'Plaats <span class="special">releases met versie</span> en changelog en voeg bestanden van <span class="special">1 GB</span> of meer toe, zodat iedereen de juiste build pakt.',
        c2t: 'Mediagalerijen',
        c2b:
            `Voeg galerijen met <span class="special">afbeeldingen &amp; video's</span> toe, plus een eigen icoon, banner en kaartafbeelding.`,
        c3t: 'Beoordelingen & Reviews',
        c3b:
            'Verzamel <span class="special">beoordelingen</span>, <span class="special">reviews</span> en reacties, zodat mensen vóór het downloaden zien hoe een asset is.',
        c4t: 'Bestandsformaten',
        c4b:
            'Upload modellen, texturen, maps, audio, scripts, binaries of archieven, in het formaat dat je <span class="special">game</span> of <span class="special">engine</span> verwacht.',
        c5t: 'Afhankelijkheden',
        c5b:
            'Geef <span class="special">afhankelijkheden</span> tussen assets op, zodat gebruikers meteen krijgen wat een asset nodig heeft.',
        c6t: 'Open-Source-Badge',
        c6b:
            'Koppel een <span class="special">broncode-repository</span> en de assetpagina krijgt een <span class="special">opensourcebadge</span>.',
        highlightTitle: 'Gratis &amp; Open-Source Assets',
        highlightBadge: 'Nu Beschikbaar',
        highlightHtml:
            `We publiceren eigen <span class="text-accent">gratis, opensource assets</span>, en er komen er meer voor engines zoals <a href="https://godotengine.org" class="${A}">Godot</a>: gameplayfuncties, multiplayer-netwerk, moddingondersteuning en meer. We willen ook een opensource <a href="#gaming-platform" class="${A}">gamingplatform</a> bouwen.`,
        button: 'Assets Bekijken',
    },
    ja: {
        eyebrow: 'アセット',
        titleHtml:
            'ゲームの<span class="special">アセット</span>と<span class="special">ツール</span>を共有',
        introHtml:
            'モデル、スクリプト、テクスチャ、プラグイン、ライブラリをアップロードできます。アセットごとに、メディア、カテゴリ、依存関係、<span class="special">バージョン管理されたダウンロード</span>を載せた専用ページが付きます。',
        c1t: 'バージョン付きリリース',
        c1b:
            '変更履歴付きの<span class="special">バージョン別リリース</span>を公開し、<span class="special">1 GB</span>以上のファイルも添付できるので、正しいビルドを入手してもらえます。',
        c2t: 'メディアギャラリー',
        c2b: '<span class="special">画像・動画</span>のギャラリーに加え、独自のアイコン、バナー、カード画像を設定できます。',
        c3t: '評価とレビュー',
        c3b:
            '<span class="special">評価</span>、<span class="special">レビュー</span>、コメントを集めて、ダウンロード前にアセットの実際の印象を確認してもらえます。',
        c4t: '対応ファイル形式',
        c4b:
            'モデル、テクスチャ、マップ、音声、スクリプト、バイナリ、アーカイブを、<span class="special">ゲーム</span>や<span class="special">エンジン</span>が求める形式のままアップロードできます。',
        c5t: '依存関係',
        c5b: 'アセット間の<span class="special">依存関係</span>を宣言すると、必要なものがまとめて入手できます。',
        c6t: 'オープンソースバッジ',
        c6b:
            '<span class="special">ソースリポジトリ</span>をリンクすると、アセットページに<span class="special">オープンソースバッジ</span>が付きます。',
        highlightTitle: '無料＆オープンソースのアセット',
        highlightBadge: '提供中',
        highlightHtml:
            `私たちは自作の<span class="text-accent">無料のオープンソースアセット</span>を公開しており、<a href="https://godotengine.org" class="${A}">Godot</a>などのエンジン向けにも、ゲームプレイ機能、マルチプレイのネットワーク、MODサポートなどを順次追加していきます。オープンソースの<a href="#gaming-platform" class="${A}">ゲームプラットフォーム</a>も作りたいと考えています。`,
        button: 'アセットを見る',
    },
    zh: {
        eyebrow: '资源',
        titleHtml:
            '分享游戏<span class="special">资源</span>与<span class="special">工具</span>',
        introHtml:
            '可以上传模型、脚本、纹理、插件和库。每个资源都有自己的页面，包含媒体、分类、依赖项和<span class="special">按版本区分的下载</span>。',
        c1t: '版本化发布',
        c1b:
            '发布附带更新日志的<span class="special">版本</span>，也可以附加 <span class="special">1 GB</span> 及以上的文件，让大家拿到正确的构建。',
        c2t: '媒体图库',
        c2b: '添加<span class="special">图片和视频</span>图库，并自定义图标、横幅和卡片图。',
        c3t: '评分与评价',
        c3b: '收集<span class="special">评分</span>、<span class="special">评价</span>和评论，让大家下载前就能了解资源的实际情况。',
        c4t: '文件格式',
        c4b:
            '可上传模型、纹理、地图、音频、脚本、二进制文件或压缩包，格式按你的<span class="special">游戏</span>或<span class="special">引擎</span>的要求即可。',
        c5t: '依赖项',
        c5b: '声明资源之间的<span class="special">依赖项</span>，用户获取资源时会一并拿到它所需的内容。',
        c6t: '开源徽章',
        c6b: '关联<span class="special">源码仓库</span>，资源页面就会显示<span class="special">开源徽章</span>。',
        highlightTitle: '免费与开源资源',
        highlightBadge: '现已推出',
        highlightHtml:
            `我们发布自己的<span class="text-accent">免费开源资源</span>，也在为 <a href="https://godotengine.org" class="${A}">Godot</a> 等引擎准备更多：玩法功能、多人联网、模组支持等。我们还想做一个开源的<a href="#gaming-platform" class="${A}">游戏平台</a>。`,
        button: '浏览资源',
    },
    pt: {
        eyebrow: 'Recursos',
        titleHtml:
            'Compartilhe <span class="special">Recursos</span> &amp; <span class="special">Ferramentas</span> de Jogos',
        introHtml:
            'Envie modelos, scripts, texturas, plugins e bibliotecas. Cada recurso tem a sua página com media, categorias, dependências e <span class="special">transferências versionadas</span>.',
        c1t: 'Lançamentos Versionados',
        c1b:
            'Publique <span class="special">versões</span> com registo de alterações e anexe ficheiros de <span class="special">1 GB</span> ou mais, para que cada pessoa obtenha a build certa.',
        c2t: 'Galerias de Mídia',
        c2b:
            'Adicione galerias de <span class="special">imagens e vídeos</span>, além de ícone, banner e imagem de cartão próprios.',
        c3t: 'Avaliações e Análises',
        c3b:
            'Receba <span class="special">classificações</span>, <span class="special">avaliações</span> e comentários, para que se veja como é um recurso antes de o transferir.',
        c4t: 'Formatos De Ficheiro',
        c4b:
            'Envie modelos, texturas, mapas, áudio, scripts, binários ou arquivos, no formato que o seu <span class="special">jogo</span> ou <span class="special">motor</span> espera.',
        c5t: 'Dependências',
        c5b:
            'Declare <span class="special">dependências</span> entre recursos para que se obtenha com ele o que ele precisa.',
        c6t: 'Selo de Código Aberto',
        c6b:
            'Ligue um <span class="special">repositório de código</span> e a página do recurso recebe um <span class="special">selo de código aberto</span>.',
        highlightTitle: 'Recursos Gratuitos e de Código Aberto',
        highlightBadge: 'Disponível Agora',
        highlightHtml:
            `Publicamos os nossos próprios <span class="text-accent">recursos gratuitos e de código aberto</span>, e vêm aí mais para motores como <a href="https://godotengine.org" class="${A}">Godot</a>: funcionalidades de jogo, rede multijogador, suporte a modding e mais. Queremos também criar uma <a href="#gaming-platform" class="${A}">plataforma de jogos</a> de código aberto.`,
        button: 'Explorar Recursos',
    },
}
