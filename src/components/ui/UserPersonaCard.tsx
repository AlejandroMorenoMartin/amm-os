import type { Persona } from '../../data/projects';
import { useT } from '../../i18n';
import { AccordionCard } from './AccordionCard';

interface Props {
  persona: Persona;
}

export function UserPersonaCard({ persona }: Props) {
  const { t, lang } = useT();

  return (
    <AccordionCard id={persona.id} label={persona.role[lang]}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.research.context}</span>
        <span className="text-txt-base">{persona.context[lang]}</span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.research.goal}</span>
        <span className="text-txt-base">{persona.goal[lang]}</span>
      </div>
    </AccordionCard>
  );
}
