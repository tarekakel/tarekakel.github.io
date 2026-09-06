import { cn } from '@/lib/utils'

export function Section({
  id,
  heading,
  children,
  className,
}: {
  id: string
  heading: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-14 md:py-20', className)}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[200px_1fr] md:gap-12">
        <h2 className="text-lg font-semibold tracking-tight text-ink md:sticky md:top-24 md:self-start">
          {heading}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  )
}
