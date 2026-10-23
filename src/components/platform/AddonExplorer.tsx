import { useMemo, useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'

export type Addon = { id: string; cat: string; desc: string }

type Props = {
    addons: Addon[]
    cats: { id: string; label: string }[]
    org: string
    labels: { search: string; all: string; empty: string; count: string; open: string }
}

/** Category chips plus a text search over the curated addon list. */
export default function AddonExplorer({ addons, cats, org, labels }: Props) {
    const [cat, setCat] = useState('all')
    const [q, setQ] = useState('')

    const shown = useMemo(() => {
        const needle = q.trim().toLowerCase()
        return addons.filter(
            (a) =>
                (cat === 'all' || a.cat === cat) &&
                (!needle || a.id.includes(needle) || a.desc.toLowerCase().includes(needle))
        )
    }, [addons, cat, q])

    const chip = (id: string, label: string) => (
        <button
            key={id}
            type="button"
            aria-pressed={cat === id}
            onClick={() => setCat(id)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                cat === id
                    ? 'border-accent/60 bg-accent/15 text-foreground'
                    : 'border-border bg-surface text-muted hover:border-accent/30 hover:text-foreground'
            }`}
        >
            {label}
        </button>
    )

    return (
        <div className="@container flex min-w-0 flex-col gap-5">
            <div className="flex min-w-0 flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                <div className="flex flex-wrap gap-2">
                    {chip('all', labels.all)}
                    {cats.map((c) => chip(c.id, c.label))}
                </div>
                <label className="relative block w-full min-w-0 @3xl:w-64">
                    <span className="sr-only">{labels.search}</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={labels.search}
                        className="w-full rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent"
                    />
                </label>
            </div>

            <p className="text-xs text-muted" aria-live="polite">
                {labels.count.replace('{n}', String(shown.length))}
            </p>

            {shown.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">{labels.empty}</p>
            ) : (
                <ul className="grid min-w-0 grid-cols-1 gap-3 @3xl:grid-cols-2 @5xl:grid-cols-3">
                    {shown.map((a) => (
                        <li key={a.id} className="min-w-0">
                            <a
                                href={`${org}/${a.id}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${a.id}, ${labels.open}`}
                                className="group flex h-full min-w-0 flex-col gap-1 rounded-xl border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                                <span className="flex items-center justify-between gap-2">
                                    <code className="truncate text-sm font-semibold text-accent">{a.id}</code>
                                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                                </span>
                                <span className="text-sm text-muted">{a.desc}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
