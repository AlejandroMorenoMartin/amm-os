import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../i18n';
import { projects } from '../../data/projects';
import { ProjectRow } from '../ui/ProjectRow';
import { SectionLabel } from '../ui/SectionLabel';

export function ProjectsPage() {
  const { lang } = useAppStore();
  const { t } = useT();
  const navigate = useNavigate();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const toggle = (slug: string) => setOpenSlug((s) => (s === slug ? null : slug));

  const freelance = projects.filter((p) => p.category === 'freelance');
  const personal = projects.filter((p) => p.category === 'personal');

  function renderSection(list: typeof projects, title: string) {
    return (
      <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{title}</SectionLabel>
        <div className="projects-list flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          {list.map((project) => (
            <React.Fragment key={project.slug}>
              <ProjectRow
                project={project}
                isExpanded={openSlug === project.slug}
                lang={lang}
                onToggle={toggle}
                onOpen={(slug) => navigate(`/projects/${slug}`)}
                challenge={t.trabajo.challenge}
                role={t.trabajo.role}
                responsibilities={t.trabajo.responsibilities}
                metrics={t.project.metrics}
                update={t.project.update}
                overview={t.trabajo.overview}
              />
            </React.Fragment>
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
