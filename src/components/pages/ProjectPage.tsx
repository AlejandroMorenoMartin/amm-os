import { useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { projects } from '../../data/projects';
import { LinkExternal } from '../ui/LinkExternal';
import { SectionLabel } from '../ui/SectionLabel';
import { StatusChip } from '../ui/StatusChip';
import { Breadcrumb } from '../shell/Breadcrumb';
import { useT } from '../../i18n';
import { useRef } from 'react';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-txt-s" style={{ display: 'block' }}>
      {children}
    </span>
  );
}


export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, openImageModal } = useAppStore();
  const { t } = useT();
  const imgRef = useRef<HTMLImageElement>(null);

  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const sections: { key: string; label: string; content: string }[] = [
    { key: 'research',  label: 'RESEARCH',  content: project.research[lang] },
    { key: 'decisions', label: 'DECISIONS', content: project.decisions[lang] },
    { key: 'system',    label: 'SYSTEM',    content: project.system[lang] },
    { key: 'lessons',   label: 'LESSONS',   content: project.lessons[lang] },
  ];

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>

      <Breadcrumb />

      {/* Bloque 1 — Identidad */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <h1 className="text-txt-xl">{'> '}{project.name}</h1>
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.manifesto}</FieldLabel>
          <span className="text-txt-base">{project.manifesto[lang]}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.challenge}</FieldLabel>
          <span className="text-txt-base">{project.challenge[lang]}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.role}</FieldLabel>
          <span className="text-txt-base">{project.role}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.goal}</FieldLabel>
          <span className="text-txt-base">{project.goal[lang]}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.colFecha}</FieldLabel>
          <span className="text-txt-base">{project.date}</span>
        </div>

        <div className="flex flex-col items-start" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.status}</FieldLabel>
          <StatusChip status={project.status} />
        </div>
        <button
          className="photo-btn photo-btn--full btn-no-focus"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label={t.project.openImage}
          onClick={() => {
            const el = imgRef.current;
            openImageModal({
              src: project.image,
              title: `${project.name} — overview`,
              width: el?.naturalWidth ?? 0,
              height: el?.naturalHeight ?? 0,
            });
          }}
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={`${project.name} overview`}
            className="photo-border w-full"
            style={{ display: 'block' }}
          />
        </button>
      </div>

      <hr className="project-divider" />

      {/* Bloque 2 — Narrativa */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
        {sections.map((s) => (
          <div key={s.key} className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
            <SectionLabel>{s.label}</SectionLabel>
            <span className="text-txt-base">{s.content}</span>
          </div>
        ))}
      </div>

      <hr className="project-divider" />

      {/* Bloque 3 — Ficha + Recursos */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.ownership}</FieldLabel>
          <span className="text-txt-base">{project.ownership}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.metrics}</FieldLabel>
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {project.metrics.map((m, i) => (
              <p key={i} className="text-txt-base">
                <span className="kpi">{m.value}</span>
                <span style={{ color: 'var(--color-zinc-600)' }}> — </span>
                {m.description[lang]}
              </p>
            ))}
          </div>
        </div>

        {(project.resources.github || project.resources.live) && (
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <FieldLabel>{t.project.resources}</FieldLabel>
            {project.resources.github && (
              project.resources.disabled?.includes('github') ? (
                <span className="text-txt-base link-disabled">
                  {project.resources.github.replace('https://', '')}
                </span>
              ) : (
                <LinkExternal href={project.resources.github}>
                  {project.resources.github.replace('https://', '')}
                </LinkExternal>
              )
            )}
            {project.resources.live && (
              project.resources.disabled?.includes('live') ? (
                <span className="text-txt-base link-disabled">
                  {project.resources.live.replace('https://', '')}
                </span>
              ) : (
                <LinkExternal href={project.resources.live}>
                  {project.resources.live.replace('https://', '')}
                </LinkExternal>
              )
            )}
          </div>
        )}
      </div>

    </article>
  );
}
