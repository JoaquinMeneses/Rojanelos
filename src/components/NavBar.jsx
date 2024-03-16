"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";

const links = [
  { key: "leaderboard", label: "Leaderboard", href: "/leaderboard" },
  { key: "lands", label: "Lands", href: "/lands" },
  { key: "specks", label: "Specks", href: "/specks" },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand justify="start">
        <Link color="foreground" href="/">
          <Image width={52} alt="Logo Rojan" src="/favicon.png" />
          <p className="font-bold text-inherit">ROJANELOS</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {links.map(({ key, label, href }) => (
          <NavbarItem key={key} isActive>
            <Link
              color={pathname === href ? "primary" : "foreground"}
              href={href}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
