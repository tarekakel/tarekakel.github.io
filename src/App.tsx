import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Linkedin, Mail, Moon, Sun, FileText } from 'lucide-react'
import { content, type Lang } from '@/data/content'
import { Section } from '@/components/section'
import { Button, buttonClasses } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { Timeline } from '@/components/timeline'
import { cn } from '@/lib/utils'

function usePref<T extends string>(key: string, fallback: T): [T, (v: T) => void] {
  const [v, setV] = useState<T>(() => {
    try {
      return (localStorage.getItem(key) as T) || fallback
    } catch {
      return fallback
    }
  })
  const set = (n: T) => {
    setV(n)
    try {
      localStorage.setItem(key, n)
    } catch {
      /* ignore */
    }
  }
  return [v, set]
}

export default function App() {
  const [lang, setLang] = usePref<Lang>('lang', 'en')
  const [theme, setTheme] = usePref<'light' | 'dark'>(
    'theme',
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const t = content[lang]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const nav = [
    ['about', t.nav.about],
    ['projects', t.nav.projects],
    ['experience', t.nav.experience],
    ['skills', t.nav.skills],
    ['contact', t.nav.contact],
  ] as const

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            Tarek Akel
          </a>
          <nav className="hidden items-center gap-6 text-sm text-ink-2 md:flex" aria-label="Main">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <div className="flex rounded-md border border-line p-0.5 text-xs font-medium" role="group" aria-label="Language">
              {(['en', 'de'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={cn(
                    'rounded px-2 py-1 transition-colors',
                    lang === l ? 'bg-ink text-bg' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="h-9 w-9 px-0"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-in mx-auto max-w-6xl px-5 pb-12 pt-14 md:pb-16 md:pt-24">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="text-sm font-medium text-muted">{t.hero.title}</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
                {t.hero.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className={buttonClasses('primary')}>
                  {t.hero.cta}
                </a>
                <a href="#contact" className={buttonClasses('outline')}>
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <img
              src={`${import.meta.env.BASE_URL}tarek.png`}
              alt="Tarek Akel"
              width={160}
              height={160}
              className="order-first h-24 w-24 rounded-lg object-cover ring-1 ring-line md:order-none md:h-40 md:w-40"
            />
          </div>

          {/* Facts table — the Lebenslauf-style block German recruiters scan first */}
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {t.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 bg-surface px-5 py-4">
                <dt className="text-xs text-muted">{f.label}</dt>
                <dd className="text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* About */}
        <Section id="about" heading={t.about.heading} className="border-t border-line">
          <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink-2">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" heading={t.projects.heading} className="border-t border-line">
          <p className="max-w-2xl text-ink-2">{t.projects.intro}</p>
          <div className="mt-10 divide-y divide-line">
            {t.projects.items.map((p) => (
              <article key={p.name} className="grid gap-4 py-8 first:pt-0 md:grid-cols-[1fr_2fr] md:gap-10">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {p.role}
                    {p.status && <span className="ml-2 rounded bg-accent-soft px-1.5 py-0.5 text-xs text-accent">{p.status}</span>}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-ink-2">{p.summary}</p>
                  {p.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-[15px] text-ink-2">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-[11px] h-px w-3 shrink-0 bg-line-strong" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex flex-wrap gap-4">
                    {p.repos.map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                      >
                        <Github size={14} />
                        {r.label}
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" heading={t.experience.heading} className="border-t border-line">
          <Timeline items={t.experience.items} presentLabel={t.experience.present} />

          <div className="mt-14 border-t border-line pt-8">
            <h3 className="text-sm text-muted">{t.education.heading}</h3>
            <p className="mt-2 font-semibold">{t.education.degree}</p>
            <p className="text-ink-2">
              {t.education.school} · {t.education.period}
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" heading={t.skills.heading} className="border-t border-line">
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[140px_1fr]">
            {t.skills.groups.map((g) => (
              <div key={g.label} className="contents">
                <dt className="text-sm font-medium text-muted sm:pt-0.5">{g.label}</dt>
                <dd className="text-ink-2">{g.items}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm text-muted">{t.certifications.heading}</h3>
              <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
                {t.certifications.items.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-muted">{t.languages.heading}</h3>
              <dl className="mt-3 space-y-2 text-[15px]">
                {t.languages.items.map((l) => (
                  <div key={l.name} className="flex gap-3">
                    <dt className="w-20 shrink-0 font-medium">{l.name}</dt>
                    <dd className="text-ink-2">{l.level}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" heading={t.contact.heading} className="border-t border-line">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">{t.contact.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${t.contact.email}`} className={buttonClasses('primary')}>
              <Mail size={16} /> {t.contact.email}
            </a>
            <a href={t.contact.linkedin} target="_blank" rel="noreferrer" className={buttonClasses('outline')}>
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={t.contact.github} target="_blank" rel="noreferrer" className={buttonClasses('outline')}>
              <Github size={16} /> GitHub
            </a>
            <a href={`${import.meta.env.BASE_URL}Tarek_Akel_CV.pdf`} className={buttonClasses('outline')}>
              <FileText size={16} /> {t.contact.cv}
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-6xl px-5 text-sm text-muted">{t.footer}</p>
      </footer>
    </>
  )
}
