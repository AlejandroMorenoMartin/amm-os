import { forwardRef } from 'react';
import { useT } from '../../i18n';
import { NavItem } from './NavItem';

interface BottomBarProps {
  style?: React.CSSProperties;
}

export const BottomBar = forwardRef<HTMLElement, BottomBarProps>(function BottomBar({ style }, ref) {
  const { t } = useT();

  const navItems = [
    { label: t.nav.home,    to: '/' },
    { label: t.nav.trabajo, to: '/projects' },
    { label: t.nav.cv,      to: '/resume' },
    { label: t.nav.skills,  to: '/skills' },
  ];

  return (
    <nav
      ref={ref}
      style={style}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center font-mono shell-bar-bottom"
      aria-label="Main navigation"
    >
      <div className="w-full flex items-center" style={{ maxWidth: 'var(--shell-max-width)', paddingInline: 'var(--shell-padding)', paddingBlock: 'var(--shell-padding)' }}>
        <div className="flex items-center gap-2 nav-touch">
          {navItems.map((item) => (
            <NavItem key={item.to} label={item.label} to={item.to} />
          ))}
        </div>
        <span className="pointer-fine-block ml-auto text-txt-xs" aria-hidden="true">
          {'{ ← → navegar · Enter abrir · Esc cerrar }'}
        </span>
      </div>
    </nav>
  );
});
