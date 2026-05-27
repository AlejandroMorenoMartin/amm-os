import { useState } from 'react';
import { useT } from '../../i18n';
import { AccordionCard } from '../ui/AccordionCard';
import { SectionLabel } from '../ui/SectionLabel';
import { usePageTitle } from '../../hooks/usePageTitle';

export function SkillsPage() {
  usePageTitle('Skills');
  const { t } = useT();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey((k) => (k === key ? null : key));

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      {/* Technical */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <SectionLabel>{t.skills.sectionTechnical}</SectionLabel>
        <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          <AccordionCard id="skill1" open={openKey === 'skill1'} onToggle={toggle} label={t.skills.skill1Label}>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelCapabilities}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill1Items.map((item) => (
                  <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelTools}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill1Tools.map((tool) => (
                  <li key={tool} className="text-txt-base"><span>&gt;</span> {tool}</li>
                ))}
              </ul>
            </div>
          </AccordionCard>

          <AccordionCard id="skill2" open={openKey === 'skill2'} onToggle={toggle} label={t.skills.skill2Label}>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelCapabilities}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill2Items.map((item) => (
                  <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelTools}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill2Tools.map((tool) => (
                  <li key={tool} className="text-txt-base"><span>&gt;</span> {tool}</li>
                ))}
              </ul>
            </div>
          </AccordionCard>

          <AccordionCard id="skill3" open={openKey === 'skill3'} onToggle={toggle} label={t.skills.skill3Label}>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelCapabilities}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill3Items.map((item) => (
                  <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <span className="card-label">{t.skills.labelTools}</span>
              <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
                {t.skills.skill3Tools.map((tool) => (
                  <li key={tool} className="text-txt-base"><span>&gt;</span> {tool}</li>
                ))}
              </ul>
            </div>
          </AccordionCard>
        </div>
      </div>

      {/* Human */}
      <div className="flex flex-col" style={{ gap: 'var(--gap-label)' }}>
        <SectionLabel>{t.skills.sectionHuman}</SectionLabel>
        <div className="flex flex-col" style={{ gap: 'var(--gap-card)' }}>
          <AccordionCard id="skill4" open={openKey === 'skill4'} onToggle={toggle} label={t.skills.skill4Label}>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              {t.skills.skill4Items.map((item) => (
                <li key={item} className="text-txt-base"><span>&gt;</span> {item}</li>
              ))}
            </ul>
          </AccordionCard>

          <AccordionCard id="lang" open={openKey === 'lang'} onToggle={toggle} label={t.skills.idiomas}>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
              <li className="text-txt-base"><span>&gt;</span> {t.skills.lang1Name} ({t.skills.lang1Level})</li>
              <li className="text-txt-base"><span>&gt;</span> {t.skills.lang2Name} ({t.skills.lang2Level})</li>
            </ul>
          </AccordionCard>
        </div>
      </div>
    </article>
  );
}
