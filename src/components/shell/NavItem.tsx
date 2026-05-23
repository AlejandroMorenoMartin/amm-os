import { NavLink } from 'react-router-dom';
import { useFocused } from '../../hooks/useFocused';

interface NavItemProps {
  label: string;
  to: string;
}

export function NavItem({ label, to }: NavItemProps) {
  const { focusProps } = useFocused();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `btn-nav${isActive ? ' btn-nav--active' : ''}`}
      data-sound="interactive"
      {...focusProps}
    >
      {() => label}
    </NavLink>
  );
}
