import type { Project } from '../../data/projects';
import type { Lang } from '../../store/useAppStore';
import { BtnOpen } from './BtnOpen';
import { AccordionCard } from './AccordionCard';

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
    <AccordionCard id={project.slug} open={isExpanded} onToggle={onToggle} label={project.name}>
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
      <div onClick={(e) => e.stopPropagation()}>
        <BtnOpen onClick={() => onOpen(project.slug)} />
      </div>
    </AccordionCard>
  );
}
