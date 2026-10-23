import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

type Props = { command: string; copy: string; copied: string }

/** A shell command with a copy button. The command scrolls inside its own box. */
export default function CopyCommand({ command, copy, copied }: Props) {
    const [done, setDone] = useState(false)
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(command)
            setDone(true)
            window.setTimeout(() => setDone(false), 1800)
        } catch {
            /* clipboard blocked: the text is still selectable */
        }
    }
    return (
        <div className="flex min-w-0 items-stretch overflow-hidden rounded-lg border border-border bg-background/70">
            <pre className="min-w-0 flex-1 overflow-x-auto px-3 py-2.5 font-mono text-[12.5px] text-foreground/90">
                <code>{command}</code>
            </pre>
            <button
                type="button"
                onClick={onCopy}
                aria-label={copy}
                className="flex shrink-0 items-center gap-1.5 border-l border-border px-3 text-xs font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            >
                {done ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                <span aria-live="polite">{done ? copied : copy}</span>
            </button>
        </div>
    )
}
