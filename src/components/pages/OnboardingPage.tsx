import { useEffect, useState } from 'react';
import { useT } from '../../i18n';
import { useAppStore } from '../../store/useAppStore';

interface OnboardingPageProps {
  onComplete: (path: string) => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { t } = useT();
  const { setLang } = useAppStore();
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    if (phase === 1 || phase === 2 || phase === 4) {
      const timer = setTimeout(() => setPhase((p) => p + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase < 5) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onComplete('/');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, onComplete]);

  const navLinks = [
    { label: t.nav.home,    path: '/',         dest: 'home' },
    { label: t.nav.trabajo, path: '/projects', dest: 'projects' },
    { label: t.nav.cv,      path: '/resume',   dest: 'resume' },
    { label: t.nav.skills,  path: '/skills',   dest: 'skills' },
  ];

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ gap: 'var(--gap-section)' }}>
      {/* Fase 1 */}
      <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }}>
        {t.onboarding.sessionLabel}
      </p>

      {/* Fase 2 */}
      {phase >= 2 && (
        <p className="text-txt-s" style={{ maxWidth: '48ch' }}>
          {t.onboarding.welcome}
        </p>
      )}

      {/* Fase 3 */}
      {phase >= 3 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }}>
            {t.onboarding.selectLang}
          </p>
          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => { setLang(l); setPhase(4); }}
                className="btn-action font-mono"
              >
                [{l.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fase 4 */}
      {phase >= 4 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }}>
            {t.onboarding.navTitle}
          </p>
          <pre className="text-txt-s" style={{ fontFamily: 'inherit', margin: 0 }}>
            {t.onboarding.navKeys}
          </pre>
        </div>
      )}

      {/* Fase 5 */}
      {phase >= 5 && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <p className="text-txt-xs" style={{ color: 'var(--color-zinc-600)' }}>
            {t.onboarding.navDestination}
          </p>
          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            {navLinks.map(({ label, path, dest }) => (
              <button
                key={path}
                type="button"
                data-destination={dest}
                onClick={() => onComplete(path)}
                className="btn-action font-mono"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
