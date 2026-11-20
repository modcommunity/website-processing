import type { SectionCatalog } from './types'

/*
 * <title>, description and Open Graph copy for the pages that have a body
 * translation (`landing.pageMeta.*`). Read through `pageMeta()` in
 * `src/i18n/meta.ts`. `<page>Title` is the short name, `<page>Main` the full
 * <title>, `<page>Desc` the meta description (kept near 160 characters).
 * Product, tool and project names are never translated. The legal pages are
 * left out: their bodies are English, so a translated title would mislead.
 */
export const pageMeta: SectionCatalog = {
    en: {
        homeMain: 'The Modding Community',
        homeDesc: 'A modding and game development community. Browse and share mods, game dev assets and game servers. The mod workshop and asset library are live now.',
        platformTitle: 'The TMC Gaming Platform',
        platformMain: 'The TMC Gaming Platform - The Modding Community',
        platformDesc: 'GameSpice is The Modding Community\'s gaming platform: open-source Godot addons, community servers, and browser and native players on the same server, with stats, leaderboards, a Workshop and an item store.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli is a dependency-free Python command-line client for our content API. Create and edit content, manage relations, and upload files and cut releases in a single command.',
    },
    es: {
        homeMain: 'The Modding Community',
        homeDesc: 'Una comunidad de modding y desarrollo de juegos. Explora y comparte mods, recursos para desarrollo de juegos y servidores de juegos. El taller de mods y la biblioteca de recursos ya están disponibles.',
        platformTitle: 'La plataforma de juegos de TMC',
        platformMain: 'La plataforma de juegos de TMC - The Modding Community',
        platformDesc: 'GameSpice es la plataforma de juegos de The Modding Community: complementos de Godot de código abierto, servidores de la comunidad y jugadores del navegador y nativos en el mismo servidor, con estadísticas, clasificaciones, Workshop y tienda de objetos.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli es un cliente de línea de comandos en Python, sin dependencias, para nuestra API de contenido. Crea y edita contenido, gestiona relaciones, sube archivos y publica versiones con un solo comando.',
    },
    fr: {
        homeMain: 'The Modding Community',
        homeDesc: "Une communauté de modding et de développement de jeux. Parcourez et partagez des mods, des assets et des serveurs de jeux. L'atelier de mods et la bibliothèque d'assets sont disponibles.",
        platformTitle: 'La plateforme de jeux TMC',
        platformMain: 'La plateforme de jeux TMC - The Modding Community',
        platformDesc: 'GameSpice est la plateforme de jeu de The Modding Community : modules Godot open source, serveurs communautaires et joueurs du navigateur et natifs sur le même serveur, avec statistiques, classements, Workshop et boutique d\'objets.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: "tmc-cli est un client Python en ligne de commande, sans dépendances, pour notre API de contenu. Créez et modifiez du contenu, gérez les relations, envoyez des fichiers et publiez des versions en une commande.",
    },
    de: {
        homeMain: 'The Modding Community',
        homeDesc: 'Eine Community für Modding und Spieleentwicklung. Entdecke und teile Mods, Assets für die Spieleentwicklung und Spieleserver. Mod-Workshop und Asset-Bibliothek sind bereits live.',
        platformTitle: 'Die TMC-Spieleplattform',
        platformMain: 'Die TMC-Spieleplattform - The Modding Community',
        platformDesc: 'GameSpice ist die Gaming-Plattform von The Modding Community: quelloffene Godot-Addons, Community-Server und Browser- und native Spieler auf demselben Server, mit Statistiken, Bestenlisten, Workshop und Item-Shop.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli ist ein abhängigkeitsfreier Python-Kommandozeilenclient für unsere Content-API. Inhalte erstellen und bearbeiten, Relationen verwalten, Dateien hochladen und Releases veröffentlichen, mit einem Befehl.',
    },
    ru: {
        homeMain: 'The Modding Community',
        homeDesc: 'Сообщество моддинга и разработки игр. Находите и публикуйте моды, ресурсы для разработки игр и игровые серверы. Мастерская модов и библиотека ресурсов уже работают.',
        platformTitle: 'Игровая платформа TMC',
        platformMain: 'Игровая платформа TMC - The Modding Community',
        platformDesc: 'GameSpice — игровая платформа The Modding Community: открытые аддоны Godot, серверы сообщества, игроки из браузера и нативных сборок на одном сервере, статистика, таблицы лидеров, Workshop и магазин предметов.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli — консольный клиент на Python без зависимостей для нашего API контента. Создание и правка контента, связи, загрузка файлов и выпуск релизов одной командой.',
    },
    nl: {
        homeMain: 'The Modding Community',
        homeDesc: 'Een community voor modding en game-ontwikkeling. Ontdek en deel mods, game-assets en gameservers. De mod-werkplaats en de assetbibliotheek zijn nu live.',
        platformTitle: 'Het TMC-gameplatform',
        platformMain: 'Het TMC-gameplatform - The Modding Community',
        platformDesc: 'GameSpice is het gamingplatform van The Modding Community: open-source Godot-addons, communityservers en browser- en native spelers op dezelfde server, met statistieken, ranglijsten, een Workshop en een itemwinkel.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli is een Python-opdrachtregelclient zonder afhankelijkheden voor onze content-API. Maak en bewerk content, beheer relaties, upload bestanden en publiceer releases met één commando.',
    },
    ja: {
        homeMain: 'The Modding Community',
        homeDesc: 'モッディングとゲーム開発のコミュニティ。MOD、ゲーム開発アセット、ゲームサーバーを探して共有できます。MODワークショップとアセットライブラリは公開中です。',
        platformTitle: 'TMCゲームプラットフォーム',
        platformMain: 'TMCゲームプラットフォーム - The Modding Community',
        platformDesc: 'GameSpiceはThe Modding Communityのゲームプラットフォームです。オープンソースのGodotアドオン、コミュニティサーバー、ブラウザとネイティブのプレイヤーが同じサーバーで遊べる仕組みに加え、統計、リーダーボード、Workshop、アイテムストアを備えています。',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cliは、コンテンツAPI用の依存関係のないPythonコマンドラインクライアントです。コンテンツの作成と編集、関連の管理、ファイルのアップロード、リリースを1コマンドで。',
    },
    zh: {
        homeMain: 'The Modding Community',
        homeDesc: '一个模组与游戏开发社区。浏览并分享模组、游戏开发资源和游戏服务器。模组工坊和资源库现已上线。',
        platformTitle: 'TMC 游戏平台',
        platformMain: 'TMC 游戏平台 - The Modding Community',
        platformDesc: 'GameSpice 是 The Modding Community 的游戏平台：开源 Godot 插件、社区服务器，浏览器与原生玩家同服游戏，并提供统计、排行榜、Workshop 和物品商店。',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli 是面向我们内容 API 的无依赖 Python 命令行客户端。一条命令即可创建和编辑内容、管理关系、上传文件并发布版本。',
    },
    pt: {
        homeMain: 'The Modding Community',
        homeDesc: 'Uma comunidade de modding e desenvolvimento de jogos. Explore e partilhe mods, recursos para desenvolvimento de jogos e servidores de jogos. A oficina de mods e a biblioteca de recursos já estão no ar.',
        platformTitle: 'A plataforma de jogos TMC',
        platformMain: 'A plataforma de jogos TMC - The Modding Community',
        platformDesc: 'O GameSpice é a plataforma de jogos da The Modding Community: addons Godot de código aberto, servidores da comunidade e jogadores do navegador e nativos no mesmo servidor, com estatísticas, classificações, Workshop e loja de itens.',
        cliTitle: 'tmc-cli',
        cliMain: 'tmc-cli - The Modding Community',
        cliDesc: 'tmc-cli é um cliente Python de linha de comandos, sem dependências, para a nossa API de conteúdo. Crie e edite conteúdo, gira relações, envie ficheiros e publique versões com um só comando.',
    },
}
