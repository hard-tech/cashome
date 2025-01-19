import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import LogoutButton from "./LogoutButton";

export default function AppNavbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">CasHome</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <LogoutButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}