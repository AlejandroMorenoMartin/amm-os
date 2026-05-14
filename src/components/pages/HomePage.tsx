import { useRef, useState } from 'react';
import { useT } from '../../i18n';
import { useAppStore } from '../../store/useAppStore';
import { LinkExternal } from '../ui/LinkExternal';
import { PageTitle } from '../ui/PageTitle';
import { SectionLabel } from '../ui/SectionLabel';
import { TextBlock } from '../ui/TextBlock';

const EMAIL = 'alejandromorenomartin1990@gmail.com';

export function HomePage() {
  const { t } = useT();
  const { openImageModal } = useAppStore();
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleCopyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function handlePhotoClick() {
    const el = imgRef.current;
    openImageModal({
      src: '/profile.webp',
      title: t.sobreMi.photoAlt,
      width: el?.naturalWidth ?? 320,
      height: el?.naturalHeight ?? 320,
    });
  }

  return (
    <article className="flex-1 font-mono flex flex-col" style={{ gap: 'var(--gap-page)' }}>
      <PageTitle>{t.home.title}</PageTitle>

      <TextBlock>
        <SectionLabel>{t.home.sectionPhoto}</SectionLabel>
        <button
          onClick={handlePhotoClick}
          className="p-0 photo-btn photo-btn--half btn-no-focus has-tooltip"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          aria-label={t.sobreMi.photoAlt}
        >
          <img
            ref={imgRef}
            src="/profile.webp"
            alt={t.sobreMi.photoAlt}
            className="object-cover photo-border"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <span className="tooltip">{t.modal.open}</span>
        </button>
      </TextBlock>

      <TextBlock>
        <SectionLabel>{t.home.sectionRol}</SectionLabel>
        <span className="text-txt-base">
          <s>UX/UI Designer</s>{' — '}<s>Product Designer</s>{' — '}AI Product Designer
        </span>
      </TextBlock>

      <TextBlock>
        <SectionLabel>{t.home.sectionPerfil}</SectionLabel>
        <span className="text-txt-base">{t.home.perfil}</span>
      </TextBlock>

      <TextBlock>
        <SectionLabel>{t.home.sectionOffline}</SectionLabel>
        <span className="text-txt-base">{t.sobreMi.p4}</span>
      </TextBlock>

      <TextBlock>
        <SectionLabel>{t.home.sectionContacto}</SectionLabel>
        <div className="flex flex-col" style={{ gap: 'var(--gap-block)' }}>
          <LinkExternal href="https://www.linkedin.com/in/alejandromorenoproductdesigner/" tooltip={t.home.tooltipLinkedin}>
            {t.home.linkedin}
          </LinkExternal>
          <LinkExternal href="https://github.com/AlejandroMorenoMartin" tooltip={t.home.tooltipGithub}>
            {t.home.github}
          </LinkExternal>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="email-copy has-tooltip text-txt-base font-mono text-left"
          >
            {EMAIL}
            <span className="tooltip">
              {copied ? t.home.emailCopied : t.home.gmail}
            </span>
          </button>
        </div>
      </TextBlock>
    </article>
  );
}
