import { useMediaQuery } from "react-responsive";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { SCREENS } from "../responsive";
import { slide as Menu } from "react-burger-menu";
import menuStyles from "./menuStyles";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
  `}
`;

const NavItem = styled.li<{ menu?: boolean }>`
  ${tw`
    text-sm
    md:text-base
    text-black
    font-medium
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-200
    ease-in-out
    hover:text-gray-700
  `}

  ${({ menu }) =>
    menu &&
    css`
      ${tw`
      text-white
      text-xl
      mb-3
      focus:text-white
    `}
    `}
`;

export function NavItems() {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile)
    return (
      <Menu right styles={menuStyles}>
        <ListContainer>
          {NAV_LINKS.map(({ label, href }) => (
            <NavItem key={label} menu>
              <a href={href}>{label}</a>
            </NavItem>
          ))}
        </ListContainer>
      </Menu>
    );

  return (
    <ListContainer>
      {NAV_LINKS.map(({ label, href }) => (
        <NavItem key={label}>
          <a href={href}>{label}</a>
        </NavItem>
      ))}
    </ListContainer>
  );
}
