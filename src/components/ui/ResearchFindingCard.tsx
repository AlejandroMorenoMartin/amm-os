import type { ResearchFinding } from '../../data/projects';
import { useT } from '../../i18n';
import { Quote } from './Quote';

interface Props {
  finding: ResearchFinding;
  index: number;
}

export function ResearchFindingCard({ finding, index }: Props) {
  const { t, lang } = useT();

  return (
    <div className="research-card">
      <div className="research-card__header">
        <span className="text-txt-base research-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-txt-l">{finding.role[lang]}</span>
      </div>

      <div className="research-card__body">
        <div className="research-card__field">
          <span className="card-label">{t.research.context}</span>
          <span className="text-txt-base">{finding.context[lang]}</span>
        </div>
        <div className="research-card__field">
          <span className="card-label">{t.research.goal}</span>
          <span className="text-txt-base">{finding.goal[lang]}</span>
        </div>

        <Quote text={finding.quote ? finding.quote[lang] : finding.finding[lang]} />
      </div>
    </div>
  );
}
