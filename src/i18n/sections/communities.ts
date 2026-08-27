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
        introHtml: `Communities are <span class="special">user-run</span> hubs, and anybody with an account can start one &mdash; no application, no approval queue. Link the <span class="special">mods</span>, <span class="special">servers</span> and <span class="special">assets</span> you already publish, add articles, discussions and a roadmap on top, and run the whole thing with your own team.`,
        c1t: 'Anybody Can Start One',
        c1b: `Sign in and create a community in a minute. It is <span class="special">yours to run</span> &mdash; no application and no approval queue.`,
        c2t: 'Link What You Already Made',
        c2b: `Attach your <span class="special">mods</span>, <span class="special">servers</span>, <span class="special">assets</span> and articles &mdash; plus discussions, a roadmap and a changelog of your own.`,
        c3t: 'Spans Several Games',
        c3b: `One community can cover <span class="special">several games</span> at once, so people follow <span class="special">you</span> rather than a game tag.`,
        c4t: 'One Live Dashboard',
        c4b: `Reach, <span class="special">contributors</span> and engagement over time, plus <span class="special">combined player counts</span> across every server you run.`,
        button: 'Browse Communities',
        buttonCreate: 'Create A Community',
    },
    es: {
        eyebrow: 'Comunidades',
        titleHtml: 'Crea Y Dirige Tu Propia <span class="special">Comunidad</span>',
        introHtml: `Las comunidades las <span class="special">gestionan los usuarios</span>, y cualquiera con una cuenta puede crear una &mdash; sin solicitudes ni colas de aprobación. Enlaza los <span class="special">mods</span>, <span class="special">servidores</span> y <span class="special">recursos</span> que ya publicas, añade artículos, debates y una hoja de ruta, y dirígelo todo con tu propio equipo.`,
        c1t: 'Cualquiera Puede Crear Una',
        c1b: `Inicia sesión y crea una comunidad en un minuto. Es <span class="special">tuya para dirigirla</span>: sin solicitudes ni colas de aprobación.`,
        c2t: 'Enlaza Lo Que Ya Has Hecho',
        c2b: `Añade tus <span class="special">mods</span>, <span class="special">servidores</span>, <span class="special">recursos</span> y artículos, además de debates, una hoja de ruta y tu propio registro de cambios.`,
        c3t: 'Abarca Varios Juegos',
        c3b: `Una comunidad puede cubrir <span class="special">varios juegos</span> a la vez, así la gente te sigue a <span class="special">ti</span> y no a una etiqueta de juego.`,
        c4t: 'Un Panel En Vivo',
        c4b: `Alcance, <span class="special">colaboradores</span> e interacción a lo largo del tiempo, más el <span class="special">recuento combinado de jugadores</span> de todos tus servidores.`,
        button: 'Explorar Comunidades',
        buttonCreate: 'Crear Una Comunidad',
    },
    fr: {
        eyebrow: 'Communautés',
        titleHtml:
            'Créez Et Animez Votre Propre <span class="special">Communauté</span>',
        introHtml: `Les communautés sont <span class="special">gérées par leurs membres</span>, et n'importe qui avec un compte peut en créer une &mdash; sans candidature ni file d'attente. Reliez-y les <span class="special">mods</span>, <span class="special">serveurs</span> et <span class="special">ressources</span> que vous publiez déjà, ajoutez des articles, des discussions et une feuille de route, et gérez le tout avec votre propre équipe.`,
        c1t: "N'importe Qui Peut En Créer Une",
        c1b: `Connectez-vous et créez une communauté en une minute. Elle est <span class="special">à vous</span> : sans candidature ni file d'attente.`,
        c2t: 'Reliez Ce Que Vous Avez Déjà Fait',
        c2b: `Rattachez vos <span class="special">mods</span>, <span class="special">serveurs</span>, <span class="special">ressources</span> et articles, plus des discussions, une feuille de route et votre propre journal des modifications.`,
        c3t: 'Couvre Plusieurs Jeux',
        c3b: `Une communauté peut couvrir <span class="special">plusieurs jeux</span> à la fois : les gens vous suivent <span class="special">vous</span>, pas une étiquette de jeu.`,
        c4t: 'Un Tableau De Bord En Direct',
        c4b: `Portée, <span class="special">contributeurs</span> et engagement au fil du temps, plus le <span class="special">nombre combiné de joueurs</span> sur tous vos serveurs.`,
        button: 'Parcourir Les Communautés',
        buttonCreate: 'Créer Une Communauté',
    },
    de: {
        eyebrow: 'Communitys',
        titleHtml:
            'Gründe Und Leite Deine Eigene <span class="special">Community</span>',
        introHtml: `Communitys werden <span class="special">von Nutzern betrieben</span>, und jeder mit einem Konto kann eine gründen &mdash; ohne Bewerbung, ohne Freigabe-Warteschlange. Verknüpfe die <span class="special">Mods</span>, <span class="special">Server</span> und <span class="special">Assets</span>, die du ohnehin veröffentlichst, ergänze Artikel, Diskussionen und eine Roadmap, und leite das Ganze mit deinem eigenen Team.`,
        c1t: 'Jeder Kann Eine Gründen',
        c1b: `Anmelden und in einer Minute eine Community anlegen. Sie gehört <span class="special">dir</span> – ohne Bewerbung und ohne Freigabe-Warteschlange.`,
        c2t: 'Verknüpfe, Was Du Schon Gebaut Hast',
        c2b: `Häng deine <span class="special">Mods</span>, <span class="special">Server</span>, <span class="special">Assets</span> und Artikel an – dazu Diskussionen, eine Roadmap und ein eigenes Changelog.`,
        c3t: 'Umfasst Mehrere Spiele',
        c3b: `Eine Community kann <span class="special">mehrere Spiele</span> gleichzeitig abdecken, sodass die Leute <span class="special">dir</span> folgen und nicht einem Spiel-Tag.`,
        c4t: 'Ein Live-Dashboard',
        c4b: `Reichweite, <span class="special">Mitwirkende</span> und Engagement im Zeitverlauf – plus <span class="special">kombinierte Spielerzahlen</span> über alle deine Server.`,
        button: 'Communitys Durchstöbern',
        buttonCreate: 'Community Gründen',
    },
    ru: {
        eyebrow: 'Сообщества',
        titleHtml:
            'Создайте И Ведите Собственное <span class="special">Сообщество</span>',
        introHtml: `Сообщества <span class="special">ведут сами пользователи</span>, и создать своё может любой, у кого есть аккаунт &mdash; без заявок и очередей на одобрение. Привяжите <span class="special">моды</span>, <span class="special">серверы</span> и <span class="special">ресурсы</span>, которые вы и так публикуете, добавьте статьи, обсуждения и дорожную карту и ведите всё это своей командой.`,
        c1t: 'Создать Может Каждый',
        c1b: `Войдите и создайте сообщество за минуту. Оно <span class="special">полностью ваше</span> — без заявок и очередей на одобрение.`,
        c2t: 'Привяжите То, Что Уже Сделали',
        c2b: `Прикрепите свои <span class="special">моды</span>, <span class="special">серверы</span>, <span class="special">ресурсы</span> и статьи, а также обсуждения, дорожную карту и собственный список изменений.`,
        c3t: 'Охватывает Несколько Игр',
        c3b: `Одно сообщество может охватывать <span class="special">несколько игр</span> сразу, поэтому люди следят за <span class="special">вами</span>, а не за тегом игры.`,
        c4t: 'Одна Живая Панель',
        c4b: `Охват, <span class="special">участники</span> и вовлечённость во времени, плюс <span class="special">суммарное число игроков</span> на всех ваших серверах.`,
        button: 'Смотреть Сообщества',
        buttonCreate: 'Создать Сообщество',
    },
    nl: {
        eyebrow: 'Gemeenschappen',
        titleHtml:
            'Start En Run Je Eigen <span class="special">Gemeenschap</span>',
        introHtml: `Gemeenschappen worden <span class="special">door gebruikers gerund</span>, en iedereen met een account kan er een starten &mdash; geen aanvraag, geen wachtrij voor goedkeuring. Koppel de <span class="special">mods</span>, <span class="special">servers</span> en <span class="special">assets</span> die je toch al publiceert, voeg artikelen, discussies en een roadmap toe, en run het geheel met je eigen team.`,
        c1t: 'Iedereen Kan Er Een Starten',
        c1b: `Log in en maak in een minuut een gemeenschap aan. Hij is <span class="special">van jou</span> — geen aanvraag en geen wachtrij.`,
        c2t: 'Koppel Wat Je Al Maakte',
        c2b: `Hang je <span class="special">mods</span>, <span class="special">servers</span>, <span class="special">assets</span> en artikelen eraan, plus discussies, een roadmap en een eigen changelog.`,
        c3t: 'Omvat Meerdere Games',
        c3b: `Eén gemeenschap kan <span class="special">meerdere games</span> tegelijk beslaan, zodat mensen <span class="special">jou</span> volgen en niet een gametag.`,
        c4t: 'Eén Live Dashboard',
        c4b: `Bereik, <span class="special">bijdragers</span> en betrokkenheid door de tijd heen, plus <span class="special">gecombineerde spelersaantallen</span> over al je servers.`,
        button: 'Gemeenschappen Bekijken',
        buttonCreate: 'Gemeenschap Starten',
    },
    ja: {
        eyebrow: 'コミュニティ',
        titleHtml:
            '自分の <span class="special">コミュニティ</span> を作って運営しよう',
        introHtml: `コミュニティは <span class="special">ユーザー自身が運営</span> するハブで、アカウントさえあれば誰でも作れます &mdash; 申請も承認待ちもありません。すでに公開している <span class="special">Mod</span>、<span class="special">サーバー</span>、<span class="special">アセット</span> をひも付け、記事や掲示板、ロードマップを加えて、自分のチームで運営できます。`,
        c1t: '誰でも作れます',
        c1b: `ログインすれば 1 分でコミュニティを作成。運営するのは <span class="special">あなた自身</span> です &mdash; 申請も承認待ちもありません。`,
        c2t: '作ったものをひも付ける',
        c2b: `<span class="special">Mod</span>、<span class="special">サーバー</span>、<span class="special">アセット</span>、記事に加え、掲示板・ロードマップ・独自の変更履歴まで束ねられます。`,
        c3t: '複数のゲームにまたがる',
        c3b: `一つのコミュニティで <span class="special">複数のゲーム</span> を同時に扱えるので、みんながフォローするのはゲームのタグではなく <span class="special">あなた</span> 自身です。`,
        c4t: 'ライブダッシュボード',
        c4b: `<span class="special">リーチ</span>、貢献者、エンゲージメントの推移に加え、運営する全サーバーの <span class="special">合計プレイヤー数</span> も一目で。`,
        button: 'コミュニティを見る',
        buttonCreate: 'コミュニティを作る',
    },
    zh: {
        eyebrow: '社区',
        titleHtml: '创建并运营属于你的<span class="special">社区</span>',
        introHtml: `社区由<span class="special">用户自己运营</span>，任何拥有账号的人都能创建 &mdash; 无需申请，也没有审核排队。把你已经发布的<span class="special">模组</span>、<span class="special">服务器</span>和<span class="special">资源</span>关联进来，再加上文章、讨论和路线图，然后和你自己的团队一起运营。`,
        c1t: '人人都能创建',
        c1b: `登录后一分钟即可创建社区。它<span class="special">由你运营</span>——无需申请，也没有审核排队。`,
        c2t: '关联你已有的作品',
        c2b: `把你的<span class="special">模组</span>、<span class="special">服务器</span>、<span class="special">资源</span>和文章挂进来，还有讨论、路线图和你自己的更新日志。`,
        c3t: '横跨多款游戏',
        c3b: `一个社区可以同时覆盖<span class="special">多款游戏</span>，让大家关注的是<span class="special">你</span>，而不是某个游戏标签。`,
        c4t: '一个实时仪表盘',
        c4b: `覆盖范围、<span class="special">贡献者</span>与互动的变化趋势，以及你运营的所有服务器的<span class="special">合计玩家数</span>。`,
        button: '浏览社区',
        buttonCreate: '创建社区',
    },
    pt: {
        eyebrow: 'Comunidades',
        titleHtml: 'Crie E Dirija Sua Própria <span class="special">Comunidade</span>',
        introHtml: `As comunidades são <span class="special">dirigidas pelos usuários</span>, e qualquer pessoa com uma conta pode criar a sua &mdash; sem inscrição e sem fila de aprovação. Vincule os <span class="special">mods</span>, <span class="special">servidores</span> e <span class="special">recursos</span> que você já publica, acrescente artigos, discussões e um roadmap, e toque tudo com a sua própria equipe.`,
        c1t: 'Qualquer Um Pode Criar',
        c1b: `Entre e crie uma comunidade em um minuto. Ela é <span class="special">sua para dirigir</span> &mdash; sem inscrição e sem fila de aprovação.`,
        c2t: 'Vincule O Que Você Já Fez',
        c2b: `Anexe seus <span class="special">mods</span>, <span class="special">servidores</span>, <span class="special">recursos</span> e artigos, além de discussões, um roadmap e um changelog próprio.`,
        c3t: 'Abrange Vários Jogos',
        c3b: `Uma comunidade pode cobrir <span class="special">vários jogos</span> ao mesmo tempo, então as pessoas seguem <span class="special">você</span>, não uma etiqueta de jogo.`,
        c4t: 'Um Painel Ao Vivo',
        c4b: `Alcance, <span class="special">colaboradores</span> e engajamento ao longo do tempo, mais a <span class="special">contagem combinada de jogadores</span> em todos os seus servidores.`,
        button: 'Explorar Comunidades',
        buttonCreate: 'Criar Uma Comunidade',
    },
}
