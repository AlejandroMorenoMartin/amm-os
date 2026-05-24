import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useSound, playTyping } from '../../hooks/useSound';
import { useT } from '../../i18n';
import { PreloadShell } from '../shell/PreloadShell';

interface OnboardingPageProps {
  onComplete: (path: string) => void;
  onStepChange: (step: 1 | 2) => void;
}

const systemLang = navigator.language.startsWith('es') ? 'es' : 'en';

const STRINGS = {
  es: {
    sessionLabel: 'AMM-OS-V4 — SESIÓN INICIADA',
    welcome: 'Estás accediendo a AMM-OS, el sistema personal de Alejandro Moreno.',
    stepVolume: 'Select volume',
    stepSound: 'Select sound',
    stepMusic: 'Select music',
    stepLang: 'Select language',
    stepSkip: '[SKIP]',
    stepContinue: '[CONTINUAR]',
    stepDestination: 'Select your destination',
    stepDesc: 'The system has four areas....',
    navBack: '[<]',
    navSkip: '[SKIP]',
  },
  en: {
    sessionLabel: 'AMM-OS-V4 — SESSION STARTED',
    welcome: "You are accessing to AMM-OS, Alejandro Moreno's personal system.",
    stepVolume: 'Select volume',
    stepSound: 'Select sound',
    stepMusic: 'Select music',
    stepLang: 'Select language',
    stepSkip: '[SKIP]',
    stepContinue: '[CONTINUE]',
    stepDestination: 'Select your destination',
    stepDesc: 'The system has four areas....',
    navBack: '[<]',
    navSkip: '[SKIP]',
  },
};

const NAV_LINKS = [
  { label: '[HOME]',   path: '/',         dest: 'home' },
  { label: '[LAB]',    path: '/projects', dest: 'projects' },
  { label: '[RESUME]', path: '/resume',   dest: 'resume' },
  { label: '[SKILLS]', path: '/skills',   dest: 'skills' },
];

const CHAR_DELAY = 40;
const IDLE_DELAY = 600;

type Phase = 'idle' | 'typing' | 'pausing' | 'done';

function useTypewriter(text: string, active: boolean, onDone: () => void, onChar?: () => void) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const doneRef = useRef(false);
  const onCharRef = useRef(onChar);
  const onDoneRef = useRef(onDone);
  onCharRef.current = onChar;
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active) return;
    indexRef.current = 0;
    doneRef.current = false;
    setDisplayed('');

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      onCharRef.current?.();
      if (indexRef.current >= text.length && !doneRef.current) {
        doneRef.current = true;
        clearInterval(interval);
        onDoneRef.current();
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
  }, [active, text]);

  return displayed;
}

function useCursor(active: boolean) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (active) { setVisible(true); return; }
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, [active]);
  return visible ? '|' : ' ';
}

function StepBar({ step }: { step: 1 | 2 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingInline: 'var(--shell-padding)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 'var(--shell-max-width)', display: 'flex', gap: 'var(--gap-block)' }}>
        <div style={{ flex: 1, height: '8px', background: 'var(--color-zinc-300)' }} />
        <div style={{ flex: 1, height: '8px', background: step === 2 ? 'var(--color-zinc-300)' : 'var(--color-zinc-900)' }} />
      </div>
    </div>
  );
}

import type { Strings } from '../../i18n/types';

interface Step2Props {
  t: Strings;
  onComplete: (path: string) => void;
  selectedLang: 'es' | 'en';
}

function OnboardingStep2({ t, onComplete, selectedLang }: Step2Props) {
  const s2 = STRINGS[selectedLang];
  const [phase2, setPhase2] = useState<Phase>('idle');

  useEffect(() => {
    const timer = setTimeout(() => setPhase2('typing'), IDLE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase2 !== 'pausing') return;
    const timer = setTimeout(() => setPhase2('done'), 600);
    return () => clearTimeout(timer);
  }, [phase2]);

  const descText = useTypewriter(t.onboarding.stepDesc, phase2 === 'typing', () => setPhase2('pausing'), playTyping);
  const cursor2 = useCursor(phase2 === 'typing');

  return (
    <PreloadShell>
      <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
        {phase2 !== 'idle' && (
          <p className="text-txt-base">
            {phase2 === 'pausing' || phase2 === 'done' ? t.onboarding.stepDesc : descText}
            {(phase2 === 'typing' || phase2 === 'pausing') && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor2}</span>}
          </p>
        )}

        {phase2 === 'done' && (
          <>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <p className="text-txt-s">{s2.stepDestination}</p>
              <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
                {NAV_LINKS.map(({ label, path, dest }) => (
                  <button
                    key={path}
                    type="button"
                    data-destination={dest}
                    onClick={() => onComplete(path)}
                    className="btn-secondary btn-underline-hover font-mono"
                    style={activeStyle(true)}
                    data-sound="interactive"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex" style={{ gap: 'var(--gap-block)' }}>
              <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{s2.navSkip}</button>
            </div>
          </>
        )}
      </div>

      <StepBar step={2} />
    </PreloadShell>
  );
}

function activeStyle(condition: boolean): React.CSSProperties {
  return condition
    ? { background: 'var(--color-blue-500)', color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)' }
    : {};
}

function active(_condition: boolean) {
  return 'btn-secondary font-mono';
}

export function OnboardingPage({ onComplete, onStepChange }: OnboardingPageProps) {
  const { setLang, soundEnabled, toggleSound, musicEnabled, toggleMusic, volume, setVolume } = useAppStore();
  const { playClick } = useSound();
  const { t } = useT();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>(systemLang);
  const [phase, setPhase] = useState<Phase>('idle');
  const s = STRINGS[systemLang];

  function goToStep(s: 1 | 2) {
    setStep(s);
    onStepChange(s);
  }

  useEffect(() => {
    const t = setTimeout(() => setPhase('typing'), IDLE_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 'pausing') return;
    const t = setTimeout(() => setPhase('done'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Enter') onComplete('/'); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onComplete]);

  const welcomeText = useTypewriter(s.welcome, phase === 'typing', () => setPhase('pausing'), playTyping);
  const cursor = useCursor(phase === 'typing');

  function handleLang(l: 'es' | 'en') {
    setSelectedLang(l);
    setLang(l);
  }

  function handleToggleSound(target: boolean) {
    if (soundEnabled !== target) {
      toggleSound();
      if (target) playClick();
    }
  }

  function handleToggleMusic(target: boolean) {
    if (musicEnabled !== target) toggleMusic();
  }

  if (step === 2) {
    return <OnboardingStep2 t={t} onComplete={onComplete} selectedLang={selectedLang} />;
  }

  return (
    <PreloadShell>
      <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
        {phase !== 'idle' && (
          <p className="text-txt-base">
            {phase === 'pausing' || phase === 'done' ? s.welcome : welcomeText}
            {(phase === 'typing' || phase === 'pausing') && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor}</span>}
          </p>
        )}

        {phase === 'done' && (
          <>
            <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
              {/* Volume */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepVolume}</p>
                <div style={{ width: 'calc(2 * 3.5rem + var(--gap-block))', height: '34.3px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label={s.stepVolume}
                    className="volume-slider"
                    style={{
                      width: '100%',
                      background: `linear-gradient(to right, var(--color-blue-500) ${volume * 100}%, var(--color-zinc-300) ${volume * 100}%)`,
                    }}
                  />
                </div>
              </div>

              {/* Sound */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepSound}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  <button type="button" onClick={() => handleToggleSound(true)} className={active(soundEnabled)} style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...activeStyle(soundEnabled) }} data-sound="interactive">[ON]</button>
                  <button type="button" onClick={() => handleToggleSound(false)} className={active(!soundEnabled)} style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...activeStyle(!soundEnabled) }} data-sound="interactive">[OFF]</button>
                </div>
              </div>

              {/* Music */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepMusic}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  <button type="button" onClick={() => handleToggleMusic(true)} className={active(musicEnabled)} style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...activeStyle(musicEnabled) }} data-sound="interactive">[ON]</button>
                  <button type="button" onClick={() => handleToggleMusic(false)} className={active(!musicEnabled)} style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...activeStyle(!musicEnabled) }} data-sound="interactive">[OFF]</button>
                </div>
              </div>

              {/* Language */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepLang}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  {(['en', 'es'] as const).map((l) => (
                    <button key={l} type="button" onClick={() => handleLang(l)} className={active(selectedLang === l)} style={{ minWidth: '3.5rem', paddingInline: 0, display: 'flex', justifyContent: 'center', ...activeStyle(selectedLang === l) }} data-sound="interactive">
                      [{l.toUpperCase()}]
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skip + Continue */}
            <div className="flex" style={{ gap: 'var(--gap-block)' }}>
              <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{s.stepSkip}</button>
              <button type="button" onClick={() => goToStep(2)} className="btn-secondary font-mono" style={{ color: 'var(--color-blue-500)', borderColor: 'var(--color-blue-500)' }} data-sound="interactive">{STRINGS[selectedLang].stepContinue}</button>
            </div>
          </>
        )}
      </div>

      <StepBar step={1} />
    </PreloadShell>
  );
}
