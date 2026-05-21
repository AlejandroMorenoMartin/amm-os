import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface OnboardingPageProps {
  onComplete: (path: string) => void;
}

const systemLang = navigator.language.startsWith('es') ? 'es' : 'en';

function getSessionStamp() {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'short' });
  const date = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return `${day} ${date} ${time}`;
}

const STRINGS = {
  es: {
    step1Label: 'AMM-OS-V4 — Session started',
    step1Welcome: 'Estás accediendo al sistema personal de Alejandro Moreno.',
    stepLang: 'Selecciona tu idioma.',
    step2Label: 'AMM-OS-V4 — Session started',
    step2Desc: 'El sistema tiene cuatro áreas. En Home encontrarás quién soy. En Projects, los proyectos en los que he trabajado. En Skills, las habilidades y herramientas con las que opero. En Resume, mi trayectoria.',
    stepDestination: 'Selecciona tu destino.',
  },
  en: {
    step1Label: 'AMM-OS-V4 — Session started',
    step1Welcome: "You are accessing Alejandro Moreno's personal system.",
    stepLang: 'Select your language.',
    step2Label: 'AMM-OS-V4 — Session started',
    step2Desc: "The system has four areas. Home is where you'll find who I am. Projects holds the work I've done. Skills covers both my abilities and the tools I work with. Resume covers my background.",
    stepDestination: 'Select your destination.',
  },
};

const NAV_LINKS = [
  { label: '[HOME]',     path: '/',         dest: 'home' },
  { label: '[PROJECTS]', path: '/projects', dest: 'projects' },
  { label: '[RESUME]',   path: '/resume',   dest: 'resume' },
  { label: '[SKILLS]',   path: '/skills',   dest: 'skills' },
];

const CHAR_DELAY = 40;
const IDLE_DELAY = 1000;

type Phase = 'idle' | 'typing-stamp' | 'typing-welcome' | 'pausing' | 'done';

function useTypewriter(text: string, active: boolean, onDone: () => void) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    indexRef.current = 0;
    doneRef.current = false;
    setDisplayed('');

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length && !doneRef.current) {
        doneRef.current = true;
        clearInterval(interval);
        onDone();
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text]);

  return displayed;
}

function useCursor(phase: Phase) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase === 'typing-stamp' || phase === 'typing-welcome') { setVisible(true); return; }
    const t = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(t);
  }, [phase]);

  return visible ? '|' : ' ';
}

function StepIndicator({ step, onSkip }: { step: 1 | 2; onSkip: () => void }) {
  return (
    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--gap-block)' }}>
      <p aria-hidden="true" style={{ fontSize: '14px', letterSpacing: '0.125rem', color: 'var(--color-zinc-400)' }}>{step === 1 ? '■ □' : '■ ■'}</p>
      <button type="button" onClick={onSkip} className="btn-secondary font-mono w-fit">
        [SKIP]
      </button>
    </div>
  );
}

interface Step2Props {
  lang: 'es' | 'en';
  onBack: () => void;
  onComplete: (path: string) => void;
}

function Step2({ lang, onBack, onComplete }: Step2Props) {
  const s = STRINGS[lang];
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase('typing-welcome'), IDLE_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Enter') onComplete('/'); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onComplete]);

  useEffect(() => {
    if (phase !== 'pausing') return;
    const t = setTimeout(() => setPhase('done'), 800);
    return () => clearTimeout(t);
  }, [phase]);

  const descText = useTypewriter(s.step2Desc, phase === 'typing-welcome', () => setPhase('pausing'));
  const cursor = useCursor(phase);

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-section)' }}>
      <button
        type="button"
        onClick={onBack}
        className="btn-secondary font-mono"
        style={{ alignSelf: 'flex-start' }}
      >
        [&lt;]
      </button>

      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s">{s.step2Label}</p>
        {phase !== 'idle' && (
          <p className="text-txt-base">
            {phase === 'done' ? s.step2Desc : descText}
            <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor}</span>
          </p>
        )}
      </div>

      {phase === 'done' && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <p className="text-txt-s">{s.stepDestination}</p>
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
        </div>
      )}

      <StepIndicator step={2} onSkip={() => onComplete('/')} />
    </div>
  );
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { setLang } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>(systemLang);
  const [sessionStamp] = useState(getSessionStamp);

  const s1 = STRINGS[systemLang];
  const [phase1, setPhase1] = useState<Phase>('idle');

  useEffect(() => {
    const t = setTimeout(() => setPhase1('typing-stamp'), IDLE_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Enter') onComplete('/'); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onComplete]);

  useEffect(() => {
    if (phase1 !== 'pausing') return;
    const t = setTimeout(() => setPhase1('done'), 800);
    return () => clearTimeout(t);
  }, [phase1]);

  const stampText = useTypewriter(sessionStamp, phase1 === 'typing-stamp', () => setPhase1('typing-welcome'));
  const welcomeText = useTypewriter(s1.step1Welcome, phase1 === 'typing-welcome', () => setPhase1('pausing'));
  const cursor1 = useCursor(phase1);

  function handleLang(l: 'es' | 'en') {
    setSelectedLang(l);
    setLang(l);
    setStep(2);
  }

  if (step === 2) {
    return (
      <Step2
        key={selectedLang}
        lang={selectedLang}
        onBack={() => setStep(1)}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col font-mono" style={{ height: '100%', gap: 'var(--gap-section)' }}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
        <p className="text-txt-s">{s1.step1Label}</p>
        {phase1 !== 'idle' && (
          <p className="text-txt-base">
            {phase1 === 'typing-stamp' ? stampText : sessionStamp}
            {phase1 === 'typing-stamp' && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor1}</span>}
          </p>
        )}
        {phase1 !== 'idle' && phase1 !== 'typing-stamp' && (
          <p className="text-txt-base">
            {phase1 === 'pausing' || phase1 === 'done' ? s1.step1Welcome : welcomeText}
            <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor1}</span>
          </p>
        )}
      </div>

      {phase1 === 'done' && (
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <p className="text-txt-s">{s1.stepLang}</p>
          <div className="flex" style={{ gap: 'var(--gap-block)' }}>
            {(['en', 'es'] as const).map((l) => (
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
        </div>
      )}

      <StepIndicator step={1} onSkip={() => onComplete('/')} />
    </div>
  );
}
