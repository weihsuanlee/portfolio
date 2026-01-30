import Image from 'next/image'

import ThemeToggle from '@/components/ThemeToggle'
import cv from '@/data/cv.json'

type ActionVariant = 'glass' | 'accent'

const IconBadge = ({ src, alt }: { src: string; alt: string }) => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--surface-border)] bg-white/70 p-0.5 shadow-sm">
    <Image src={src} alt={alt} width={40} height={40} className="h-full w-full rounded-full object-cover" />
  </span>
)

const SkillIcon = ({ src, alt }: { src: string; alt: string }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--surface-border)] bg-white/70 p-0.5">
    <span className="flex h-full w-full items-center justify-center rounded-full bg-white/90">
      <Image src={src} alt={alt} width={18} height={18} className="object-contain" />
    </span>
  </span>
)

const ActionLink = ({
  href,
  label,
  icon,
  variant = 'glass',
}: {
  href: string
  label: string
  icon?: string
  variant?: ActionVariant
}) => (
  <a
    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
      variant === 'accent' ? 'bg-[color:var(--accent)] text-slate-900' : 'glass'
    }`}
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noreferrer' : undefined}
  >
    {icon && <Image src={icon} alt="" width={14} height={14} className="action-icon object-contain" />}
    <span>{label}</span>
  </a>
)

export default function Home() {
  return (
    <main className="px-6 pb-20 pt-10 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">{cv.hero.role}</p>
            <h1 className="heading text-3xl font-semibold sm:text-4xl">{cv.hero.name}</h1>
            <p className="text-sm text-muted">{cv.hero.locationLine}</p>
          </div>
          <ThemeToggle />
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Profile</p>
            <h2 className="heading mt-4 text-4xl font-semibold sm:text-5xl">{cv.hero.headline}</h2>
            <p className="mt-4 text-lg text-muted">{cv.hero.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--surface-border)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{cv.hero.workAuthorization.label}</p>
                <p className="mt-2 text-sm text-muted">{cv.hero.workAuthorization.details}</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--surface-border)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{cv.hero.contact.label}</p>
                <p className="mt-2 text-sm font-semibold">{cv.hero.contact.phone}</p>
                <p className="text-sm font-semibold">{cv.hero.contact.email}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {cv.hero.links.map((link) => (
                <ActionLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  variant={(link.variant as ActionVariant) || 'glass'}
                />
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="flex items-start gap-6">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-[color:var(--surface-border)]">
                <Image src={cv.focus.image.src} alt={cv.focus.image.alt} fill className="object-cover" sizes="112px" priority />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">{cv.focus.title}</p>
                <h3 className="heading mt-2 text-2xl font-semibold">{cv.focus.headline}</h3>
                <p className="mt-3 text-sm text-muted">{cv.focus.summary}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-[color:var(--surface-border)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{cv.focus.hometownLabel}</p>
              <p className="mt-2 text-sm text-muted">{cv.focus.hometownSummary}</p>
            </div>
          </div>
        </section>

        <section className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Skills</p>
              <h2 className="heading mt-2 text-3xl font-semibold">Tooling & Stack</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cv.skills.map((group) => (
              <div key={group.title} className="rounded-2xl border border-[color:var(--surface-border)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 rounded-full border border-[color:var(--surface-border)] px-3 py-2 text-xs font-semibold text-[color:var(--text-primary)]"
                    >
                      <SkillIcon src={item.icon} alt={`${item.name} icon`} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Experience</p>
              <h2 className="heading mt-2 text-3xl font-semibold">Recent Roles</h2>
            </div>
            <p className="text-sm text-muted">Shipped production UI across fintech, events, and AI platforms.</p>
          </div>

          <div className="mt-8 space-y-6">
            {cv.experience.map((role) => (
              <div key={`${role.company}-${role.title}`} className="rounded-2xl border border-[color:var(--surface-border)] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <IconBadge src={role.companyIcon.src} alt={role.companyIcon.alt} />
                    <div>
                      <h3 className="heading text-xl font-semibold">{role.title}</h3>
                      <p className="text-sm text-muted">
                        {role.company} · {role.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">{role.date}</p>
                </div>
                {role.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {role.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {cv.projects.map((project) => (
            <div key={project.title} className="glass rounded-3xl p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Project</p>
                  <h3 className="heading mt-2 text-2xl font-semibold">{project.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {project.link && (
                    <a
                      className="flex items-center gap-1 transition-opacity hover:opacity-70"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View GitHub repo"
                    >
                      <Image src="/icon-github.svg" alt="" width={14} height={14} className="action-icon object-contain" />
                      Repo
                    </a>
                  )}
                  {project.demo && (
                    <a
                      className="flex items-center gap-1 transition-opacity hover:opacity-70"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open live demo"
                    >
                      <Image src="/icon-link.svg" alt="" width={14} height={14} className="action-icon object-contain" />
                      Demo
                    </a>
                  )}
                  {project.video && (
                    <a
                      className="flex items-center gap-1 transition-opacity hover:opacity-70"
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Watch video demo"
                    >
                      <Image src="/icon-video.svg" alt="" width={14} height={14} className="action-icon object-contain" />
                      Video
                    </a>
                  )}
                </div>
              </div>
              {project.image && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--surface-border)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={640}
                    height={360}
                    className="h-56 w-full object-cover object-top sm:h-64"
                  />
                </div>
              )}
              <p className="mt-4 text-sm text-muted">{project.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {project.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Education</p>
            <h2 className="heading mt-3 text-3xl font-semibold">Academic Background</h2>
            <div className="mt-6 space-y-4 text-sm text-muted">
              {cv.education.map((item) => (
                <div key={item.school} className="flex items-center gap-4 rounded-2xl border border-[color:var(--surface-border)] p-5">
                  <IconBadge src={item.icon.src} alt={item.icon.alt} />
                  <div>
                    <p className="font-semibold text-[color:var(--text-primary)]">{item.school}</p>
                    <p>{item.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Languages</p>
            <h2 className="heading mt-3 text-3xl font-semibold">Speaking + Writing</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {cv.languages.map((language) => (
                <div
                  key={language}
                  className="rounded-2xl border border-[color:var(--surface-border)] px-4 py-3 text-sm text-muted"
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Honors</p>
              <h2 className="heading mt-2 text-3xl font-semibold">Recognition</h2>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-muted">
            {cv.honors.map((honor) => (
              <div key={honor} className="flex items-center gap-3 rounded-2xl border border-[color:var(--surface-border)] p-5">
                {honor === 'Excellent Chinese Composition Example (1 of 10 out of 142,129 examinees on GSAT)' && (
                  <Image
                    src="/icon-writing.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="action-icon shrink-0 object-contain"
                  />
                )}
                {honor === 'Atlanta Hawks Employee of the Year (Season 2017 - 2018)' && (
                  <Image src="/atlanta-hawks.png" alt="" width={22} height={22} className="shrink-0 rounded-full object-cover" />
                )}
                <span>{honor}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
