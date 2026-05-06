import { forwardRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import type { Lang } from '../../store/useAppStore';
import { useT } from '../../i18n';

export const TopBar = forwardRef<HTMLElement>(function TopBar(_props, ref) {
  const { lang, setLang } = useAppStore();
  const { t } = useT();

  const toggleLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({ url: window.location.href });
  };

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 flex justify-center text-txt-s font-mono shell-bar-top">
      <div className="w-full flex items-center justify-between" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: 'var(--shell-padding)' }}>
        <span>AMM-OS v4</span>
        <div className="flex items-center" style={{ gap: 'var(--gap-block)' }}>
          <button onClick={handleShare} className="btn-action" aria-label={t.topbar.share}>
            [&gt;&gt;]
          </button>
          <button onClick={toggleLang} className="btn-action" aria-label={t.topbar.switchLang}>
            [{lang.toUpperCase()}]
          </button>
        </div>
      </div>
    </header>
  );
});
