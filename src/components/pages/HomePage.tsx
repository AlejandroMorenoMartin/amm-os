import { useT } from '../../i18n';
import { LinkExternal } from '../ui/LinkExternal';
import { TextBlock } from '../ui/TextBlock';

const ASCII_ART = [
  '   _   __  __ __  __ ',
  '  /_\\ |  \\/  |  \\/  |',
  ' / _ \\| |\\/| | |\\/| |',
  '/_/ \\_\\_|  |_|_|  |_|',
].join('\n');

export function HomePage() {
  const { t } = useT();

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
          <a
            href="mailto:alejandromorenomartin1990@gmail.com"
            className="link-external text-txt-base font-mono"
          >
            alejandromorenomartin1990@gmail.com
          </a>
        </div>
      </TextBlock>
    </article>
  );
}
