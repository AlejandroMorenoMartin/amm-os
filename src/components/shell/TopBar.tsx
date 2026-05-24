import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useSound } from '../../hooks/useSound';
import { projects } from '../../data/projects';
import { useT } from '../../i18n';

interface TopBarProps {
  style?: React.CSSProperties;
  hideCtrl?: boolean;
}

export const TopBar = forwardRef<HTMLElement, TopBarProps>(function TopBar({ style, hideCtrl = false }, ref) {
  const { lang, setLang, soundEnabled, toggleSound, musicEnabled, toggleMusic, volume, setVolume, toggleProject, expandedProject } = useAppStore();
  const { playClick } = useSound();
  const { t } = useT();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  const projectSlug = pathname.startsWith('/projects/') ? pathname.split('/')[2] : null;
  const project = projectSlug ? projects.find((p) => p.slug === projectSlug) : null;

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    if (projectSlug && expandedProject !== projectSlug) toggleProject(projectSlug);
    navigate('/projects');
  }

  const handleShare = async () => {
    if (!navigator.share) return;
    await navigator.share({ url: window.location.href });
  };

  const handleToggleSound = () => {
    toggleSound();
    if (!soundEnabled) playClick();
  };

  const openMenu = useCallback(() => {
    const headerEl = typeof ref === 'object' && ref ? ref.current : null;
    const btnEl = btnRef.current;
    if (headerEl && btnEl) {
      const headerRect = headerEl.getBoundingClientRect();
      const btnRect = btnEl.getBoundingClientRect();
      setDropdownPos({
        top: headerRect.bottom,
        right: window.innerWidth - btnRect.right,
      });
    }
    setMenuOpen(true);
  }, [ref]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header ref={ref} style={style} className="fixed top-0 left-0 right-0 z-50 flex justify-center text-txt-s font-mono shell-bar-top">
      <div className="w-full flex items-center justify-between" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: 'var(--shell-padding)' }}>
        {project ? (
          <span className="text-txt-base flex items-center" style={{ gap: 'var(--gap-card)' }}>
            <a href="/projects" onClick={handleBack} className="btn-secondary has-tooltip" aria-label={t.topbar.back} data-sound="interactive">
              [&lt;]
              <span className="tooltip tooltip--down">{t.topbar.back}</span>
            </a>
            {project.name}
          </span>
        ) : (
          <span className="text-txt-base flex items-center" style={{ gap: 'var(--gap-card)' }}>
            <img src="/favicon.svg" alt="" aria-hidden="true" width={32} height={32} />
            AMM-OS v4.0
          </span>
        )}

        {!hideCtrl && (
          <div style={{ display: 'flex', gap: 'var(--gap-block)' }}>
            <button
              onClick={handleShare}
              className="btn-secondary has-tooltip"
              aria-label={t.topbar.share}
              data-sound="interactive"
            >
              [&gt;&gt;]
              <span className="tooltip tooltip--down">{t.topbar.share}</span>
            </button>
            <button
              ref={btnRef}
              onClick={() => menuOpen ? setMenuOpen(false) : openMenu()}
              className="btn-secondary has-tooltip"
              aria-label={t.topbar.controls}
              data-sound="interactive"
            >
              [CTRL]
              <span className="tooltip tooltip--down">{t.topbar.controls}</span>
            </button>
          </div>
        )}
      </div>

      {menuOpen && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            className="font-mono"
            style={{
              position: 'fixed',
              top: dropdownPos.top,
              right: dropdownPos.right,
              zIndex: 9999,
              minWidth: '18rem',
              background: 'var(--color-background)',
              border: 'var(--border-default)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--gap-section)',
            }}
          >
            <span className="text-txt-l">CONTROLS</span>
            <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
              {/* Volume */}
              <div className="flex items-stretch justify-between" style={{ gap: 'var(--gap-block)' }}>
                <span className="text-txt-base" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{t.onboarding.stepVolume}</span>
                <div style={{ width: 'calc(2 * 3.5rem + var(--gap-block))', height: '34.3px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label={t.topbar.volume}
                    className="volume-slider"
                    style={{
                      width: '100%',
                      background: `linear-gradient(to right, var(--color-blue-500) ${volume * 100}%, var(--color-zinc-300) ${volume * 100}%)`,
                    }}
                  />
                </div>
              </div>
              {/* Sound */}
              <div className="flex items-center" style={{ gap: 'var(--gap-section)' }}>
                <span className="text-txt-base" style={{ flex: 1 }}>{t.onboarding.stepSound}</span>
                <div style={{ display: 'flex', gap: 'var(--gap-block)' }}>
                  <button onClick={handleToggleSound} className="btn-secondary font-mono" style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...(soundEnabled ? { color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)', background: 'var(--color-blue-500)' } : {}) }} aria-label={t.topbar.soundOn} data-sound="interactive">[ON]</button>
                  <button onClick={handleToggleSound} className="btn-secondary font-mono" style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...(!soundEnabled ? { color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)', background: 'var(--color-blue-500)' } : {}) }} aria-label={t.topbar.soundOff} data-sound="interactive">[OFF]</button>
                </div>
              </div>
              {/* Music */}
              <div className="flex items-center" style={{ gap: 'var(--gap-section)' }}>
                <span className="text-txt-base" style={{ flex: 1 }}>{t.onboarding.stepMusic}</span>
                <div style={{ display: 'flex', gap: 'var(--gap-block)' }}>
                  <button onClick={() => { if (!musicEnabled) toggleMusic(); }} className="btn-secondary font-mono" style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...(musicEnabled ? { color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)', background: 'var(--color-blue-500)' } : {}) }} aria-label={t.topbar.music} data-sound="interactive">[ON]</button>
                  <button onClick={() => { if (musicEnabled) toggleMusic(); }} className="btn-secondary font-mono" style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...(!musicEnabled ? { color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)', background: 'var(--color-blue-500)' } : {}) }} aria-label={t.topbar.music} data-sound="interactive">[OFF]</button>
                </div>
              </div>
              {/* Language */}
              <div className="flex items-center" style={{ gap: 'var(--gap-section)' }}>
                <span className="text-txt-base" style={{ flex: 1 }}>{t.onboarding.stepLang}</span>
                <div style={{ display: 'flex', gap: 'var(--gap-block)' }}>
                  {(['en', 'es'] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className="btn-secondary font-mono" style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...(lang === l ? { color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)', background: 'var(--color-blue-500)' } : {}) }} aria-label={l.toUpperCase()} data-sound="interactive">
                      [{l.toUpperCase()}]
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
});
