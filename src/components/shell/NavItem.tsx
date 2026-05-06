import { NavLink } from 'react-router-dom';
import { useFocused } from '../../hooks/useFocused';

interface NavItemProps {
  label: string;
  to: string;
}

export function NavItem({ label, to }: NavItemProps) {
  const { focused, focusProps } = useFocused();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `btn-nav${isActive ? ' btn-nav--active' : ''}`}
      {...focusProps}
    >
      {({ isActive }) => (
        <>
          {(isActive || focused) && <span className="desktop-inline">&gt; </span>}
          {label}
        </>
      )}
    </NavLink>
  );
}
