import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:opacity-90',
  outline: 'border border-line-strong text-ink hover:bg-surface',
  ghost: 'text-ink-2 hover:text-ink hover:bg-tag',
}

export function buttonClasses(variant: Variant = 'primary', className?: string) {
  return cn(
    'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors',
    styles[variant],
    className,
  )
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(({ className, variant = 'primary', ...props }, ref) => (
  <button ref={ref} className={buttonClasses(variant, className)} {...props} />
))
Button.displayName = 'Button'
