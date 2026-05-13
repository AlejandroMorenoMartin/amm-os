import { useState } from 'react';
import { useT } from '../../i18n';
import { LinkExternal } from '../ui/LinkExternal';
import { TextBlock } from '../ui/TextBlock';

const ASCII_ART = [
  '   _   __  __ __  __ ',
  '  /_\\ |  \\/  |  \\/  |',
  ' / _ \\| |\\/| | |\\/| |',
  '/_/ \\_\\_|  |_|_|  |_|',
].join('\n');

const EMAIL = 'alejandromorenomartin1990@gmail.com';

export function HomePage() {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      {/* ASCII Art */}
      <pre
        role="img"
        aria-label="Alejandro Moreno Martín"
        className="text-txt-s leading-tight" style={{ color: 'var(--color-zinc-50)' }}
      >
        {ASCII_ART}
        <span className="sr-only">Alejandro Moreno Martín</span>
      </pre>

      <TextBlock>
        <span className="text-txt-s">{t.home.sectionNombre}</span>
        <span className="text-txt-base">{t.home.nombre}</span>
      </TextBlock>

      <TextBlock>
        <span className="text-txt-s">{t.home.sectionRol}</span>
        <span className="text-txt-base">{t.home.rol}</span>
      </TextBlock>

      <TextBlock>
        <span className="text-txt-s">{t.home.sectionPerfil}</span>
        <span className="text-txt-base">{t.home.perfil}</span>
      </TextBlock>

      <TextBlock>
        <span className="text-txt-s">{t.home.sectionContacto}</span>
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <LinkExternal href="https://www.linkedin.com/in/alejandromorenoproductdesigner/">
            {t.home.linkedin}
          </LinkExternal>
          <LinkExternal href="https://github.com/AlejandroMorenoMartin">
            {t.home.github}
          </LinkExternal>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="email-copy text-txt-base font-mono text-left"
          >
            <span className="email-copy-tooltip">
              {copied ? t.home.emailCopied : t.home.gmail}
            </span>
            {EMAIL}
          </button>
        </div>
      </TextBlock>
    </article>
  );
}
