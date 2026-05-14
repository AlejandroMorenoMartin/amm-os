import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../i18n';
import { projects } from '../../data/projects';
import { ProjectRow } from '../ui/ProjectRow';
import { PageTitle } from '../ui/PageTitle';

export function ProjectsPage() {
  const { expandedProject, toggleProject, lang } = useAppStore();
  const { t } = useT();
  const navigate = useNavigate();

  useEffect(() => {
    if (!expandedProject) return;
    const el = document.querySelector(`[data-slug="${expandedProject}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [expandedProject]);

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.trabajo.title}</PageTitle>

      <div className="projects-list flex flex-col">
        {projects.map((project, i) => (
          <React.Fragment key={project.slug}>
            {i > 0 && <hr className="project-divider" />}
            <ProjectRow
              project={project}
              isExpanded={expandedProject === project.slug}
              lang={lang}
              onToggle={toggleProject}
              onOpen={(slug) => navigate(`/projects/${slug}`)}
              challenge={t.trabajo.challenge}
              role={t.trabajo.role}
              goal={t.trabajo.goal}
              status={t.trabajo.status}
              expand={t.trabajo.tooltipExpand}
              collapse={t.trabajo.tooltipCollapse}
            />
          </React.Fragment>
        ))}
      </div>
    </article>
  );
}
