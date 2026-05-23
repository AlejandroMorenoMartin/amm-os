import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useSound, playTyping } from '../../hooks/useSound';
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
    <div aria-hidden="true" style={{ display: 'flex', gap: '4px' }}>
      <div style={{ flex: 1, height: '4px', background: 'var(--color-zinc-300)' }} />
      <div style={{ flex: 1, height: '4px', background: step === 2 ? 'var(--color-zinc-300)' : 'var(--color-zinc-700)' }} />
    </div>
  );
}

function active(condition: boolean) {
  return condition ? 'btn-nav btn-nav--active font-mono' : 'btn-secondary font-mono';
}

export function OnboardingPage({ onComplete, onStepChange }: OnboardingPageProps) {
  const { setLang, soundEnabled, toggleSound, musicEnabled, toggleMusic } = useAppStore();
  const { playClick } = useSound();
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
    const s2 = STRINGS[selectedLang];
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
          <p className="text-txt-base">{s2.stepDesc}</p>

          <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <p className="text-txt-s">{s2.stepDestination}</p>
              <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
                {NAV_LINKS.map(({ label, path, dest }) => (
                  <button
                    key={path}
                    type="button"
                    data-destination={dest}
                    onClick={() => onComplete(path)}
                    className="btn-nav btn-nav--active font-mono"
                    data-sound="interactive"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            <button type="button" onClick={() => goToStep(1)} className="btn-secondary font-mono" data-sound="interactive">{s2.navBack}</button>
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{s2.navSkip}</button>
          </div>
        </div>

        <StepBar step={2} />
      </PreloadShell>
    );
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
            <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
              {/* Volume */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepVolume}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  <button type="button" className="btn-secondary font-mono" data-sound="interactive">[EN]</button>
                  <button type="button" className="btn-nav btn-nav--active font-mono" data-sound="interactive">[ES]</button>
                </div>
              </div>

              {/* Sound */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepSound}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  <button type="button" onClick={() => handleToggleSound(true)} className={active(soundEnabled)} data-sound="interactive">[ON]</button>
                  <button type="button" onClick={() => handleToggleSound(false)} className={active(!soundEnabled)} data-sound="interactive">[OFF]</button>
                </div>
              </div>

              {/* Music */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepMusic}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  <button type="button" onClick={() => handleToggleMusic(true)} className={active(musicEnabled)} data-sound="interactive">[ON]</button>
                  <button type="button" onClick={() => handleToggleMusic(false)} className={active(!musicEnabled)} data-sound="interactive">[OFF]</button>
                </div>
              </div>

              {/* Language */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{s.stepLang}</p>
                <div className="flex" style={{ gap: 'var(--gap-block)' }}>
                  {(['en', 'es'] as const).map((l) => (
                    <button key={l} type="button" onClick={() => handleLang(l)} className={active(selectedLang === l)} data-sound="interactive">
                      [{l.toUpperCase()}]
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Skip + Continue */}
            <div className="flex" style={{ gap: 'var(--gap-block)' }}>
              <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{s.stepSkip}</button>
              <button type="button" onClick={() => goToStep(2)} className="btn-nav btn-nav--active font-mono" data-sound="interactive">{STRINGS[selectedLang].stepContinue}</button>
            </div>
          </>
        )}
      </div>

      <StepBar step={1} />
    </PreloadShell>
  );
}
