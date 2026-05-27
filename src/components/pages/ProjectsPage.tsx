import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../i18n';
import { usePageTitle } from '../../hooks/usePageTitle';
import { projects } from '../../data/projects';
import { ProjectRow } from '../ui/ProjectRow';
import { SectionLabel } from '../ui/SectionLabel';

export function ProjectsPage() {
  usePageTitle('Lab');
  const { t } = useT();
  const navigate = useNavigate();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const toggle = (slug: string) => setOpenSlug((s) => (s === slug ? null : slug));

  const freelance = projects.filter((p) => p.category === 'freelance');
  const personal = projects.filter((p) => p.category === 'personal');

  function renderSection(list: typeof projects, title: string) {
    return (
      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <SectionLabel>{title}</SectionLabel>
        <div className="projects-list flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          {list.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              isExpanded={openSlug === project.slug}
              onToggle={toggle}
              onOpen={(slug) => navigate(`/projects/${slug}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      {renderSection(freelance, t.trabajo.sectionFreelance)}
      {renderSection(personal, t.trabajo.sectionPersonal)}
    </article>
  );
}
