import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useSound, playTyping } from '../../hooks/useSound';
import { useT } from '../../i18n';
import { PreloadShell } from '../shell/PreloadShell';
import { ToggleSwitch } from '../ui/ToggleSwitch';

interface OnboardingPageProps {
  onComplete: (path: string) => void;
  onStepChange: (step: 1 | 2 | 3) => void;
}


const NAV_LINKS = [
  { labelKey: 'home'    as const, path: '/'         },
  { labelKey: 'trabajo' as const, path: '/projects' },
  { labelKey: 'cv'      as const, path: '/resume'   },
  { labelKey: 'skills'  as const, path: '/skills'   },
];

const BOOT_LINES = [
  'Loading AMM-OS v4.0 [OK]',
  'Loading lab/AMM-OS [OK]',
  'Loading lab/Senzo-studio [OK]',
  'Loading lab/Casa-del-aire [OK]',
  'Loading lab/Sazon [OK]',
  'Loading lab/Forma [OK]',
  'Initializing AMM-OS v4.0 [OK]',
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

function StepBar({ step }: { step: 1 | 2 | 3 }) {
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
        <div style={{ flex: 1, height: '8px', background: step >= 2 ? 'var(--color-zinc-300)' : 'var(--color-zinc-900)' }} />
        <div style={{ flex: 1, height: '8px', background: step >= 3 ? 'var(--color-zinc-300)' : 'var(--color-zinc-900)' }} />
      </div>
    </div>
  );
}

function activeStyle(condition: boolean): React.CSSProperties {
  return condition
    ? { background: 'var(--color-blue-500)', color: 'var(--color-blue-950)', borderColor: 'var(--color-blue-500)' }
    : {};
}

export function OnboardingPage({ onComplete, onStepChange }: OnboardingPageProps) {
  const { lang, setLang, soundEnabled, toggleSound, musicEnabled, toggleMusic, volume, setVolume } = useAppStore();
  const { playClick } = useSound();
  const { t } = useT();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 — boot lines
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  // Step 2 — welcome typewriter
  const [phase2, setPhase2] = useState<Phase>('idle');

  // Step 3 — desc typewriter
  const [phase3, setPhase3] = useState<Phase>('idle');

  function goToStep(next: 1 | 2 | 3) {
    setStep(next);
    onStepChange(next);
  }

  // Boot animation
  useEffect(() => {
    if (step !== 1) return;
    const delay = 2500 / BOOT_LINES.length;
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          timers.push(setTimeout(() => setBootDone(true), 400));
        }
      }, delay * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [step]);

  // Skip boot with Enter
  useEffect(() => {
    if (step !== 1) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      if (!bootDone) {
        setVisibleLines(BOOT_LINES.length);
        setBootDone(true);
      } else {
        goToStep(2);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, bootDone]);

  // Step 2 typewriter trigger
  useEffect(() => {
    if (step !== 2) return;
    const timer = setTimeout(() => setPhase2('typing'), IDLE_DELAY);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (phase2 !== 'pausing') return;
    const timer = setTimeout(() => setPhase2('done'), 600);
    return () => clearTimeout(timer);
  }, [phase2]);

  // Step 3 typewriter trigger
  useEffect(() => {
    if (step !== 3) return;
    const timer = setTimeout(() => setPhase3('typing'), IDLE_DELAY);
    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (phase3 !== 'pausing') return;
    const timer = setTimeout(() => setPhase3('done'), 600);
    return () => clearTimeout(timer);
  }, [phase3]);

  // Skip onboarding with Enter (step 2+)
  useEffect(() => {
    if (step === 1) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Enter') onComplete('/'); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onComplete]);

  const welcomeText = useTypewriter(t.onboarding.welcome, phase2 === 'typing', () => setPhase2('pausing'), playTyping);
  const cursor2 = useCursor(phase2 === 'typing');

  const descPlain = t.onboarding.stepDesc.replace(/<[^>]+>/g, '');
  const descText = useTypewriter(descPlain, phase3 === 'typing', () => setPhase3('pausing'), playTyping);
  const cursor3 = useCursor(phase3 === 'typing');

  function handleLang(l: 'es' | 'en') {
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

  // ── Step 1: Boot ──────────────────────────────────────────────
  if (step === 1) {
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
            const okIdx = line.lastIndexOf('[OK]');
            const body = okIdx !== -1 ? line.slice(0, okIdx).trimEnd() : line;
            const hasOk = okIdx !== -1;
            return (
              <p key={i} className="text-txt-s">
                {body}{hasOk && <> <span className="text-txt-base">[OK]</span></>}
              </p>
            );
          })}
        </div>

        <div className="onboarding-actions">
          <div className="onboarding-actions-inner">
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
            <button type="button" onClick={() => goToStep(2)} className="btn-secondary font-mono" style={{ color: 'var(--color-blue-500)', borderColor: 'var(--color-blue-500)' }} data-sound="interactive">{t.onboarding.stepContinue}</button>
          </div>
        </div>

        <StepBar step={1} />
      </PreloadShell>
    );
  }

  // ── Step 2: Controls ─────────────────────────────────────────
  if (step === 2) {
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
          {phase2 !== 'idle' && (
            <p className="text-txt-base">
              {phase2 === 'pausing' || phase2 === 'done' ? t.onboarding.welcome : welcomeText}
              {(phase2 === 'typing' || phase2 === 'pausing') && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor2}</span>}
            </p>
          )}

          {phase2 === 'done' && (
            <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
              {/* Volume */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{t.onboarding.stepVolume}</p>
                <div style={{ width: 'calc(2 * 3.5rem + var(--gap-block))', height: '34.3px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label={t.onboarding.stepVolume}
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
                <p className="text-txt-s">{t.onboarding.stepSound}</p>
                <ToggleSwitch
                  options={[{ label: '[ON]', value: 'on' }, { label: '[OFF]', value: 'off' }]}
                  value={soundEnabled ? 'on' : 'off'}
                  onChange={(v) => handleToggleSound(v === 'on')}
                  ariaLabel={t.onboarding.stepSound}
                />
              </div>

              {/* Music */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{t.onboarding.stepMusic}</p>
                <ToggleSwitch
                  options={[{ label: '[ON]', value: 'on' }, { label: '[OFF]', value: 'off' }]}
                  value={musicEnabled ? 'on' : 'off'}
                  onChange={(v) => handleToggleMusic(v === 'on')}
                  ariaLabel={t.onboarding.stepMusic}
                />
              </div>

              {/* Language */}
              <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                <p className="text-txt-s">{t.onboarding.stepLang}</p>
                <ToggleSwitch
                  options={[{ label: '[EN]', value: 'en' }, { label: '[ES]', value: 'es' }]}
                  value={lang}
                  onChange={(v) => handleLang(v)}
                  ariaLabel={t.onboarding.stepLang}
                />
              </div>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          <div className="onboarding-actions-inner">
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
            <button type="button" onClick={() => goToStep(3)} className="btn-secondary font-mono" style={{ color: 'var(--color-blue-500)', borderColor: 'var(--color-blue-500)' }} data-sound="interactive">{t.onboarding.stepContinue}</button>
          </div>
        </div>

        <StepBar step={2} />
      </PreloadShell>
    );
  }

  // ── Step 3: Destination ───────────────────────────────────────
  return (
    <PreloadShell>
      <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
        {phase3 !== 'idle' && phase3 !== 'done' && (
          <p className="text-txt-base">
            {descText}
            {(phase3 === 'typing' || phase3 === 'pausing') && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor3}</span>}
          </p>
        )}
        {phase3 === 'done' && (
          <p className="text-txt-base" dangerouslySetInnerHTML={{ __html: t.onboarding.stepDesc }} />
        )}

        {phase3 === 'done' && (
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <p className="text-txt-s">{t.onboarding.stepDestination}</p>
            <div className="flex flex-wrap" style={{ gap: 'var(--gap-block)' }}>
              {NAV_LINKS.map(({ labelKey, path }) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => onComplete(path)}
                  className="btn-secondary btn-underline-hover font-mono"
                  style={{ ...activeStyle(true), flex: '1 1 auto' }}
                  data-sound="interactive"
                >
                  {t.nav[labelKey]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="onboarding-actions">
        <div className="onboarding-actions-inner">
          <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
        </div>
      </div>
      <StepBar step={3} />
    </PreloadShell>
  );
}
