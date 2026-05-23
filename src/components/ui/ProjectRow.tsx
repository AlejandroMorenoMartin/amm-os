import type { Project } from '../../data/projects';
import type { Lang } from '../../store/useAppStore';
import { BtnOpen } from './BtnOpen';

interface ProjectRowProps {
  project: Project;
  isExpanded: boolean;
  lang: Lang;
  onToggle: (slug: string) => void;
  onOpen: (slug: string) => void;
  challenge: string;
  role: string;
  responsibilities: string;
  metrics: string;
  update: string;
  overview: string;
}

export function ProjectRow({
  project, isExpanded, lang, onToggle, onOpen,
  challenge, role, responsibilities, metrics, update, overview,
}: ProjectRowProps) {
  return (
    <div className={`font-mono project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`} data-slug={project.slug}>
      <button
        onClick={() => onToggle(project.slug)}
        className="project-row-btn"
        aria-expanded={isExpanded}
        data-sound="interactive"
      >
        <div className="flex items-center justify-between" style={{ gap: '1rem' }}>
          <span className="project-name" style={{ fontSize: '14px', textTransform: 'none' }}>{project.name}</span>
          <span className="project-name" style={{ fontSize: '14px', textTransform: 'none', flexShrink: 0 }}>{isExpanded ? '[-]' : '[+]'}</span>
        </div>
      </button>

      {isExpanded && (
        <div className="flex flex-col project-row-expanded-block" style={{ gap: '1rem', padding: '0.5rem 1rem 1rem' }}>
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{update}</span>
            <span className="text-txt-base">{project.date}</span>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{overview}</span>
            <span className="text-txt-base">{project.synopsis[lang]}</span>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{role}</span>
            <span className="text-txt-base">{project.role}</span>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{challenge}</span>
            <span className="text-txt-base">{project.challenge[lang]}</span>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{responsibilities}</span>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {project.responsibilities.map((r) => (
                <li key={r.en} className="text-txt-base"><span>&gt;</span> {r[lang]}</li>
              ))}
            </ul>
          </div>

          {project.metrics.length > 0 && (
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{metrics}</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
                {project.metrics.map((m) => (
                  <span key={m.value} className="chip metric-chip">{m.value} · {m.label[lang]}</span>
                ))}
              </div>
            </div>
          )}

          <BtnOpen onClick={() => onOpen(project.slug)} />
        </div>
      )}
    </div>
  );
}
