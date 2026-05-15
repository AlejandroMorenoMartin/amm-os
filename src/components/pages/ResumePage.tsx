import { useState } from 'react';
import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';
import { TextBlock } from '../ui/TextBlock';
import { SectionLabel } from '../ui/SectionLabel';
import { LinkExternal } from '../ui/LinkExternal';

export function ResumePage() {
  const { t } = useT();
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<number | null>(null);

  function toggleExp(index: number) {
    setExpandedExp((prev) => (prev === index ? null : index));
  }

  function toggleEdu(index: number) {
    setExpandedEdu((prev) => (prev === index ? null : index));
  }

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.cv.title}</PageTitle>

      {/* Experiencia */}
      <section className="flex flex-col">
        <SectionLabel>{t.cv.experiencia}</SectionLabel>
        <CVEntry period={t.cv.exp1Period} company={t.cv.exp1Company} companyUrl={t.cv.exp1CompanyUrl} mode={t.cv.exp1Mode} role={t.cv.exp1Role} description={t.cv.exp1Desc} skills={t.cv.exp1Skills} tools={t.cv.exp1Tools} kpis={t.cv.exp1Kpis} isExpanded={expandedExp === 0} onToggle={() => toggleExp(0)} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp2Period} company={t.cv.exp2Company} companyUrl={t.cv.exp2CompanyUrl} mode={t.cv.exp2Mode} role={t.cv.exp2Role} description={t.cv.exp2Desc} skills={t.cv.exp2Skills} tools={t.cv.exp2Tools} kpis={t.cv.exp2Kpis} isExpanded={expandedExp === 1} onToggle={() => toggleExp(1)} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp3Period} company={t.cv.exp3Company} companyUrl={t.cv.exp3CompanyUrl} mode={t.cv.exp3Mode} role={t.cv.exp3Role} description={t.cv.exp3Desc} skills={t.cv.exp3Skills} tools={t.cv.exp3Tools} kpis={t.cv.exp3Kpis} isExpanded={expandedExp === 2} onToggle={() => toggleExp(2)} />
        <hr className="project-divider" />
        <CVEntry period={t.cv.exp4Period} company={t.cv.exp4Company} companyUrl={t.cv.exp4CompanyUrl} mode={t.cv.exp4Mode} role={t.cv.exp4Role} description={t.cv.exp4Desc} skills={t.cv.exp4Skills} tools={t.cv.exp4Tools} kpis={t.cv.exp4Kpis} isExpanded={expandedExp === 3} onToggle={() => toggleExp(3)} />
      </section>

      {/* Educación */}
      <section className="flex flex-col">
        <SectionLabel>{t.cv.educacion}</SectionLabel>
        <EduEntry period={t.cv.edu4Period} institution={t.cv.edu4Institution} institutionUrl={t.cv.edu4InstitutionUrl} mode={t.cv.edu4Mode} summary={t.cv.edu4Summary} courses={t.cv.edu4Courses} isExpanded={expandedEdu === 0} onToggle={() => toggleEdu(0)} />
        <hr className="project-divider" />
        <EduEntry period={t.cv.edu1Period} institution={t.cv.edu1Institution} institutionUrl={t.cv.edu1InstitutionUrl} mode={t.cv.edu1Mode} summary={t.cv.edu1Summary} courses={t.cv.edu1Courses} isExpanded={expandedEdu === 1} onToggle={() => toggleEdu(1)} />
        <hr className="project-divider" />
        <EduEntry period={t.cv.edu2Period} institution={t.cv.edu2Institution} institutionUrl={t.cv.edu2InstitutionUrl} mode={t.cv.edu2Mode} summary={t.cv.edu2Summary} courses={t.cv.edu2Courses} isExpanded={expandedEdu === 2} onToggle={() => toggleEdu(2)} />
        <hr className="project-divider" />
        <EduEntry period={t.cv.edu3Period} institution={t.cv.edu3Institution} institutionUrl={t.cv.edu3InstitutionUrl} mode={t.cv.edu3Mode} summary={t.cv.edu3Summary} courses={t.cv.edu3Courses} isExpanded={expandedEdu === 3} onToggle={() => toggleEdu(3)} />
      </section>

    </article>
  );
}

function CVEntry({ period, company, companyUrl, mode, role, description, skills, tools, kpis, isExpanded, onToggle }: {
  period: string;
  company: string;
  companyUrl: string;
  mode: string;
  role: string;
  description: string;
  skills: string[];
  tools: string[];
  kpis: { value: string; label: string }[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full text-left project-row-btn has-tooltip"
        style={{ cursor: 'pointer' }}
        aria-expanded={isExpanded}
      >
        <span className="text-txt-l project-name">{role}</span>
        <span className="text-txt-s italic">{period}</span>
        <span className="text-txt-base">{description}</span>
        <span className="tooltip">{isExpanded ? 'Collapse experience' : 'Expand experience'}</span>
      </button>

      {isExpanded && (
        <div className="flex flex-col project-row-expanded-block" style={{ gap: 'var(--gap-section)' }}>
          <TextBlock>
            <span className="card-label">Company</span>
            <LinkExternal href={companyUrl}>{company}</LinkExternal>
          </TextBlock>

          {skills.length > 0 && (
            <TextBlock>
              <span className="card-label">Responsibilities</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {skills.map((skill) => (
                  <li key={skill} className="text-txt-base">&gt; {skill}</li>
                ))}
              </ul>
            </TextBlock>
          )}

          {kpis.length > 0 && (
            <TextBlock>
              <span className="card-label">Metrics</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
                {kpis.map((kpi) => (
                  <span key={kpi.value} className="chip metric-chip">{kpi.value} · {kpi.label}</span>
                ))}
              </div>
            </TextBlock>
          )}

          {tools.length > 0 && (
            <TextBlock>
              <span className="card-label">Tools</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
                {tools.map((tool) => (
                  <span key={tool} className="chip tool-chip">{tool}</span>
                ))}
              </div>
            </TextBlock>
          )}

          <TextBlock>
            <span className="card-label">Modality</span>
            <span className="chip mode-chip">{mode}</span>
          </TextBlock>
        </div>
      )}
    </div>
  );
}

function EduEntry({ period, institution, institutionUrl, mode, summary, courses, isExpanded, onToggle }: {
  period: string;
  institution: string;
  institutionUrl: string;
  mode: string;
  summary: string;
  courses: string[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`project-row-wrap${isExpanded ? ' project-row-wrap--focused' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full text-left project-row-btn has-tooltip"
        style={{ cursor: 'pointer' }}
        aria-expanded={isExpanded}
      >
        <span className="text-txt-l project-name">{institution}</span>
        <span className="text-txt-s italic">{period}</span>
        <span className="text-txt-base">{summary}</span>
        <span className="tooltip">{isExpanded ? 'Collapse education' : 'Expand education'}</span>
      </button>

      {isExpanded && (
        <div className="flex flex-col project-row-expanded-block" style={{ gap: 'var(--gap-section)' }}>
          <TextBlock>
            <span className="card-label">Institution</span>
            <LinkExternal href={institutionUrl}>{institution}</LinkExternal>
          </TextBlock>

          <TextBlock>
            <span className="card-label">Courses</span>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {courses.map((course) => (
                <li key={course} className="text-txt-base">&gt; {course}</li>
              ))}
            </ul>
          </TextBlock>

          <TextBlock>
            <span className="card-label">Modality</span>
            <span className="chip mode-chip">{mode}</span>
          </TextBlock>
        </div>
      )}
    </div>
  );
}

