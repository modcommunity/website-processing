/**
 * What the /platform page lists, as data. Names, repository paths and category
 * ids live here and are never translated; every sentence is a key in
 * `i18n/sections/platformPage.ts` (`landing.platformPage.*`).
 *
 * Every repository named here was checked for an MIT `LICENSE` file on
 * x-tmc-dev02 (`~/godot/<repo>/LICENSE`) and for a public GitHub page. A
 * repository without a licence file does not get listed (`dot-bot-learn` is
 * the one that does not have one).
 */

export const ADDONS_ORG = 'https://github.com/modcommunity'
export const GAMES_ORG = 'https://github.com/zees-games'

export type AddonCat =
    | 'core'
    | 'accounts'
    | 'servers'
    | 'safety'
    | 'social'
    | 'gameplay'
    | 'world'
    | 'content'
    | 'tools'

export const ADDON_CATS: AddonCat[] = [
    'core',
    'accounts',
    'servers',
    'safety',
    'social',
    'gameplay',
    'world',
    'content',
    'tools',
]

/** `id` is the repository name and the suffix of its description key. */
export const ADDONS: { id: string; cat: AddonCat }[] = [
    { id: 'dot-core', cat: 'core' },
    { id: 'dot-net', cat: 'core' },
    { id: 'dot-game', cat: 'core' },

    { id: 'dot-auth', cat: 'accounts' },
    { id: 'dot-user-avatar', cat: 'accounts' },
    { id: 'dot-platform', cat: 'accounts' },

    { id: 'dot-server', cat: 'servers' },
    { id: 'dot-server-deploy', cat: 'servers' },
    { id: 'dot-server-query', cat: 'servers' },
    { id: 'dot-browser', cat: 'servers' },
    { id: 'dot-sql', cat: 'servers' },

    { id: 'dot-moderation', cat: 'safety' },
    { id: 'dot-server-security', cat: 'safety' },
    { id: 'dot-replay', cat: 'safety' },

    { id: 'dot-party', cat: 'social' },
    { id: 'dot-matchmaking', cat: 'social' },
    { id: 'dot-friends', cat: 'social' },
    { id: 'dot-chat', cat: 'social' },
    { id: 'dot-voice', cat: 'social' },
    { id: 'dot-leaderboard', cat: 'social' },

    { id: 'dot-player-controller', cat: 'gameplay' },
    { id: 'dot-combat', cat: 'gameplay' },
    { id: 'dot-match', cat: 'gameplay' },
    { id: 'dot-vehicle', cat: 'gameplay' },
    { id: 'dot-bot', cat: 'gameplay' },

    { id: 'dot-map', cat: 'world' },
    { id: 'dot-props', cat: 'world' },
    { id: 'dot-lighting', cat: 'world' },

    { id: 'dot-cloud', cat: 'content' },
    { id: 'dot-ci', cat: 'content' },
    { id: 'dot-game-template', cat: 'content' },
    { id: 'dot-locale', cat: 'content' },

    { id: 'dot-bootstrap', cat: 'tools' },
    { id: 'dot-serve', cat: 'tools' },
]

/** `repo` is the path under {@link GAMES_ORG}; it differs from the folder name for two minigames. */
export const GAMES: { id: string; repo: string }[] = [
    { id: 'game-arena', repo: 'game-arena' },
    { id: 'game-playground', repo: 'game-playground' },
    { id: 'game-g2gfast', repo: 'game-g2gfast' },
    { id: 'game-hungario', repo: 'game-hungario' },
    { id: 'game-hide-n-seek', repo: 'game-hide-n-seek' },
    { id: 'mg-prop-hunt', repo: 'game-prop-hunt' },
    { id: 'mg-deathrun', repo: 'game-deathrun' },
    { id: 'mg-smash-copter', repo: 'mg-smash-copter' },
    { id: 'mg-wipeout', repo: 'mg-wipeout' },
    { id: 'mg-buses-from-hell', repo: 'mg-buses-from-hell' },
    { id: 'mg-dangerous-delivery', repo: 'mg-dangerous-delivery' },
]

/**
 * Projects built on the platform. Adding one is a new entry here plus its
 * `proj.<id>.*` keys (`name` is not translated; `desc`, `goalsTitle` and
 * `g1`..`g<goals>` are) in all nine locales.
 */
export const PROJECTS: {
    id: string
    name: string
    site: string
    goalsHref?: string
    repoHref: string
    license: string
    goals: number
}[] = [
    {
        id: 'zees',
        name: "Zee's Games",
        site: 'https://zeesgames.com',
        goalsHref: 'https://zeesgames.com/goals',
        repoHref: GAMES_ORG,
        license: 'MIT',
        goals: 8,
    },
]
