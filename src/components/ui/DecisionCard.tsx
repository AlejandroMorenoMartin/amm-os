import type { ResearchFinding } from '../../data/projects';
import { useT } from '../../i18n';

interface Props {
  finding: ResearchFinding;
  index: number;
}

export function DecisionCard({ finding, index }: Props) {
  const { t, lang } = useT();

  return (
    <div className="decision-card">
      <div className="decision-card__header">
        <span className="text-txt-base decision-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-txt-l">{finding.role[lang]}</span>
      </div>

      <div className="decision-card__body">
        <div className="decision-card__field">
          <span className="card-label">{t.research.finding}</span>
          <span className="text-txt-base">{finding.finding[lang]}</span>
        </div>

        <div className="decision-card__field">
          <span className="card-label">{t.research.impact}</span>
          <span className="text-txt-base" style={{ color: 'var(--color-orange)' }}>{finding.impact[lang]}</span>
        </div>

        {finding.visual && (
          <img src={finding.visual} alt={finding.role[lang]} className="decision-card__visual" />
        )}
      </div>
    </div>
  );
}
