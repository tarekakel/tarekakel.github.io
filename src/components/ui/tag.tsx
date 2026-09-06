import { cn } from '@/lib/utils'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-block rounded bg-tag px-2 py-0.5 text-xs font-medium text-ink-2', className)}>
      {children}
    </span>
  )
}
