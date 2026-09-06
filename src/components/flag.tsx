import { cn } from '@/lib/utils'

export type CountryCode = 'AE' | 'SY' | 'DE'

const names: Record<CountryCode, string> = {
  AE: 'United Arab Emirates',
  SY: 'Syria',
  DE: 'Germany',
}

/**
 * Small inline SVG flags (no emoji — those render inconsistently on Windows).
 * 4:3 aspect ratio, rendered at 20×15 by default.
 */
export function Flag({ code, className }: { code: CountryCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 12 9"
      role="img"
      aria-label={names[code]}
      className={cn('h-[15px] w-5 shrink-0 rounded-[3px] ring-1 ring-black/10 dark:ring-white/10', className)}
    >
      <title>{names[code]}</title>
      {code === 'AE' && (
        <>
          <rect width="12" height="3" fill="#00732f" />
          <rect y="3" width="12" height="3" fill="#ffffff" />
          <rect y="6" width="12" height="3" fill="#000000" />
          <rect width="3" height="9" fill="#ff0000" />
        </>
      )}
      {code === 'SY' && (
        <>
          <rect width="12" height="3" fill="#11ce5a" />
          <rect y="3" width="12" height="3" fill="#ffffff" />
          <rect y="6" width="12" height="3" fill="#000000" />
          <Star cx={3} cy={4.5} />
          <Star cx={6} cy={4.5} />
          <Star cx={9} cy={4.5} />
        </>
      )}
      {code === 'DE' && (
        <>
          <rect width="12" height="3" fill="#000000" />
          <rect y="3" width="12" height="3" fill="#08d58d" />
          <rect y="6" width="12" height="3" fill="#ffce00" />
        </>
      )}
    </svg>
  )
}

function Star({ cx, cy }: { cx: number; cy: number }) {
  const r = 0.95
  const pts = Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 === 0 ? r : r * 0.4
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    return `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`
  }).join(' ')
  return <polygon points={pts} fill="#ff0000" />
}
