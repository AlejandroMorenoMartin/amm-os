import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';
import { SectionLabel } from '../ui/SectionLabel';

export function SkillsPage() {
  const { t } = useT();

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.skills.title}</PageTitle>

      <SkillGroup label={t.skills.skill1Label} items={t.skills.skill1Items} tools={t.skills.skill1Tools} />
      <SkillGroup label={t.skills.skill2Label} items={t.skills.skill2Items} tools={t.skills.skill2Tools} />
      <SkillGroup label={t.skills.skill3Label} items={t.skills.skill3Items} tools={t.skills.skill3Tools} />

      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.skills.idiomas}</SectionLabel>
        <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <LangEntry lang={t.skills.lang1Name} level={t.skills.lang1Level} />
          <LangEntry lang={t.skills.lang2Name} level={t.skills.lang2Level} />
        </ul>
      </section>
    </article>
  );
}

function SkillGroup({ label, items, tools }: { label: string; items: string[]; tools: string[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
      <SectionLabel>{label}</SectionLabel>
      <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        {items.map((item) => (
          <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
        ))}
      </ul>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">Tools</span>
        <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
          {tools.map((tool) => (
            <span key={tool} className="chip tool-chip">{tool}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LangEntry({ lang, level }: { lang: string; level: string }) {
  return (
    <li className="text-txt-base"><span>&gt;</span> {lang} ({level})</li>
  );
}
