import type { Insight } from '../../data/projects';
import { useT } from '../../i18n';
import { AccordionCard } from './AccordionCard';
import { Quote } from './Quote';

interface Props {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight, index }: Props) {
  const { t, lang } = useT();

  const label = (
    <span className="flex items-center" style={{ gap: 'var(--gap-card)' }}>
      <span className="text-txt-base insight-card__number">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-txt-base" style={{ color: 'var(--color-blue-500)' }}>-</span>
      <span>{insight.source[lang]}</span>
    </span>
  );

  return (
    <AccordionCard id={insight.id} label={label as unknown as string}>
      {insight.quote && <Quote text={insight.quote[lang]} author={insight.source[lang]} />}
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.research.finding}</span>
        <span className="text-txt-base">{insight.finding[lang]}</span>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <span className="card-label">{t.research.impact}</span>
        <span className="text-txt-base insight-card__impact">{insight.impact[lang]}</span>
      </div>
    </AccordionCard>
  );
}
