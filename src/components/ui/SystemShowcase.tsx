import { useT } from '../../i18n';
import { StatusChip } from './StatusChip';

const COLORS = [
  { name: 'zinc-50', var: '--color-zinc-50', value: '#FAFAFA', role: { es: 'Texto máximo contraste', en: 'Max contrast text' }, contrast: '19.2:1' },
  { name: 'zinc-400', var: '--color-zinc-400', value: '#A3A3A3', role: { es: 'Texto base', en: 'Base text' }, contrast: '8.0:1' },
  { name: 'zinc-900', var: '--color-zinc-900', value: '#2A2A2A', role: { es: 'Bordes', en: 'Borders' }, contrast: '1.4:1' },
  { name: 'blue-500', var: '--color-blue-500', value: '#0086FF', role: { es: 'Acento interactivo', en: 'Interactive accent' }, contrast: '5.6:1' },
  { name: 'blue-950', var: '--color-blue-950', value: '#010A1B', role: { es: 'Fondo de superficie', en: 'Surface background' }, contrast: '1.0:1' },
  { name: 'orange', var: '--color-orange', value: '#F97316', role: { es: 'Solo valores numéricos', en: 'Numeric values only' }, contrast: '7.2:1' },
];

const TYPE_SCALE = [
  { className: 'text-txt-xxl', name: 'txt-xxl', size: '20px', weight: '800', lineHeight: '1.3', color: 'zinc-100' },
  { className: 'text-txt-xl', name: 'txt-xl', size: '18px', weight: '700', lineHeight: '1.4', color: 'zinc-200' },
  { className: 'text-txt-l', name: 'txt-l', size: '16px', weight: '600', lineHeight: '1.4', color: 'zinc-300' },
  { className: 'text-txt-base', name: 'txt-base', size: '14px', weight: '400', lineHeight: '1.5', color: 'zinc-400' },
  { className: 'text-txt-s', name: 'txt-s', size: '12px', weight: '300', lineHeight: '1.5', color: 'zinc-500' },
  { className: 'text-txt-xs', name: 'txt-xs', size: '10px', weight: '300', lineHeight: '1.5', color: 'zinc-600' },
];

const SPACING_SCALE = [
  { name: 'gap-page', remMobile: 3, remDesktop: 4 },
  { name: 'gap-section', remMobile: 1.5, remDesktop: 2 },
  { name: 'gap-label', remMobile: 0.75, remDesktop: 1 },
  { name: 'gap-card', remMobile: 0.5, remDesktop: 0.5 },
  { name: 'gap-block', remMobile: 0.25, remDesktop: 0.25 },
];

const CURSOR_STATES: { name: string; color: string; svg: string }[] = [
  {
    name: 'idle',
    color: '#FAFAFA',
    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><line x1='18' y1='2' x2='18' y2='34' stroke='%23FAFAFA' stroke-width='1'/><line x1='2' y1='18' x2='34' y2='18' stroke='%23FAFAFA' stroke-width='1'/></svg>",
  },
  {
    name: 'hover',
    color: '#FAFAFA',
    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'><line x1='18' y1='2' x2='18' y2='15' stroke='%23FAFAFA' stroke-width='1'/><line x1='18' y1='21' x2='18' y2='34' stroke='%23FAFAFA' stroke-width='1'/><line x1='2' y1='18' x2='15' y2='18' stroke='%23FAFAFA' stroke-width='1'/><line x1='21' y1='18' x2='34' y2='18' stroke='%23FAFAFA' stroke-width='1'/><circle cx='18' cy='18' r='3' fill='%23FAFAFA' stroke='%23FAFAFA' stroke-width='1'/></svg>",
  },
  {
    name: 'active',
    color: '#0086FF',
    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><line x1='15' y1='2' x2='15' y2='12' stroke='%230086FF' stroke-width='1'/><line x1='15' y1='18' x2='15' y2='28' stroke='%230086FF' stroke-width='1'/><line x1='2' y1='15' x2='12' y2='15' stroke='%230086FF' stroke-width='1'/><line x1='18' y1='15' x2='28' y2='15' stroke='%230086FF' stroke-width='1'/><circle cx='15' cy='15' r='3' fill='%230086FF' stroke='%230086FF' stroke-width='1'/></svg>",
  },
];

export function SystemShowcase() {
  const { t, lang } = useT();

  return (
    <div className="flex flex-col" style={{ gap: 'var(--gap-section)' }}>
      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <span className="text-txt-base">[{t.system.colorLabel}]</span>
        <div className="color-swatch-grid">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <div style={{ width: '100%', height: '56px', background: c.value, border: 'var(--border-default)' }} />
              <span className="text-txt-base">{c.var}</span>
              <span className="text-txt-base">{c.value}</span>
              <span className="text-txt-base">{c.role[lang]}</span>
              <span className="text-txt-base">WCAG {c.contrast}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <span className="text-txt-base">[{t.system.typeLabel}]</span>
        <table className="type-table">
          <thead>
            <tr>
              <th className="text-txt-base">{t.system.typeColClass}</th>
              <th className="text-txt-base">{t.system.typeColFont}</th>
              <th className="text-txt-base">{t.system.typeColSize}</th>
              <th className="text-txt-base">{t.system.typeColWeight}</th>
              <th className="text-txt-base">{t.system.typeColLineHeight}</th>
              <th className="text-txt-base">{t.system.typeColColor}</th>
            </tr>
          </thead>
          <tbody>
            {TYPE_SCALE.map((s) => (
              <tr key={s.className}>
                <td><span className={s.className}>{s.name}</span></td>
                <td className="text-txt-base" style={{ fontFamily: "'Roboto Mono', monospace" }}>Roboto Mono</td>
                <td className="text-txt-base">{s.size}</td>
                <td className="text-txt-base">{s.weight}</td>
                <td className="text-txt-base">{s.lineHeight}</td>
                <td className="text-txt-base">{s.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <span className="text-txt-base">[{t.system.spacingLabel}]</span>
        <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          {SPACING_SCALE.map((s) => (
            <div key={s.name} className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <div className="flex items-center" style={{ gap: 'var(--gap-card)' }}>
                <div style={{ height: '8px', width: `${s.remMobile * 16}px`, background: 'var(--color-blue-500)' }} />
                {s.remDesktop !== s.remMobile && (
                  <div style={{ height: '8px', width: `${s.remDesktop * 16}px`, background: 'var(--color-orange)' }} />
                )}
              </div>
              <span className="text-txt-xs">
                {s.name} · {s.remMobile}rem{s.remDesktop !== s.remMobile ? ` → ${s.remDesktop}rem` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <span className="text-txt-base">[{t.system.componentsLabel}]</span>
        <div className="flex flex-wrap items-center" style={{ gap: 'var(--gap-card)' }}>
          <span className="chip metric-chip">+18% · leads</span>
          <StatusChip status="Live" />
        </div>
        <div className="flex flex-wrap items-center" style={{ gap: 'var(--gap-card)' }}>
          <button type="button" className="btn-action" tabIndex={-1}>[CONTINUAR]</button>
          <button type="button" className="btn-secondary" tabIndex={-1}>[SALTAR]</button>
          <button type="button" className="btn-nav btn-nav--active" tabIndex={-1}>[HOME]</button>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <span className="text-txt-base">[{t.system.cursorLabel}]</span>
        <div className="flex flex-wrap" style={{ gap: 'var(--gap-card)' }}>
          {CURSOR_STATES.map((c) => (
            <div key={c.name} className="flex flex-col items-center" style={{ gap: 'var(--gap-block)', width: '72px' }}>
              <div
                style={{ width: '48px', height: '48px', border: 'var(--border-default)', backgroundImage: `url("data:image/svg+xml,${c.svg}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              />
              <span className="text-txt-xs">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
