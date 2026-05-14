import { NavLink } from 'react-router-dom';
import { useFocused } from '../../hooks/useFocused';

interface NavItemProps {
  label: string;
  to: string;
  tooltip: string;
}

export function NavItem({ label, to, tooltip }: NavItemProps) {
  const { focused, focusProps } = useFocused();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `btn-nav has-tooltip${isActive ? ' btn-nav--active' : ''}`}
      {...focusProps}
    >
      {({ isActive }) => (
        <>
          {(isActive || focused) && <span className="desktop-inline">&gt; </span>}
          {label}
          <span className="tooltip">{tooltip}</span>
        </>
      )}
    </NavLink>
  );
}
