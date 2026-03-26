import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { title } from "./primitives";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { LoginButton } from "./LoginButton";
import { useAppStore } from "@/store/store";
import UserIcon from "./UserIcon";
import { Spinner } from "@heroui/spinner";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import LogoutButton from "./LogoutButton";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

export const Navbar = () => {
  const isAuthenticated = useAppStore((store) => store.isAuthenticated);
  const isAuthLoading = useAppStore((store) => store.isAuthLoading);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <GithubIcon />
            <p className={title({ color: "violet", size: "xs" })}>GitSearch</p>
          </Link>
        </NavbarBrand>
        <div className="hidden sm:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {isAuthLoading ? (
            <Spinner size="sm" />
          ) : isAuthenticated ? (
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <UserIcon />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="logout">
                  <LogoutButton />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <LoginButton />
          )}
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className=" w-fit p-2 rounded-full">
          {isAuthLoading ? (
            <Spinner size="sm" />
          ) : isAuthenticated ? (
            <UserIcon />
          ) : (
            <LoginButton />
          )}
        </div>
        <div className="mx-4 mt-2 h-full flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="primary" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        {isAuthenticated ? (
          <NavbarMenuItem className="justify-self-end mb-10">
            <LogoutButton />
          </NavbarMenuItem>
        ) : null}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
