import type { SectionCatalog } from './types'

// Link class matching the site's <CLink> (accent text + hover). Inlined into the
// HTML fragments below so translated prose keeps its links.
const A = 'special hover:!text-special-1-light hover:duration-300'

export const blog: SectionCatalog = {
    en: {
        eyebrow: 'Blog',
        titleHtml: 'From The <span class="special">Blog</span>',
        introHtml:
            `Guides for <span class="special">modding</span> and running servers, for games like <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> and more.`,
        moddingGuidesHtml:
            'Some of our modding <span class="special">how-to</span> guides',
        serverGuidesHtml:
            'Some of our server <span class="special">setup</span> guides',
        prev: 'Previous articles',
        next: 'Next articles',
    },
    es: {
        eyebrow: 'Blog',
        titleHtml: 'Desde El <span class="special">Blog</span>',
        introHtml:
            `Guías de <span class="special">modding</span> y de cómo llevar servidores, para juegos como <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> y más.`,
        moddingGuidesHtml:
            'Algunas de nuestras guías de modding <span class="special">paso a paso</span>',
        serverGuidesHtml:
            'Algunas de nuestras guías de <span class="special">configuración</span> de servidores',
        prev: 'Artículos anteriores',
        next: 'Artículos siguientes',
    },
    fr: {
        eyebrow: 'Blog',
        titleHtml: 'Depuis Le <span class="special">Blog</span>',
        introHtml:
            `Des guides de <span class="special">modding</span> et d'administration de serveurs, pour des jeux comme <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> et d'autres.`,
        moddingGuidesHtml:
            'Quelques-uns de nos guides de modding <span class="special">pas à pas</span>',
        serverGuidesHtml:
            'Quelques-uns de nos guides de <span class="special">configuration</span> de serveurs',
        prev: 'Articles précédents',
        next: 'Articles suivants',
    },
    de: {
        eyebrow: 'Blog',
        titleHtml: 'Aus Dem <span class="special">Blog</span>',
        introHtml:
            `Anleitungen zum <span class="special">Modden</span> und zum Betrieb von Servern, für Spiele wie <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> und mehr.`,
        moddingGuidesHtml:
            'Einige unserer <span class="special">Modding-Anleitungen</span>',
        serverGuidesHtml:
            'Einige unserer <span class="special">Server-Einrichtungsanleitungen</span>',
        prev: 'Vorherige Artikel',
        next: 'Nächste Artikel',
    },
    ru: {
        eyebrow: 'Блог',
        titleHtml: 'Из <span class="special">Блога</span>',
        introHtml:
            `Руководства по <span class="special">моддингу</span> и запуску серверов для таких игр, как <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> и других.`,
        moddingGuidesHtml:
            'Некоторые из наших <span class="special">практических</span> руководств по моддингу',
        serverGuidesHtml:
            'Некоторые из наших руководств по <span class="special">настройке</span> серверов',
        prev: 'Предыдущие статьи',
        next: 'Следующие статьи',
    },
    nl: {
        eyebrow: 'Blog',
        titleHtml: 'Van De <span class="special">Blog</span>',
        introHtml:
            `Gidsen voor <span class="special">modding</span> en het draaien van servers, voor games als <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> en meer.`,
        moddingGuidesHtml:
            'Een paar van onze <span class="special">how-to</span>gidsen voor modding',
        serverGuidesHtml:
            'Een paar van onze <span class="special">installatie</span>gidsen voor servers',
        prev: 'Vorige artikelen',
        next: 'Volgende artikelen',
    },
    ja: {
        eyebrow: 'ブログ',
        titleHtml: '<span class="special">ブログ</span>より',
        introHtml:
            `<span class="special">MOD制作</span>とサーバー運営のガイドを、<a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>、<a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>、<a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a>などのゲーム向けに載せています。`,
        moddingGuidesHtml:
            'MOD制作の<span class="special">ハウツー</span>ガイドから',
        serverGuidesHtml:
            'サーバーの<span class="special">セットアップ</span>ガイドから',
        prev: '前の記事',
        next: '次の記事',
    },
    zh: {
        eyebrow: '博客',
        titleHtml: '来自<span class="special">博客</span>',
        introHtml:
            `面向 <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>、<a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>、<a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> 等游戏的<span class="special">模组</span>与服务器搭建指南。`,
        moddingGuidesHtml:
            '部分模组<span class="special">教程</span>',
        serverGuidesHtml:
            '部分服务器<span class="special">搭建</span>指南',
        prev: '上一批文章',
        next: '下一批文章',
    },
    pt: {
        eyebrow: 'Blog',
        titleHtml: 'Do <span class="special">Blogue</span>',
        introHtml:
            `Guias de <span class="special">modding</span> e de gestão de servidores, para jogos como <a href="https://moddingcommunity.com/blog/tag/minecraft" target="_blank" class="${A}">Minecraft</a>, <a href="https://moddingcommunity.com/blog/tag/gta" target="_blank" class="${A}">Grand Theft Auto</a>, <a href="https://moddingcommunity.com/blog/tag/l4d2" target="_blank" class="${A}">Left 4 Dead 2</a> e outros.`,
        moddingGuidesHtml:
            'Alguns dos nossos guias de modding <span class="special">passo a passo</span>',
        serverGuidesHtml:
            'Alguns dos nossos guias de <span class="special">configuração</span> de servidores',
        prev: 'Artigos anteriores',
        next: 'Próximos artigos',
    },
}
