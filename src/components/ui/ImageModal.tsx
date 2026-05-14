import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../i18n';

export function ImageModal() {
  const { imageModal, closeImageModal } = useAppStore();
  const { t } = useT();
  const [zoom, setZoom] = useState(100);
  const firstBtn = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageModal) return;
    setZoom(100);
    firstBtn.current?.focus();

    document.body.style.overflow = 'hidden';

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === '+') setZoom((z) => Math.min(200, z + 10));
      if (e.key === '-') setZoom((z) => Math.max(10, z - 10));
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [imageModal, closeImageModal]);

  if (!imageModal) return null;

  const ext = imageModal.src.split('.').pop()?.toUpperCase() ?? '';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0"
        style={{ background: 'rgba(0,0,0,0.7)', zIndex: 9999 }}
        onClick={closeImageModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={imageModal.title}
        className="fixed font-mono flex flex-col"
        style={{
          zIndex: 10000,
          top: '1rem',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 'var(--shell-max-width)',
          paddingInline: 'var(--shell-padding)',
        }}
      >
        <div
          className="flex flex-col"
          style={{
            height: '100%',
            background: 'var(--color-background)',
            border: 'var(--border-default)',
          }}
        >
          {/* Top */}
          <header
            className="flex items-center justify-between flex-shrink-0"
            style={{
              borderBottom: 'var(--border-default)',
              paddingInline: 'var(--shell-padding)',
              paddingBlock: 'var(--shell-padding)',
            }}
          >
            <div className="flex items-center" style={{ gap: '0.5rem' }}>
              <button
                ref={firstBtn}
                onClick={() => setZoom((z) => Math.max(10, z - 10))}
                disabled={zoom <= 10}
                className="btn-action has-tooltip"
                aria-label={t.modal.zoomOut}
              >
                [-]
                <span className="tooltip tooltip--down">{t.modal.zoomOut}</span>
              </button>
              <button
                onClick={() => setZoom(100)}
                disabled={zoom === 100}
                className="btn-action has-tooltip"
                aria-label={t.modal.zoomReset}
              >
                [100%]
                <span className="tooltip tooltip--down">{t.modal.zoomReset}</span>
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                disabled={zoom >= 200}
                className="btn-action has-tooltip"
                aria-label={t.modal.zoomIn}
              >
                [+]
                <span className="tooltip tooltip--down">{t.modal.zoomIn}</span>
              </button>
              <span className="text-txt-s" aria-hidden="true">{zoom}%</span>
              <span className="sr-only">{zoom}%</span>
            </div>
            <button
              onClick={closeImageModal}
              className="btn-action has-tooltip"
              aria-label={t.modal.close}
            >
              [X]
              <span className="tooltip tooltip--down">{t.modal.close}</span>
            </button>
          </header>

          {/* Cuerpo */}
          <div
            className="flex-1 overflow-auto"
            style={{ padding: 'var(--shell-padding)' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '100%',
                minHeight: '100%',
              }}
            >
              <img
                src={imageModal.src}
                alt={imageModal.title}
                style={{
                  display: 'block',
                  width: `${zoom}%`,
                  maxWidth: 'none',
                  flexShrink: 0,
                }}
              />
            </div>
          </div>

          {/* Bottom */}
          <footer
            className="flex items-center justify-between flex-shrink-0"
            style={{
              borderTop: 'var(--border-default)',
              paddingInline: 'var(--shell-padding)',
              paddingBlock: 'var(--shell-padding)',
            }}
          >
            <span className="text-txt-s">{imageModal.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-txt-s">{imageModal.width} x {imageModal.height}</span>
              <span className="text-txt-s">.{ext}</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
