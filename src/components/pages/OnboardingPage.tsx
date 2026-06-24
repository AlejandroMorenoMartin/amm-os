import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useSound, playTyping } from '../../hooks/useSound';
import { useT } from '../../i18n';
import { PreloadShell } from '../shell/PreloadShell';
import { ToggleSwitch } from '../ui/ToggleSwitch';

export const ONBOARDING_STEP_COUNT = 4;

interface OnboardingPageProps {
  step: number;
  onStepChange: (step: number) => void;
  onComplete: (path: string) => void;
}

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

function getSessionStamp() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();
  return `${month}/${day}/${year}`;
}

function getTimeStamp(locale: string) {
  const now = new Date();
  return now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function SessionInfo() {
  const lang = useAppStore((s) => s.lang);
  const { t } = useT();
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  const [sessionDate] = useState(() => getSessionStamp());
  const [sessionTime, setSessionTime] = useState(() => getTimeStamp(locale));

  useEffect(() => {
    const interval = setInterval(() => setSessionTime(getTimeStamp(locale)), 1000);
    return () => clearInterval(interval);
  }, [locale]);

  return (
    <div className="onboarding-session-info">
      <p className="text-txt-s">{sessionDate}</p>
      <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>{sessionTime}</p>
      <p className="text-txt-s" style={{ color: 'var(--color-zinc-500)' }}>{t.home.location}</p>
    </div>
  );
}

function ProgressBar({ step, onBack, backLabel }: { step: number; onBack?: () => void; backLabel: string }) {
  const value = step / ONBOARDING_STEP_COUNT;
  return (
    <div className="flex items-center" style={{ gap: '1rem' }}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary has-tooltip"
          aria-label={backLabel}
          data-sound="interactive"
        >
          [&lt;]
          <span className="tooltip tooltip--down">{backLabel}</span>
        </button>
      )}
      <div className="onboarding-progress-track">
        <div className="onboarding-progress-fill" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  );
}

function OnboardingHeader({ step, onBack, backLabel }: { step: number; onBack?: () => void; backLabel: string }) {
  return (
    <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
      <SessionInfo />
      <ProgressBar step={step} onBack={onBack} backLabel={backLabel} />
    </div>
  );
}

function OptionGrid({ options, value, onChange }: { options: { value: string; label: string }[]; value: string | null; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className="onboarding-option"
          aria-pressed={value === opt.value}
          data-sound="interactive"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function OnboardingPage({ step, onStepChange, onComplete }: OnboardingPageProps) {
  const { lang, setLang, soundEnabled, toggleSound, musicEnabled, toggleMusic, volume, setVolume, onboardingAnswers, setOnboardingAnswer } = useAppStore();
  const { playClick } = useSound();
  const { t } = useT();

  // Step 1 — boot lines
  const [visibleLines, setVisibleLines] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  // Step 2 — welcome typewriter
  const [phase2, setPhase2] = useState<Phase>('idle');

  const profile = onboardingAnswers.profile ?? null;
  const profileOther = onboardingAnswers.profileOther ?? '';
  const goal = onboardingAnswers.goal ?? null;
  const profileReady = profile === 'other' ? profileOther.trim().length > 0 : !!profile;

  function goToStep(next: number) {
    onStepChange(next);
  }

  function goBack() {
    onStepChange(step - 1);
  }

  // Boot animation
  useEffect(() => {
    if (step !== 1) return;
    const delay = 2500 / 7;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 7; i++) {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === 6) {
          timers.push(setTimeout(() => setBootDone(true), 400));
        }
      }, delay * (i + 1)));
    }
    return () => timers.forEach(clearTimeout);
  }, [step]);

  // Skip boot with Enter
  useEffect(() => {
    if (step !== 1) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Enter') return;
      if (!bootDone) {
        setVisibleLines(7);
        setBootDone(true);
      } else {
        goToStep(2);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, bootDone]);

  // Step 2 welcome typewriter trigger
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

  // Skip onboarding with Enter (step 2+)
  useEffect(() => {
    if (step === 1) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Enter') onComplete('/'); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onComplete]);

  const welcomeText = useTypewriter(t.onboarding.welcome, phase2 === 'typing', () => setPhase2('pausing'), playTyping);
  const cursor2 = useCursor(phase2 === 'typing');

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

  function handleGoalComplete() {
    const selected = t.onboarding.stepGoalOptions.find((opt) => opt.value === goal);
    onComplete(selected?.path ?? '/');
  }

  // ── Step 1: Boot ──────────────────────────────────────────────
  if (step === 1) {
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
          <OnboardingHeader step={step} backLabel={t.onboarding.stepBack} />

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            {[t.boot.line1, t.boot.line2, t.boot.line3, t.boot.line4, t.boot.line5, t.boot.line6, t.boot.line7]
              .slice(0, visibleLines)
              .map((line, i) => {
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
        </div>

        <div className="onboarding-actions">
          <div className="onboarding-actions-inner">
            <button type="button" onClick={() => goToStep(2)} className="btn-nav btn-nav--active font-mono">{t.onboarding.stepContinue}</button>
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
          </div>
        </div>
      </PreloadShell>
    );
  }

  // ── Step 2: Welcome + Controls ─────────────────────────────────
  if (step === 2) {
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
          <OnboardingHeader step={step} backLabel={t.onboarding.stepBack} />

          <p className="text-txt-base">
            {phase2 === 'pausing' || phase2 === 'done' ? t.onboarding.welcome : welcomeText}
            {(phase2 === 'typing' || phase2 === 'pausing') && <span aria-hidden="true" style={{ color: 'var(--color-zinc-50)' }}>{cursor2}</span>}
          </p>

          {phase2 === 'done' && (
            <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
              <p className="text-txt-base">{t.onboarding.stepSetup}</p>

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
            <button type="button" onClick={() => goToStep(3)} className="btn-nav btn-nav--active font-mono">{t.onboarding.stepContinue}</button>
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
          </div>
        </div>
      </PreloadShell>
    );
  }

  // ── Step 3: Profile ───────────────────────────────────────────
  if (step === 3) {
    return (
      <PreloadShell>
        <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
          <OnboardingHeader step={step} onBack={goBack} backLabel={t.onboarding.stepBack} />

          <div className="flex flex-col" style={{ gap: '1rem' }}>
            <p className="text-txt-base">{t.onboarding.stepProfileTitle}</p>
            <OptionGrid
              options={t.onboarding.stepProfileOptions}
              value={profile}
              onChange={(v) => setOnboardingAnswer('profile', v)}
            />
            {profile === 'other' && (
              <input
                type="text"
                value={profileOther}
                onChange={(e) => setOnboardingAnswer('profileOther', e.target.value)}
                placeholder={t.onboarding.stepProfileOtherPlaceholder}
                aria-label={t.onboarding.stepProfileOtherPlaceholder}
                className="onboarding-option onboarding-option-detail"
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="onboarding-actions">
          <div className="onboarding-actions-inner">
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="btn-nav btn-nav--active font-mono"
              disabled={!profileReady}
            >
              {t.onboarding.stepContinue}
            </button>
            <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
          </div>
        </div>
      </PreloadShell>
    );
  }

  // ── Step 4: Goal ───────────────────────────────────────────────
  return (
    <PreloadShell>
      <div className="flex flex-col" style={{ gap: 'var(--gap-page)' }}>
        <OnboardingHeader step={step} onBack={goBack} backLabel={t.onboarding.stepBack} />

        <p className="text-txt-base" dangerouslySetInnerHTML={{ __html: t.onboarding.stepGoalIntro }} />

        <div className="flex flex-col" style={{ gap: '1rem' }}>
          <p className="text-txt-base">{t.onboarding.stepGoalTitle}</p>
          <OptionGrid
            options={t.onboarding.stepGoalOptions}
            value={goal}
            onChange={(v) => setOnboardingAnswer('goal', v)}
          />
        </div>
      </div>

      <div className="onboarding-actions">
        <div className="onboarding-actions-inner">
          <button
            type="button"
            onClick={handleGoalComplete}
            className="btn-nav btn-nav--active font-mono"
            disabled={!goal}
          >
            {t.onboarding.stepContinue}
          </button>
          <button type="button" onClick={() => onComplete('/')} className="btn-secondary font-mono" data-sound="interactive">{t.onboarding.stepSkip}</button>
        </div>
      </div>
    </PreloadShell>
  );
}
