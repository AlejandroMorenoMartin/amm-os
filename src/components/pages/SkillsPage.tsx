import { useState } from 'react';
import { useT } from '../../i18n';
import { PageTitle } from '../ui/PageTitle';

export function SkillsPage() {
  const { t } = useT();

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-section)' }}>
      <PageTitle>{t.skills.title}</PageTitle>

      <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
        <SkillGroup
          label={t.skills.skill1Label}
          capabilities={t.skills.skill1Items}
          tools={t.skills.skill1Tools}
          labelCapabilities={t.skills.labelCapabilities}
          labelTools={t.skills.labelTools}
        />
        <SkillGroup
          label={t.skills.skill2Label}
          capabilities={t.skills.skill2Items}
          tools={t.skills.skill2Tools}
          labelCapabilities={t.skills.labelCapabilities}
          labelTools={t.skills.labelTools}
        />
        <SkillGroup
          label={t.skills.skill3Label}
          capabilities={t.skills.skill3Items}
          tools={t.skills.skill3Tools}
          labelCapabilities={t.skills.labelCapabilities}
          labelTools={t.skills.labelTools}
        />
        <LanguageGroup
          label={t.skills.idiomas}
          items={[
            `${t.skills.lang1Name} (${t.skills.lang1Level})`,
            `${t.skills.lang2Name} (${t.skills.lang2Level})`,
          ]}
        />
      </div>
    </article>
  );
}

interface SkillGroupProps {
  label: string;
  capabilities: string[];
  tools: string[];
  labelCapabilities: string;
  labelTools: string;
}

function SkillGroup({ label, capabilities, tools, labelCapabilities, labelTools }: SkillGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`skill-card${open ? ' skill-card--open' : ''}`}
      onClick={() => setOpen((o) => !o)}
      data-sound="interactive"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center justify-between skill-group-btn" style={{ padding: '0.5rem 1rem' }}>
        <span>{label}</span>
        <span style={{ flexShrink: 0, marginLeft: '1rem' }}>{open ? '[-]' : '[+]'}</span>
      </div>

      {open && (
        <div className="flex flex-col" style={{ gap: '1rem', padding: '0.5rem 1rem 1rem' }}>
          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{labelCapabilities}</span>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {capabilities.map((item) => (
                <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
            <span className="card-label">{labelTools}</span>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {tools.map((tool) => (
                <li key={tool} className="text-txt-base"><span>&gt;</span> {tool}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageGroup({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`skill-card${open ? ' skill-card--open' : ''}`}
      onClick={() => setOpen((o) => !o)}
      data-sound="interactive"
      style={{ cursor: 'pointer' }}
    >
      <div className="flex items-center justify-between skill-group-btn" style={{ padding: '0.5rem 1rem' }}>
        <span>{label}</span>
        <span style={{ flexShrink: 0, marginLeft: '1rem' }}>{open ? '[-]' : '[+]'}</span>
      </div>

      {open && (
        <ul className="flex flex-col" style={{ gap: 'var(--gap-block)', padding: '0.5rem 1rem 1rem' }}>
          {items.map((item) => (
            <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
