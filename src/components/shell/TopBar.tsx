import { forwardRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useSound } from '../../hooks/useSound';
import type { Lang } from '../../store/useAppStore';
import { useT } from '../../i18n';

interface TopBarProps {
  style?: React.CSSProperties;
}

export const TopBar = forwardRef<HTMLElement, TopBarProps>(function TopBar({ style }, ref) {
  const { lang, setLang, soundEnabled, toggleSound } = useAppStore();
  const { playClick } = useSound();
  const { t } = useT();

  const toggleLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({ url: window.location.href });
  };

  const handleToggleSound = () => {
    toggleSound();
    if (!soundEnabled) playClick();
  };

  return (
    <header ref={ref} style={style} className="fixed top-0 left-0 right-0 z-50 flex justify-center text-txt-s font-mono shell-bar-top">
      <div className="w-full flex items-center justify-between" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: 'var(--shell-padding)' }}>
        <span className="flex items-center" style={{ gap: '0.4rem' }}>
          <img src="/favicon.svg" alt="" aria-hidden="true" width={32} height={32} />
          AMM-OS-V4
        </span>
        <div className="flex items-center" style={{ gap: 'var(--gap-block)' }}>
          <button
            onClick={handleToggleSound}
            className="btn-secondary has-tooltip"
            aria-label={soundEnabled ? t.topbar.soundOff : t.topbar.soundOn}
            data-sound="interactive"
          >
            {soundEnabled ? '[♪]' : '[♫]'}
            <span className="tooltip tooltip--down">
              {soundEnabled ? t.topbar.soundOff : t.topbar.soundOn}
            </span>
          </button>
          <button onClick={handleShare} className="btn-secondary has-tooltip" aria-label={t.topbar.share} data-sound="interactive">
            [&gt;&gt;]
            <span className="tooltip tooltip--down">{t.topbar.share}</span>
          </button>
          <button onClick={toggleLang} className="btn-secondary has-tooltip" aria-label={t.topbar.switchLang} data-sound="interactive">
            [{lang.toUpperCase()}]
            <span className="tooltip tooltip--down">{t.topbar.switchLang}</span>
          </button>
        </div>
      </div>
    </header>
  );
});
