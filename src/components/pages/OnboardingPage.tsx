import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface OnboardingPageProps {
  onComplete: (path: string) => void;
}

const systemLang = navigator.language.startsWith('es') ? 'es' : 'en';

const STRINGS = {
  es: {
    sessionLabel: 'AMM-OS-V4 — SESIÓN INICIADA',
    welcome: 'Bienvenido al sistema operativo personal de Alejandro Moreno. Aquí encontrarás su trabajo, su perfil y su forma de pensar el diseño.',
    stepLang: 'Language',
    stepDestination: 'Destination',
  },
  en: {
    sessionLabel: 'AMM-OS-V4 — SESSION STARTED',
    welcome: "Welcome to Alejandro Moreno's personal operating system. Here you'll find his work, his profile, and his way of thinking about design.",
    stepLang: 'Language',
    stepDestination: 'Destination',
  },
};

const NAV_LINKS = [
  { label: '[HOME]',     path: '/',         dest: 'home' },
  { label: '[PROJECTS]', path: '/projects', dest: 'projects' },
  { label: '[RESUME]',   path: '/resume',   dest: 'resume' },
  { label: '[SKILLS]',   path: '/skills',   dest: 'skills' },
];

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { setLang } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const s = STRINGS[systemLang];

  function handleLang(l: 'es' | 'en') {
    setLang(l);
    setStep(2);
  }

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-section)' }}>
      {/* Progress dots */}
      <div className="flex" style={{ gap: 'var(--gap-block)' }}>
        {([1, 2] as const).map((n) => (
          <div
            key={n}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: step === n ? 'var(--color-zinc-400)' : 'var(--color-zinc-700)',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-600)' }}>{s.sessionLabel}</p>
        <p className="text-txt-base">{s.welcome}</p>
      </div>

      {/* Step content */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s" style={{ color: 'var(--color-zinc-600)' }}>
          {step === 1 ? s.stepLang : s.stepDestination}
        </p>

        {step === 1 && (
          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            {(['es', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleLang(l)}
                className="btn-action font-mono"
              >
                [{l.toUpperCase()}]
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            {NAV_LINKS.map(({ label, path, dest }) => (
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
        )}
      </div>
    </div>
  );
}
