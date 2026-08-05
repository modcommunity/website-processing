import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-2 hover:duration-300'

export const blog: SectionCatalog = {
    en: {
        eyebrow: 'Blog',
        titleHtml: 'Check Out Our <span class="special">Blog</span>',
        introHtml: `Our blog serves as a <span class="italic">growing</span> resource for modding and server <span class="special">guides</span> in games such as <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a>, and more!`,
        moddingGuidesHtml:
            'Check out some of our modding <span class="special">how-to</span> guides!',
        serverGuidesHtml:
            'Check out some of our server <span class="special">setup</span> guides!',
        prev: 'Previous articles',
        next: 'Next articles',
    },
    es: {
        eyebrow: 'Blog',
        titleHtml: 'Descubre Nuestro <span class="special">Blog</span>',
        introHtml: `Nuestro blog es un recurso <span class="italic">en crecimiento</span> de <span class="special">guías</span> de modding y servidores para juegos como <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a>, ¡y muchos más!`,
        moddingGuidesHtml:
            '¡Echa un vistazo a algunas de nuestras <span class="special">guías prácticas</span> de modding!',
        serverGuidesHtml:
            '¡Echa un vistazo a algunas de nuestras <span class="special">guías de configuración</span> de servidores!',
        prev: 'Artículos anteriores',
        next: 'Artículos siguientes',
    },
    fr: {
        eyebrow: 'Blog',
        titleHtml: 'Découvrez Notre <span class="special">Blog</span>',
        introHtml: `Notre blog est une ressource <span class="italic">en pleine croissance</span> de <span class="special">guides</span> de modding et de serveurs pour des jeux comme <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a>, et bien plus !`,
        moddingGuidesHtml:
            'Découvrez quelques-uns de nos <span class="special">guides pratiques</span> de modding !',
        serverGuidesHtml:
            'Découvrez quelques-uns de nos <span class="special">guides de configuration</span> de serveurs !',
        prev: 'Articles précédents',
        next: 'Articles suivants',
    },
    de: {
        eyebrow: 'Blog',
        titleHtml: 'Wirf Einen Blick in Unseren <span class="special">Blog</span>',
        introHtml: `Unser Blog ist eine <span class="italic">wachsende</span> Ressource für Modding- und Server-<span class="special">Anleitungen</span> zu Spielen wie <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> und vielem mehr!`,
        moddingGuidesHtml:
            'Wirf einen Blick auf einige unserer Modding-<span class="special">Anleitungen</span>!',
        serverGuidesHtml:
            'Wirf einen Blick auf einige unserer Server-<span class="special">Einrichtungsanleitungen</span>!',
        prev: 'Vorherige Artikel',
        next: 'Nächste Artikel',
    },
    ru: {
        eyebrow: 'Блог',
        titleHtml: 'Загляните в Наш <span class="special">Блог</span>',
        introHtml: `Наш блог — это <span class="italic">растущий</span> ресурс с <span class="special">руководствами</span> по моддингу и серверам для таких игр, как <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> и не только!`,
        moddingGuidesHtml:
            'Ознакомьтесь с некоторыми из наших <span class="special">пошаговых руководств</span> по моддингу!',
        serverGuidesHtml:
            'Ознакомьтесь с некоторыми из наших <span class="special">руководств по настройке</span> серверов!',
        prev: 'Предыдущие статьи',
        next: 'Следующие статьи',
    },
    nl: {
        eyebrow: 'Blog',
        titleHtml: 'Bekijk Onze <span class="special">Blog</span>',
        introHtml: `Onze blog is een <span class="italic">groeiende</span> bron van modding- en server-<span class="special">handleidingen</span> voor games zoals <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> en nog veel meer!`,
        moddingGuidesHtml:
            'Bekijk enkele van onze modding-<span class="special">handleidingen</span>!',
        serverGuidesHtml:
            'Bekijk enkele van onze server-<span class="special">installatiehandleidingen</span>!',
        prev: 'Vorige artikelen',
        next: 'Volgende artikelen',
    },
    ja: {
        eyebrow: 'ブログ',
        titleHtml: '私たちの<span class="special">ブログ</span>をチェック',
        introHtml: `私たちのブログは、<a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>、<a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>、<a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> などのゲームのモッディングやサーバーの<span class="special">ガイド</span>が集まる<span class="italic">成長中の</span>リソースです！`,
        moddingGuidesHtml:
            'モッディングの<span class="special">ハウツー</span>ガイドをいくつかチェックしてみてください！',
        serverGuidesHtml:
            'サーバーの<span class="special">セットアップ</span>ガイドをいくつかチェックしてみてください！',
        prev: '前の記事',
        next: '次の記事',
    },
    zh: {
        eyebrow: '博客',
        titleHtml: '来看看我们的<span class="special">博客</span>',
        introHtml: `我们的博客是一个<span class="italic">不断壮大</span>的资源库，提供 <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>、<a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>、<a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> 等游戏的模组制作和服务器<span class="special">指南</span>！`,
        moddingGuidesHtml:
            '来看看我们的一些模组制作<span class="special">教程</span>指南！',
        serverGuidesHtml:
            '来看看我们的一些服务器<span class="special">搭建</span>指南！',
        prev: '上一批文章',
        next: '下一批文章',
    },
    pt: {
        eyebrow: 'Blog',
        titleHtml: 'Confira o Nosso <span class="special">Blog</span>',
        introHtml: `Nosso blog é um recurso <span class="italic">em crescimento</span> de <span class="special">guias</span> de modding e servidores para jogos como <a href="https://moddingcommunity.com/blog/tag/minecraft/" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta/" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2/" target="_blank" class="${A}">Left 4 Dead 2</a> e muito mais!`,
        moddingGuidesHtml:
            'Confira alguns dos nossos <span class="special">guias práticos</span> de modding!',
        serverGuidesHtml:
            'Confira alguns dos nossos <span class="special">guias de configuração</span> de servidores!',
        prev: 'Artigos anteriores',
        next: 'Próximos artigos',
    },
}
