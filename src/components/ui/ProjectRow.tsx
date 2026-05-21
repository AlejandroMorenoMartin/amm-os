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
}

export function ProjectRow({
  project, isExpanded, lang, onToggle, onOpen,
  challenge, role, responsibilities, metrics,
}: ProjectRowProps) {
  return (
    <div className={`font-mono project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`} data-slug={project.slug}>
      <button
        onClick={() => onToggle(project.slug)}
        className="w-full text-left project-row-btn"
        style={{ cursor: 'pointer' }}
        aria-expanded={isExpanded}
      >
        <span className="text-txt-base project-name">{project.name}</span>
        <span className="text-txt-s italic">{project.date}</span>
        <span className="text-txt-base">{project.synopsis[lang]}</span>
      </button>

      {isExpanded && (
        <div className="flex flex-col project-row-expanded-block" style={{ gap: 'var(--gap-section)' }}>
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{challenge}</span>
            <span className="text-txt-base">{project.challenge[lang]}</span>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{role}</span>
            <span className="text-txt-base">{project.role}</span>
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
