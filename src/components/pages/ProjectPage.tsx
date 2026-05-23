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
  return <span className="card-label" style={{ display: 'block' }}>{children}</span>;
}


export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, openImageModal } = useAppStore();
  const { t } = useT();
  const imgRef = useRef<HTMLImageElement>(null);

  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const sections: { key: string; label: string; content: string }[] = [
    { key: 'research',  label: t.project.sectionResearch,  content: project.research[lang] },
    { key: 'decisions', label: t.project.sectionDecisions, content: project.decisions[lang] },
    { key: 'system',    label: t.project.sectionSystem,    content: project.system[lang] },
    { key: 'lessons',   label: t.project.sectionLessons,   content: project.lessons[lang] },
  ];

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>

      <Breadcrumb />

      {/* Bloque 1 — Identidad */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <h1 className="text-txt-xxl">{'> '}{project.name}</h1>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.update}</FieldLabel>
          <span className="text-txt-base">{project.date}</span>
        </div>

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.trabajo.overview}</FieldLabel>
          <span className="text-txt-base">{project.synopsis[lang]}</span>
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
          <FieldLabel>{t.trabajo.responsibilities}</FieldLabel>
          <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {project.responsibilities.map((r) => (
              <li key={r.en} className="text-txt-base"><span>&gt;</span> {r[lang]}</li>
            ))}
          </ul>
        </div>

        <button
          className="photo-btn photo-btn--full btn-no-focus has-tooltip"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label={t.project.openImage}
          data-sound="interactive"
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
          <span className="tooltip">{t.modal.open}</span>
        </button>
      </div>

      <hr className="project-divider" />

      {/* Bloque 2 — Narrativa */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        {sections.map((s) => (
          <div key={s.key} className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
            <SectionLabel>{s.label}</SectionLabel>
            <span className="text-txt-base">{s.content}</span>
          </div>
        ))}
      </div>

      <hr className="project-divider" />

      {/* Bloque 3 — Meta */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <div className="flex flex-col items-start" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.status}</FieldLabel>
          <StatusChip status={project.status} />
        </div>

        {project.metrics.length > 0 && (
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <FieldLabel>{t.project.metrics}</FieldLabel>
            <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
              {project.metrics.map((m) => (
                <span key={m.value} className="chip metric-chip">{m.value} · {m.label[lang]}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <FieldLabel>{t.project.tools}</FieldLabel>
          <span className="text-txt-base">{project.tools.join(', ')}</span>
        </div>

        {(project.resources.github || project.resources.live) && (
          <div className="flex flex-col text-txt-base" style={{ gap: 'var(--gap-block)' }}>
            <FieldLabel>{t.project.resources}</FieldLabel>
            {project.resources.github && (
              project.resources.disabled?.includes('github') ? (
                <span className="text-txt-base link-disabled">
                  {project.resources.github.replace('https://', '')}
                </span>
              ) : (
                <LinkExternal href={project.resources.github} tooltip={t.project.tooltipGithub}>
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
                <LinkExternal href={project.resources.live} tooltip={t.project.tooltipLive}>
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
