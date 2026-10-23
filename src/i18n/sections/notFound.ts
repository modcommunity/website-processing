import type { SectionCatalog } from './types'

/**
 * The 404 page's copy.
 *
 * Unlike every other section, this one is also shipped to the browser as JSON
 * and switched client-side — see `src/pages/404.astro`. A static build emits a
 * single 404 document at the root and the host serves it for every unmatched
 * path in every language, so the locale is only knowable at request time, from
 * the URL the visitor actually asked for.
 *
 * Keep these short and free of interpolation. They are the one string set a
 * visitor may read when the rest of the site has already failed them.
 */
export const notFound: SectionCatalog = {
    en: {
        title: 'Page Not Found',
        heading: '404: Page Not Found',
        body: 'That page does not exist, or it has <span class="special">moved</span>.',
        home: 'Back to the home page',
    },
    es: {
        title: 'Página no encontrada',
        heading: '404: Página no encontrada',
        body: 'Esa página no existe o se ha <span class="special">movido</span>.',
        home: 'Volver a la página de inicio',
    },
    fr: {
        title: 'Page introuvable',
        heading: '404 : Page introuvable',
        body: `Cette page n'existe pas ou a été <span class="special">déplacée</span>.`,
        home: 'Retour à la page d\'accueil',
    },
    de: {
        title: 'Seite nicht gefunden',
        heading: '404: Seite nicht gefunden',
        body: 'Diese Seite gibt es nicht oder sie wurde <span class="special">verschoben</span>.',
        home: 'Zurück zur Startseite',
    },
    ru: {
        title: 'Страница не найдена',
        heading: '404: Страница не найдена',
        body: 'Такой страницы нет, либо её <span class="special">перенесли</span>.',
        home: 'Вернуться на главную',
    },
    nl: {
        title: 'Pagina niet gevonden',
        heading: '404: Pagina niet gevonden',
        body: 'Die pagina bestaat niet of is <span class="special">verplaatst</span>.',
        home: 'Terug naar de startpagina',
    },
    ja: {
        title: 'ページが見つかりません',
        heading: '404: ページが見つかりません',
        body: 'このページは存在しないか、<span class="special">移動</span>されました。',
        home: 'ホームページに戻る',
    },
    zh: {
        title: '页面未找到',
        heading: '404：页面未找到',
        body: '该页面不存在，或已被<span class="special">移动</span>。',
        home: '返回首页',
    },
    pt: {
        title: 'Página não encontrada',
        heading: '404: Página não encontrada',
        body: 'Essa página não existe ou foi <span class="special">movida</span>.',
        home: 'Voltar à página inicial',
    },
}
