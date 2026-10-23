import type { SectionCatalog } from './types'

export const api: SectionCatalog = {
    en: {
        eyebrow: 'Developer API',
        titleHtml: 'Script Anything With The <span class="special">Content API</span>',
        introHtml:
            '<span class="special">Assets</span>, <span class="special">mods</span>, <span class="special">communities</span> and <span class="special">collections</span> can all be created and edited through one API. Use a <span class="special">personal access token</span>, or a key in <span class="special">JWT mode</span>, which signs each request with your own Ed25519 key so no secret leaves your machine. It fits <span class="special">CI/CD</span> pipelines: build your project, cut a release and upload its files on every commit.',
        c1t: 'Tokens Or Signed JWTs',
        c1b:
            'Bearer <span class="special">tmc_</span> tokens, or a key in <span class="special">JWT mode</span> that signs every request with your own Ed25519 key. Either way you get read / write / delete scopes, expiry, IP allow-lists and per-key rate limits.',
        c2t: 'REST Endpoints',
        c2b: 'Create, update and delete any content type with simple JSON under <span class="special">/api/content</span>.',
        c3t: 'Upload Relations',
        c3b: 'Push <span class="special">releases</span>, <span class="special">files</span>, <span class="special">images &amp; media</span>, links and installers through the relations API.',
        c4t: 'Limits And Logs',
        c4b:
            'Every request is <span class="special">rate-limited</span> and <span class="special">audit-logged</span>, and a key can never do more than its owner can.',
        // Links out to /tmc-cli, translated in all nine locales like this one.
        cliButton: 'Meet tmc-cli',
    },
    es: {
        eyebrow: 'API para Desarrolladores',
        titleHtml: 'Automatiza Lo Que Quieras Con La <span class="special">API De Contenido</span>',
        introHtml:
            'Los <span class="special">recursos</span>, <span class="special">mods</span>, <span class="special">comunidades</span> y <span class="special">colecciones</span> se pueden crear y editar a través de una sola API. Usa un <span class="special">token de acceso personal</span> o una clave en <span class="special">modo JWT</span>, que firma cada solicitud con tu propia clave Ed25519 para que ningún secreto salga de tu equipo. Encaja en pipelines de <span class="special">CI/CD</span>: compila tu proyecto, crea una versión y sube sus archivos en cada commit.',
        c1t: 'Tokens o JWT Firmados',
        c1b:
            'Tokens <span class="special">tmc_</span> de tipo Bearer, o una clave en <span class="special">modo JWT</span> que firma cada solicitud con tu propia clave Ed25519. En ambos casos hay permisos de lectura, escritura y borrado, caducidad, listas de IP permitidas y límites de uso por clave.',
        c2t: 'Endpoints REST',
        c2b: 'Crea, actualiza y elimina cualquier tipo de contenido con JSON sencillo en <span class="special">/api/content</span>.',
        c3t: 'Subir Relaciones',
        c3b: 'Envía <span class="special">versiones</span>, <span class="special">archivos</span>, <span class="special">imágenes &amp; medios</span>, enlaces e instaladores a través de la API de relaciones.',
        c4t: 'Límites Y Registros',
        c4b:
            'Cada solicitud tiene <span class="special">límite de frecuencia</span> y queda en el <span class="special">registro de auditoría</span>, y una clave nunca puede hacer más que su propietario.',
        cliButton: 'Conoce tmc-cli',
    },
    fr: {
        eyebrow: 'API pour Développeurs',
        titleHtml: `Automatisez Ce Que Vous Voulez Avec L'<span class="special">API De Contenu</span>`,
        introHtml:
            `Les <span class="special">ressources</span>, <span class="special">mods</span>, <span class="special">communautés</span> et <span class="special">collections</span> se créent et se modifient toutes via une seule API. Utilisez un <span class="special">jeton d'accès personnel</span> ou une clé en <span class="special">mode JWT</span>, qui signe chaque requête avec votre propre clé Ed25519 pour qu'aucun secret ne quitte votre machine. Cela convient aux pipelines <span class="special">CI/CD</span> : compilez votre projet, créez une version et envoyez ses fichiers à chaque commit.`,
        c1t: 'Jetons ou JWT Signés',
        c1b:
            `Des jetons <span class="special">tmc_</span> en Bearer, ou une clé en <span class="special">mode JWT</span> qui signe chaque requête avec votre propre clé Ed25519. Dans les deux cas : droits de lecture, d'écriture et de suppression, expiration, listes d'IP autorisées et limites de débit par clé.`,
        c2t: 'Points de Terminaison REST',
        c2b: 'Créez, mettez à jour et supprimez tout type de contenu avec du JSON simple sous <span class="special">/api/content</span>.',
        c3t: 'Téléverser des Relations',
        c3b: "Envoyez des <span class=\"special\">versions</span>, <span class=\"special\">fichiers</span>, <span class=\"special\">images &amp; médias</span>, liens et installateurs via l'API de relations.",
        c4t: 'Limites Et Journaux',
        c4b:
            'Chaque requête est <span class="special">limitée en débit</span> et <span class="special">journalisée</span>, et une clé ne peut jamais faire plus que son propriétaire.',
        cliButton: 'Découvrir tmc-cli',
    },
    de: {
        eyebrow: 'Entwickler-API',
        titleHtml: 'Automatisiere Alles Mit Der <span class="special">Content-API</span>',
        introHtml:
            '<span class="special">Assets</span>, <span class="special">Mods</span>, <span class="special">Communitys</span> und <span class="special">Sammlungen</span> lassen sich über eine API anlegen und bearbeiten. Nutze ein <span class="special">persönliches Zugriffstoken</span> oder einen Schlüssel im <span class="special">JWT-Modus</span>, der jede Anfrage mit deinem eigenen Ed25519-Schlüssel signiert, sodass kein Geheimnis deinen Rechner verlässt. Passt zu <span class="special">CI/CD</span>-Pipelines: Projekt bauen, Release erstellen und bei jedem Commit die Dateien hochladen.',
        c1t: 'Token Oder Signierte JWTs',
        c1b:
            'Bearer-<span class="special">tmc_</span>-Tokens oder ein Schlüssel im <span class="special">JWT-Modus</span>, der jede Anfrage mit deinem eigenen Ed25519-Schlüssel signiert. In beiden Fällen gibt es Lese-/Schreib-/Löschrechte, Ablaufdatum, IP-Freigabelisten und Ratenlimits pro Schlüssel.',
        c2t: 'REST-Endpunkte',
        c2b: 'Erstelle, aktualisiere und lösche jeden Inhaltstyp mit einfachem JSON unter <span class="special">/api/content</span>.',
        c3t: 'Beziehungen Hochladen',
        c3b: 'Übertrage <span class="special">Releases</span>, <span class="special">Dateien</span>, <span class="special">Bilder &amp; Medien</span>, Links und Installer über die Beziehungs-API.',
        c4t: 'Limits Und Protokolle',
        c4b:
            'Jede Anfrage ist <span class="special">ratenbegrenzt</span> und wird <span class="special">protokolliert</span>, und ein Schlüssel kann nie mehr als sein Besitzer.',
        cliButton: 'tmc-cli Entdecken',
    },
    ru: {
        eyebrow: 'API для Разработчиков',
        titleHtml: 'Автоматизируйте Что Угодно Через <span class="special">API Контента</span>',
        introHtml:
            '<span class="special">Ассеты</span>, <span class="special">моды</span>, <span class="special">сообщества</span> и <span class="special">коллекции</span> можно создавать и редактировать через один API. Используйте <span class="special">персональный токен доступа</span> или ключ в <span class="special">режиме JWT</span>, который подписывает каждый запрос вашим Ed25519-ключом, так что секрет не покидает ваш компьютер. Подходит для конвейеров <span class="special">CI/CD</span>: собирайте проект, создавайте релиз и загружайте его файлы при каждом коммите.',
        c1t: 'Токены Или Подписанные JWT',
        c1b:
            'Токены <span class="special">tmc_</span> типа Bearer или ключ в <span class="special">режиме JWT</span>, который подписывает каждый запрос вашим Ed25519-ключом. В обоих случаях есть права на чтение, запись и удаление, срок действия, списки разрешённых IP и лимиты запросов на ключ.',
        c2t: 'REST-эндпоинты',
        c2b: 'Создавайте, обновляйте и удаляйте любой тип контента простым JSON по адресу <span class="special">/api/content</span>.',
        c3t: 'Загрузка Связей',
        c3b: 'Отправляйте <span class="special">релизы</span>, <span class="special">файлы</span>, <span class="special">изображения &amp; медиа</span>, ссылки и установщики через API связей.',
        c4t: 'Лимиты И Журналы',
        c4b:
            'У каждого запроса есть <span class="special">лимит частоты</span>, он попадает в <span class="special">журнал аудита</span>, и ключ никогда не может больше, чем его владелец.',
        cliButton: 'Познакомьтесь с tmc-cli',
    },
    nl: {
        eyebrow: 'Ontwikkelaars-API',
        titleHtml: 'Automatiseer Alles Met De <span class="special">Content-API</span>',
        introHtml:
            '<span class="special">Assets</span>, <span class="special">mods</span>, <span class="special">communities</span> en <span class="special">collecties</span> maak en bewerk je allemaal via één API. Gebruik een <span class="special">persoonlijk toegangstoken</span> of een sleutel in <span class="special">JWT-modus</span>, die elk verzoek ondertekent met je eigen Ed25519-sleutel zodat geen geheim je machine verlaat. Geschikt voor <span class="special">CI/CD</span>-pipelines: bouw je project, maak een release en upload de bestanden bij elke commit.',
        c1t: 'Tokens Of Ondertekende JWTs',
        c1b:
            'Bearer-<span class="special">tmc_</span>-tokens, of een sleutel in <span class="special">JWT-modus</span> die elk verzoek ondertekent met je eigen Ed25519-sleutel. In beide gevallen krijg je lees-/schrijf-/verwijderrechten, een vervaldatum, IP-toelatingslijsten en ratelimieten per sleutel.',
        c2t: 'REST-eindpunten',
        c2b: 'Maak, werk bij en verwijder elk contenttype met eenvoudige JSON onder <span class="special">/api/content</span>.',
        c3t: 'Relaties Uploaden',
        c3b: 'Push <span class="special">releases</span>, <span class="special">bestanden</span>, <span class="special">afbeeldingen &amp; media</span>, links en installers via de relaties-API.',
        c4t: 'Limieten En Logboeken',
        c4b:
            'Elk verzoek heeft een <span class="special">ratelimiet</span> en komt in het <span class="special">auditlogboek</span>, en een sleutel kan nooit meer dan de eigenaar.',
        cliButton: 'Maak Kennis Met tmc-cli',
    },
    ja: {
        eyebrow: '開発者向けAPI',
        titleHtml: '<span class="special">コンテンツAPI</span>で何でもスクリプト化',
        introHtml:
            '<span class="special">アセット</span>、<span class="special">MOD</span>、<span class="special">コミュニティ</span>、<span class="special">コレクション</span>は、すべて1つのAPIから作成・編集できます。<span class="special">個人用アクセストークン</span>、または<span class="special">JWTモード</span>のキーを使えます。後者は各リクエストを自分のEd25519鍵で署名するので、秘密情報がマシンの外に出ません。<span class="special">CI/CD</span>パイプラインに向いており、コミットのたびにビルド、リリース作成、ファイルのアップロードを自動で行えます。',
        c1t: 'トークンまたは署名付き JWT',
        c1b:
            'Bearer方式の<span class="special">tmc_</span>トークン、または自分のEd25519鍵で全リクエストを署名する<span class="special">JWTモード</span>のキー。どちらも読み取り・書き込み・削除のスコープ、有効期限、IP許可リスト、キーごとのレート制限が使えます。',
        c2t: 'REST エンドポイント',
        c2b: '<span class="special">/api/content</span> でシンプルなJSONを使い、あらゆるコンテンツタイプを作成・更新・削除できます。',
        c3t: '関連要素のアップロード',
        c3b: '関連API経由で<span class="special">リリース</span>、<span class="special">ファイル</span>、<span class="special">画像 &amp; メディア</span>、リンク、インストーラーをプッシュできます。',
        c4t: '制限とログ',
        c4b:
            'すべてのリクエストに<span class="special">レート制限</span>がかかり、<span class="special">監査ログ</span>に残ります。キーの権限が所有者を超えることはありません。',
        cliButton: 'tmc-cli を見る',
    },
    zh: {
        eyebrow: '开发者 API',
        titleHtml: '用<span class="special">内容 API</span>自动化一切',
        introHtml:
            '<span class="special">资源</span>、<span class="special">模组</span>、<span class="special">社区</span>和<span class="special">合集</span>都可以通过同一个 API 创建和编辑。可使用<span class="special">个人访问令牌</span>，或<span class="special">JWT 模式</span>的密钥：它用你自己的 Ed25519 密钥为每个请求签名，任何机密都不会离开你的机器。适合 <span class="special">CI/CD</span> 流水线：构建项目、创建发布，并在每次提交时上传文件。',
        c1t: '令牌或签名 JWT',
        c1b:
            'Bearer 方式的 <span class="special">tmc_</span> 令牌，或<span class="special">JWT 模式</span>的密钥，用你自己的 Ed25519 密钥为每个请求签名。两种方式都支持读取 / 写入 / 删除权限、过期时间、IP 白名单和按密钥限速。',
        c2t: 'REST 端点',
        c2b: '在 <span class="special">/api/content</span> 下用简单的 JSON 创建、更新和删除任意内容类型。',
        c3t: '上传关联项',
        c3b: '通过关联 API 推送<span class="special">发行版</span>、<span class="special">文件</span>、<span class="special">图片 &amp; 媒体</span>、链接和安装程序。',
        c4t: '限制与日志',
        c4b: '每个请求都有<span class="special">限速</span>并记入<span class="special">审计日志</span>，密钥的权限永远不会超过其所有者。',
        cliButton: '认识 tmc-cli 命令行工具',
    },
    pt: {
        eyebrow: 'API para Desenvolvedores',
        titleHtml: 'Automatize O Que Quiser Com A <span class="special">API De Conteúdo</span>',
        introHtml:
            'Os <span class="special">recursos</span>, <span class="special">mods</span>, <span class="special">comunidades</span> e <span class="special">coleções</span> podem ser criados e editados por uma única API. Use um <span class="special">token de acesso pessoal</span> ou uma chave em <span class="special">modo JWT</span>, que assina cada pedido com a sua própria chave Ed25519 para que nenhum segredo saia da sua máquina. Serve para pipelines de <span class="special">CI/CD</span>: compile o projeto, crie uma versão e envie os ficheiros a cada commit.',
        c1t: 'Tokens ou JWTs Assinados',
        c1b:
            'Tokens <span class="special">tmc_</span> Bearer, ou uma chave em <span class="special">modo JWT</span> que assina cada pedido com a sua própria chave Ed25519. Em ambos há permissões de leitura, escrita e eliminação, validade, listas de IP permitidos e limites de pedidos por chave.',
        c2t: 'Endpoints REST',
        c2b: 'Crie, atualize e exclua qualquer tipo de conteúdo com JSON simples em <span class="special">/api/content</span>.',
        c3t: 'Enviar Relações',
        c3b: 'Envie <span class="special">versões</span>, <span class="special">arquivos</span>, <span class="special">imagens &amp; mídia</span>, links e instaladores pela API de relações.',
        c4t: 'Limites E Registos',
        c4b:
            'Cada pedido tem <span class="special">limite de frequência</span> e fica no <span class="special">registo de auditoria</span>, e uma chave nunca pode mais do que o seu dono.',
        cliButton: 'Conheça O tmc-cli',
    },
}
