import { useT } from '../../i18n';
import { useAppStore } from '../../store/useAppStore';
import { PageTitle } from '../ui/PageTitle';

export function AboutPage() {
  const { t } = useT();
  const { openImageModal } = useAppStore();

  const handlePhotoClick = () => {
    openImageModal({
      src: '/profile.webp',
      title: t.sobreMi.photoAlt,
      width: 320,
      height: 320,
    });
  };

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.sobreMi.title}</PageTitle>

      <button
        onClick={handlePhotoClick}
        className="p-0 photo-btn photo-btn--half btn-no-focus"
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        aria-label={t.sobreMi.photoAlt}
      >
        <img
          src="/profile.webp"
          alt={t.sobreMi.photoAlt}
          className="object-cover photo-border"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </button>

      <p className="text-txt-base">{t.sobreMi.p1}</p>
      <p className="text-txt-base">{t.sobreMi.p2}</p>
      <p className="text-txt-base">{t.sobreMi.p3}</p>
      <p className="text-txt-base">{t.sobreMi.p4}</p>
    </article>
  );
}
