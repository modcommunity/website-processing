import type { Scenario } from './TypedTerminal'

/**
 * Real output shapes from the CLI (captured against its test mock server).
 * Commands, flags and output are never translated; only the tab labels are.
 */
export const SCENARIOS: Omit<Scenario, 'label'>[] = [
    {
        id: 'auth',
        command: 'tmc auth whoami',
        output: [
            'profile    default',
            'site       https://moddingcommunity.com',
            'authMode   token',
            'token      tmc_ab…9f',
            'canRead    true',
            'canWrite   true',
            'canDelete  false',
        ],
    },
    {
        id: 'list',
        command: 'tmc mod list --mine',
        output: [
            ' id  name          hidden',
            ' ──  ────────────  ──────',
            ' 12  Dark UI Pack  false',
            ' 15  Night Maps    true',
        ],
    },
    {
        id: 'publish',
        command: "tmc release publish --mod 12 --version 1.2.0 --file 'dist/*.zip'",
        output: [
            'Creating release 1.2.0 on mod #12',
            'Uploading 1 file(s), 4.2 MB…',
            '  pack.zip → 8f3c1d2e (4.2 MB)',
            'Published 1.2.0 on mod #12 (release #31)',
            '  1 file(s) attached',
        ],
    },
    {
        id: 'typo',
        command: 'tmc mod update 12 --set tgs=ui',
        output: [
            "error: 'mod' has no field 'tgs'. Did you mean 'tags'?",
            "  → Run 'tmc schema mod' for the full list, or pass --allow-unknown-fields to send it anyway.",
        ],
    },
]
