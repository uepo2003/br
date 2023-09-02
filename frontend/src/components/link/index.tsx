import {
  Link as RouterLink,
  LinkProps,
  NavLink as RouterNavLink,
  NavLinkProps,
} from "react-router-dom";

export function Link({ children, ...props }: LinkProps): JSX.Element {
  return <RouterLink {...props}>{children}</RouterLink>;
}

export function NavLink({ children, ...props }: NavLinkProps): JSX.Element {
  return <RouterNavLink {...props}>{children}</RouterNavLink>;
}
