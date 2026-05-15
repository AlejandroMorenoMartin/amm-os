import type { Project } from '../../data/projects';
import type { Lang } from '../../store/useAppStore';
import { BtnOpen } from './BtnOpen';
import { TextBlock } from './TextBlock';

interface ProjectRowProps {
  project: Project;
  isExpanded: boolean;
  lang: Lang;
  onToggle: (slug: string) => void;
  onOpen: (slug: string) => void;
  challenge: string;
  role: string;
  expand: string;
  collapse: string;
}

export function ProjectRow({
  project, isExpanded, lang, onToggle, onOpen,
  challenge, role, expand, collapse,
}: ProjectRowProps) {
  return (
    <div className={`font-mono project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`} data-slug={project.slug}>
      <button
        onClick={() => onToggle(project.slug)}
        className="w-full text-left project-row-btn has-tooltip"
        style={{ cursor: 'pointer' }}
        aria-expanded={isExpanded}
      >
        <span className="text-txt-l project-name">{project.name}</span>
        <span className="text-txt-s italic">{project.date}</span>
        <span className="text-txt-base">{project.synopsis[lang]}</span>
        <span className="tooltip">{isExpanded ? collapse : expand}</span>
      </button>

      {isExpanded && (
        <div className="flex flex-col project-row-expanded-block" style={{ gap: 'var(--gap-section)' }}>
          <TextBlock>
            <span className="card-label">{challenge}</span>
            <span className="text-txt-base">{project.challenge[lang]}</span>
          </TextBlock>

          <TextBlock>
            <span className="card-label">{role}</span>
            <span className="text-txt-base">{project.role}</span>
          </TextBlock>

          <TextBlock>
            <span className="card-label">Responsibilities</span>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {project.responsibilities.map((r) => (
                <li key={r} className="text-txt-base">&gt; {r}</li>
              ))}
            </ul>
          </TextBlock>

          <BtnOpen onClick={() => onOpen(project.slug)} />
        </div>
      )}
    </div>
  );
}
