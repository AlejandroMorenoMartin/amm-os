import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';
import { TextBlock } from '../ui/TextBlock';
import { SectionLabel } from '../ui/SectionLabel';

export function ResumePage() {
  const { t } = useT();

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.cv.title}</PageTitle>

      {/* Experiencia */}
      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.cv.experiencia}</SectionLabel>
        <CVEntry period={t.cv.exp1Period} company={t.cv.exp1Company} role={t.cv.exp1Role} description={t.cv.exp1Desc} kpis={t.cv.exp1Kpis} />
        <CVEntry period={t.cv.exp2Period} company={t.cv.exp2Company} role={t.cv.exp2Role} description={t.cv.exp2Desc} kpis={t.cv.exp2Kpis} />
        <CVEntry period={t.cv.exp3Period} company={t.cv.exp3Company} role={t.cv.exp3Role} description={t.cv.exp3Desc} kpis={t.cv.exp3Kpis} />
        <CVEntry period={t.cv.exp4Period} company={t.cv.exp4Company} role={t.cv.exp4Role} description={t.cv.exp4Desc} kpis={t.cv.exp4Kpis} />
      </section>

      {/* Educación */}
      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.cv.educacion}</SectionLabel>
        <EduEntry period={t.cv.edu4Period} institution={t.cv.edu4Institution} courses={t.cv.edu4Courses} />
        <EduEntry period={t.cv.edu1Period} institution={t.cv.edu1Institution} courses={t.cv.edu1Courses} />
        <EduEntry period={t.cv.edu2Period} institution={t.cv.edu2Institution} courses={t.cv.edu2Courses} />
        <EduEntry period={t.cv.edu3Period} institution={t.cv.edu3Institution} courses={t.cv.edu3Courses} />
      </section>

    </article>
  );
}

function CVEntry({ period, company, role, description, kpis }: {
  period: string;
  company: string;
  role: string;
  description: string;
  kpis: { value: string; label: string }[];
}) {
  return (
    <TextBlock>
      <span className="text-txt-s italic">{period}</span>
      <span className="text-txt-s">{company}</span>
      <span className="text-txt-l">{role}</span>
      <p className="text-txt-base">{description}</p>
      {kpis.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          {kpis.map((kpi) => (
            <p key={kpi.value} className="text-txt-base">
              <span className="kpi">{kpi.value}</span>
              <span style={{ color: 'var(--color-zinc-600)' }}> — </span>
              {kpi.label}
            </p>
          ))}
        </div>
      )}
    </TextBlock>
  );
}

function EduEntry({ period, institution, courses }: {
  period: string;
  institution: string;
  courses: string[];
}) {
  return (
    <TextBlock>
      <span className="text-txt-s italic">{period}</span>
      <span className="text-txt-s">{institution}</span>
      <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        {courses.map((course) => (
          <li key={course} className="text-txt-base">&gt; {course}</li>
        ))}
      </ul>
    </TextBlock>
  );
}

