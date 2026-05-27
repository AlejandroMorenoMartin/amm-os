import { useState } from 'react';
import { useT } from '../../i18n';
import { SectionLabel } from '../ui/SectionLabel';
import { LinkExternal } from '../ui/LinkExternal';
import { AccordionCard } from '../ui/AccordionCard';
import type { Strings } from '../../i18n/types';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ResumePage() {
  usePageTitle('Resume');
  const { t } = useT();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey((k) => (k === key ? null : key));

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <section className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <SectionLabel>{t.cv.experiencia}</SectionLabel>
        <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          <CVEntry t={t} prefix="exp1" open={openKey === 'exp1'} onToggle={toggle} />
          <CVEntry t={t} prefix="exp2" open={openKey === 'exp2'} onToggle={toggle} />
          <CVEntry t={t} prefix="exp3" open={openKey === 'exp3'} onToggle={toggle} />
          <CVEntry t={t} prefix="exp4" open={openKey === 'exp4'} onToggle={toggle} />
        </div>
      </section>

      <section className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <SectionLabel>{t.cv.educacion}</SectionLabel>
        <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          <EduEntry t={t} prefix="edu4" open={openKey === 'edu4'} onToggle={toggle} />
          <EduEntry t={t} prefix="edu1" open={openKey === 'edu1'} onToggle={toggle} />
          <EduEntry t={t} prefix="edu2" open={openKey === 'edu2'} onToggle={toggle} />
          <EduEntry t={t} prefix="edu3" open={openKey === 'edu3'} onToggle={toggle} />
        </div>
      </section>
    </article>
  );
}

function CVEntry({ t, prefix, open, onToggle }: { t: Strings; prefix: string; open: boolean; onToggle: (key: string) => void }) {
  const p = prefix as 'exp1' | 'exp2' | 'exp3' | 'exp4';
  const role = t.cv[`${p}Role` as keyof typeof t.cv] as string;
  const period = t.cv[`${p}Period` as keyof typeof t.cv] as string;
  const company = t.cv[`${p}Company` as keyof typeof t.cv] as string;
  const companyUrl = t.cv[`${p}CompanyUrl` as keyof typeof t.cv] as string;
  const description = t.cv[`${p}Desc` as keyof typeof t.cv] as string;
  const skills = t.cv[`${p}Skills` as keyof typeof t.cv] as string[];
  const tools = t.cv[`${p}Tools` as keyof typeof t.cv] as string[];
  const kpis = t.cv[`${p}Kpis` as keyof typeof t.cv] as { value: string; label: string }[];

  return (
    <AccordionCard id={prefix} open={open} onToggle={onToggle} label={role}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.labelPeriod}</span>
        <span className="text-txt-base">{period}</span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.labelCompany}</span>
        <span className="text-txt-base"><LinkExternal href={companyUrl}>{company}</LinkExternal></span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.labelDescription}</span>
        <span className="text-txt-base">{description}</span>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{t.cv.labelResponsibilities}</span>
          <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {skills.map((skill) => (
              <li key={skill} className="text-txt-base"><span>&gt;</span> {skill}</li>
            ))}
          </ul>
        </div>
      )}
      {kpis.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{t.cv.labelMetrics}</span>
          <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
            {kpis.map((kpi) => (
              <span key={kpi.value} className="chip metric-chip">{kpi.value} · {kpi.label}</span>
            ))}
          </div>
        </div>
      )}
      {tools.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{t.cv.labelTools}</span>
          <span className="text-txt-base">{tools.join(', ')}</span>
        </div>
      )}
    </AccordionCard>
  );
}

function EduEntry({ t, prefix, open, onToggle }: { t: Strings; prefix: string; open: boolean; onToggle: (key: string) => void }) {
  const p = prefix as 'edu1' | 'edu2' | 'edu3' | 'edu4';
  const category = t.cv[`${p}Category` as keyof typeof t.cv] as string;
  const institution = t.cv[`${p}Institution` as keyof typeof t.cv] as string;
  const institutionUrl = t.cv[`${p}InstitutionUrl` as keyof typeof t.cv] as string;
  const period = t.cv[`${p}Period` as keyof typeof t.cv] as string;
  const summary = t.cv[`${p}Summary` as keyof typeof t.cv] as string;
  const courses = t.cv[`${p}Courses` as keyof typeof t.cv] as string[];
  const tools = t.cv[`${p}Tools` as keyof typeof t.cv] as string[];

  return (
    <AccordionCard id={prefix} open={open} onToggle={onToggle} label={category}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.eduColDate}</span>
        <span className="text-txt-base">{period}</span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.eduColInstitution}</span>
        <span className="text-txt-base"><LinkExternal href={institutionUrl}>{institution}</LinkExternal></span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.cv.eduColLearnings}</span>
        <span className="text-txt-base">{summary}</span>
      </div>
      {tools.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{t.cv.eduColTools}</span>
          <span className="text-txt-base">{tools.join(', ')}</span>
        </div>
      )}
      {courses.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{t.cv.eduColCourses}</span>
          <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {courses.map((course) => (
              <li key={course} className="text-txt-base"><span>&gt;</span> {course}</li>
            ))}
          </ul>
        </div>
      )}
    </AccordionCard>
  );
}
