import type { Project } from '../../data/projects';
import type { Lang } from '../../store/useAppStore';
import { BtnOpen } from './BtnOpen';
import { TextBlock } from './TextBlock';
import { StatusChip } from './StatusChip';

interface ProjectRowProps {
  project: Project;
  isExpanded: boolean;
  lang: Lang;
  onToggle: (slug: string) => void;
  onOpen: (slug: string) => void;
  challenge: string;
  role: string;
  goal: string;
  status: string;
  expand: string;
  collapse: string;
}

export function ProjectRow({
  project, isExpanded, lang, onToggle, onOpen,
  challenge, role, goal, status, expand, collapse,
}: ProjectRowProps) {
  return (
    <div className={`font-mono project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`} data-slug={project.slug}>
      <button
        onClick={() => onToggle(project.slug)}
        className="w-full text-left project-row-btn has-tooltip"
        style={{ background: 'none', cursor: 'pointer' }}
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
            <span className="text-txt-s">{challenge}</span>
            <span className="text-txt-base">{project.challenge[lang]}</span>
          </TextBlock>

          <TextBlock>
            <span className="text-txt-s">{role}</span>
            <span className="text-txt-base">{project.role}</span>
          </TextBlock>

          <TextBlock>
            <span className="text-txt-s">{goal}</span>
            <span className="text-txt-base">{project.goal[lang]}</span>
          </TextBlock>

          <TextBlock>
            <span className="text-txt-s">{status}</span>
            <StatusChip status={project.status} />
          </TextBlock>

          <BtnOpen onClick={() => onOpen(project.slug)} />
        </div>
      )}
    </div>
  );
}
