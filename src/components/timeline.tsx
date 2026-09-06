import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import type { Job } from '@/data/content'
import { Flag } from '@/components/flag'
import { cn } from '@/lib/utils'

/**
 * Experience timeline.
 *
 * - A vertical rail that fills with the accent colour as the reader scrolls
 *   through the section (the fill tracks the viewport, so each entry "lights up"
 *   as it comes into view).
 * - Period labels sit in a left column and stick while their entry scrolls.
 * - Company flag next to the company name; the current role gets a live dot.
 */
export function Timeline({ items, presentLabel }: { items: Job[]; presentLabel: string }) {
  const ref = useRef<HTMLOListElement>(null)
  const [progress, setProgress] = useState(0)
  const [lit, setLit] = useState<boolean[]>(() => items.map(() => false))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      // The fill reaches a point on the rail when that point passes ~40% down the viewport.
      const anchor = window.innerHeight * 0.4
      const p = (anchor - r.top) / r.height
      setProgress(Math.min(1, Math.max(0, p)))
      const dots = el.querySelectorAll<HTMLElement>('[data-dot]')
      setLit(Array.from(dots, (d) => d.getBoundingClientRect().top + 8 <= anchor))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items.length])

  return (
    <ol ref={ref} className="relative">
      {/* Rail: base line + accent fill that grows with scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 top-0 left-[7px] w-px bg-line md:left-[calc(11rem+7px)]"
      >
        <div
          className="absolute left-0 top-0 w-full"
          style={{
            height: `${progress * 100}%`,
            background: 'linear-gradient(to bottom, var(--color-accent) calc(100% - 48px), transparent)',
          }}
        />
      </div>

      {items.map((j, i) => {
        const isCurrent = i === 0
        const on = lit[i]
        return (
          <li
            key={j.company + j.period}
            className="relative grid gap-3 pb-12 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            {/* Period (sticky on desktop) */}
            <div className="pl-7 md:sticky md:top-24 md:self-start md:pl-0 md:pr-8 md:text-right">
              <p className={cn('whitespace-nowrap text-sm tabular-nums transition-colors duration-500', on ? 'text-ink' : 'text-muted')}>
                {j.period}
              </p>
              {isCurrent && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  {presentLabel}
                </p>
              )}
            </div>

            {/* Dot on the rail */}
            <span
              aria-hidden
              data-dot
              className={cn(
                'absolute left-0 top-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full border bg-bg transition-all duration-500 md:left-[11rem]',
                on ? 'border-accent shadow-[0_0_0_4px_var(--color-accent-soft)]' : 'border-line-strong',
              )}
            >
              <span
                className={cn(
                  'h-[7px] w-[7px] rounded-full transition-colors duration-500',
                  on ? 'bg-accent' : 'bg-line-strong',
                )}
              />
            </span>

            {/* Card */}
            <article
              className={cn(
                'rounded-lg border bg-surface p-5 transition-colors duration-500 md:p-6',
                on ? 'border-line-strong/70' : 'border-line',
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight">{j.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-ink-2">
                    <Flag code={j.country} />
                    <span className="font-medium">{j.company}</span>
                  </p>
                </div>
                <p className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} className="shrink-0" />
                  {j.location}
                </p>
              </div>

              <ul className="mt-4 max-w-2xl space-y-2 text-[15px] leading-relaxed text-ink-2">
                {j.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        )
      })}
    </ol>
  )
}
