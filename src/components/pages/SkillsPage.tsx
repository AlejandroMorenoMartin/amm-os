import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';
import { TextBlock } from '../ui/TextBlock';
import { SectionLabel } from '../ui/SectionLabel';

export function SkillsPage() {
  const { t } = useT();

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.skills.title}</PageTitle>

      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SkillGroup label={t.skills.skill1Label} items={t.skills.skill1Items} />
        <SkillGroup label={t.skills.skill2Label} items={t.skills.skill2Items} />
        <SkillGroup label={t.skills.skill3Label} items={t.skills.skill3Items} />
      </section>

      <section className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
        <SectionLabel>{t.skills.idiomas}</SectionLabel>
        <LangEntry lang={t.skills.lang1Name} level={t.skills.lang1Level} />
        <LangEntry lang={t.skills.lang2Name} level={t.skills.lang2Level} />
      </section>
    </article>
  );
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <TextBlock>
      <SectionLabel>{label}</SectionLabel>
      <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        {items.map((item) => (
          <li key={item} className="text-txt-base">&gt; {item}</li>
        ))}
      </ul>
    </TextBlock>
  );
}

function LangEntry({ lang, level }: { lang: string; level: string }) {
  return (
    <TextBlock>
      <span className="text-txt-s">{lang}</span>
      <span className="text-txt-base">{level}</span>
    </TextBlock>
  );
}
