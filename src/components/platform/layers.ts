import type { TFunc } from '../../i18n/t'
import type { Layer } from './StackDiagram'

/** The three stack layers, translated. Shared by /platform and the home-page teaser. */
export function stackLayers(t: TFunc): Layer[] {
    const p = (k: string) => t(`landing.platformPage.${k}`)
    return [
        {
            id: 'game',
            title: p('gameTitle'),
            tag: p('gameTag'),
            body: p('gameBody'),
            items: [p('gameI1'), p('gameI2'), p('gameI3')],
        },
        {
            id: 'dot',
            title: p('dotTitle'),
            tag: p('dotTag'),
            body: p('dotBody'),
            items: [p('dotI1'), p('dotI2'), p('dotI3'), p('dotI4')],
        },
        {
            id: 'tmc',
            title: p('tmcTitle'),
            tag: p('tmcTag'),
            body: p('tmcBody'),
            items: [p('tmcI1'), p('tmcI2'), p('tmcI3')],
        },
    ]
}
