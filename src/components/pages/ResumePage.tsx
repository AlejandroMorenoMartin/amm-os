import { useState } from 'react';
import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';
import { SectionLabel } from '../ui/SectionLabel';
import { LinkExternal } from '../ui/LinkExternal';
import type { Strings } from '../../i18n/types';

export function ResumePage() {
  const { t } = useT();

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.cv.title}</PageTitle>

      {/* Experiencia */}
      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.cv.experiencia}</SectionLabel>
        <CVEntry period={t.cv.exp1Period} company={t.cv.exp1Company} companyUrl={t.cv.exp1CompanyUrl} role={t.cv.exp1Role} description={t.cv.exp1Desc} skills={t.cv.exp1Skills} tools={t.cv.exp1Tools} kpis={t.cv.exp1Kpis} labelPeriod={t.cv.labelPeriod} labelDescription={t.cv.labelDescription} labelCompany={t.cv.labelCompany} labelResponsibilities={t.cv.labelResponsibilities} labelMetrics={t.cv.labelMetrics} labelTools={t.cv.labelTools} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp2Period} company={t.cv.exp2Company} companyUrl={t.cv.exp2CompanyUrl} role={t.cv.exp2Role} description={t.cv.exp2Desc} skills={t.cv.exp2Skills} tools={t.cv.exp2Tools} kpis={t.cv.exp2Kpis} labelPeriod={t.cv.labelPeriod} labelDescription={t.cv.labelDescription} labelCompany={t.cv.labelCompany} labelResponsibilities={t.cv.labelResponsibilities} labelMetrics={t.cv.labelMetrics} labelTools={t.cv.labelTools} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp3Period} company={t.cv.exp3Company} companyUrl={t.cv.exp3CompanyUrl} role={t.cv.exp3Role} description={t.cv.exp3Desc} skills={t.cv.exp3Skills} tools={t.cv.exp3Tools} kpis={t.cv.exp3Kpis} labelPeriod={t.cv.labelPeriod} labelDescription={t.cv.labelDescription} labelCompany={t.cv.labelCompany} labelResponsibilities={t.cv.labelResponsibilities} labelMetrics={t.cv.labelMetrics} labelTools={t.cv.labelTools} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp4Period} company={t.cv.exp4Company} companyUrl={t.cv.exp4CompanyUrl} role={t.cv.exp4Role} description={t.cv.exp4Desc} skills={t.cv.exp4Skills} tools={t.cv.exp4Tools} kpis={t.cv.exp4Kpis} labelPeriod={t.cv.labelPeriod} labelDescription={t.cv.labelDescription} labelCompany={t.cv.labelCompany} labelResponsibilities={t.cv.labelResponsibilities} labelMetrics={t.cv.labelMetrics} labelTools={t.cv.labelTools} />
      </section>

      {/* Educación */}
      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.cv.educacion}</SectionLabel>
        <EduTable t={t} />
      </section>

    </article>
  );
}

function CVEntry({ period, company, companyUrl, role, description, skills, tools, kpis, labelPeriod, labelDescription, labelCompany, labelResponsibilities, labelMetrics, labelTools }: {
  period: string;
  company: string;
  companyUrl: string;
  role: string;
  description: string;
  skills: string[];
  tools: string[];
  kpis: { value: string; label: string }[];
  labelPeriod: string;
  labelDescription: string;
  labelCompany: string;
  labelResponsibilities: string;
  labelMetrics: string;
  labelTools: string;
}) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
      <span className="text-txt-l">{role}</span>

      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{labelPeriod}</span>
        <span className="text-txt-base">{period}</span>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{labelDescription}</span>
        <span className="text-txt-base">{description}</span>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{labelCompany}</span>
        <span className="text-txt-base"><LinkExternal href={companyUrl}>{company}</LinkExternal></span>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{labelResponsibilities}</span>
          <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {skills.map((skill) => (
              <li key={skill} className="text-txt-base"><span>&gt;</span> {skill}</li>
            ))}
          </ul>
        </div>
      )}

      {kpis.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{labelMetrics}</span>
          <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
            {kpis.map((kpi) => (
              <span key={kpi.value} className="chip metric-chip">{kpi.value} · {kpi.label}</span>
            ))}
          </div>
        </div>
      )}

      {tools.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <span className="card-label">{labelTools}</span>
          <span className="text-txt-base">{tools.join(', ')}</span>
        </div>
      )}
    </div>
  );
}

function ExpandableCell({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const text = items.join(', ');

  return (
    <span>
      {expanded ? text : (
        <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {text}
        </span>
      )}
      {items.length > 1 && (
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          className="font-mono"
          style={{ marginLeft: '0.4em', fontSize: 'inherit', color: 'var(--color-blue-500)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 'inherit' }}
        >
          {expanded ? '[-]' : '[+]'}
        </button>
      )}
    </span>
  );
}

function EduTable({ t }: { t: Strings }) {
  const rows = [
    { period: t.cv.edu4Period, institution: t.cv.edu4Institution, institutionUrl: t.cv.edu4InstitutionUrl, mode: t.cv.edu4Mode, summary: t.cv.edu4Summary, courses: t.cv.edu4Courses, tools: t.cv.edu4Tools },
    { period: t.cv.edu1Period, institution: t.cv.edu1Institution, institutionUrl: t.cv.edu1InstitutionUrl, mode: t.cv.edu1Mode, summary: t.cv.edu1Summary, courses: t.cv.edu1Courses, tools: t.cv.edu1Tools },
    { period: t.cv.edu2Period, institution: t.cv.edu2Institution, institutionUrl: t.cv.edu2InstitutionUrl, mode: t.cv.edu2Mode, summary: t.cv.edu2Summary, courses: t.cv.edu2Courses, tools: t.cv.edu2Tools },
    { period: t.cv.edu3Period, institution: t.cv.edu3Institution, institutionUrl: t.cv.edu3InstitutionUrl, mode: t.cv.edu3Mode, summary: t.cv.edu3Summary, courses: t.cv.edu3Courses, tools: t.cv.edu3Tools },
  ];

  return (
    <div className="edu-table-wrap">
      <table className="edu-table">
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '17%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '31%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t.cv.eduColDate}</th>
            <th>{t.cv.eduColInstitution}</th>
            <th>{t.cv.eduColTools}</th>
            <th>{t.cv.eduColLearnings}</th>
            <th>{t.cv.eduColCourses}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.institution}>
              <td className="edu-td-nowrap">{row.period}</td>
              <td>
                <LinkExternal href={row.institutionUrl}>{row.institution}</LinkExternal>
              </td>
              <td className="edu-td-nowrap">{row.tools.join(', ')}</td>
              <td className="edu-td-wide">{row.summary}</td>
              <td className="edu-td-wide"><ExpandableCell items={row.courses} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

