"use client";
import "./Menu.scss";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Josefin_Sans } from "next/font/google";
import Button from "../Button/Button";
import clientApi from "@/apiClients/clientApi";
import Link from "next/link";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import clsx from "clsx";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type MenuElementsType = { href: string; text: string };

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "200",
});

export default function Menu({ id }: { id: string }) {
  const router = useRouter();
  const [showmenu, setShowMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobileSize: boolean = useMediaQuery({ query: "(max-width: 800px)" });

  const menuElements: MenuElementsType[] = [
    { href: `/profile/${id}/createTask`, text: "create task" },
    { href: `/profile/${id}/manageTask`, text: "manage task" },
    { href: `/profile/${id}/experience`, text: "experience" },
    { href: `/profile/${id}`, text: "profile" },
  ];

  const handleMenuClick = () => {
    setShowMenu(false);
  };

  const toggleShowMenu = () => {
    setShowMenu(!showmenu);
  };
  const handleLogout = async () => {
    try {
      await clientApi.get("/users/logout");
      console.log("logout successful!!!");
      sessionStorage.removeItem("userState");
      router.push("/");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileSize && showmenu) {
      setShowMenu(false);
    }
  }, [isMobileSize, showmenu]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="menu">
      <h1 className={clsx(josefin.className, "menu__logo")}>notqe</h1>
      {isMobileSize && (
        <RxHamburgerMenu
          className="menu__hamburger-icon"
          onClick={toggleShowMenu}
          size="40px"
        />
      )}
      <div className="menu__menu-container">
        <>
          <ul
            className={clsx("menu__list", showmenu && "menu__list--show-menu")}
          >
            {menuElements.map((menuElement) => (
              <li className="menu__element" key={menuElement.href}>
                <Link
                  href={`${baseUrl}${menuElement.href}`}
                  onClick={handleMenuClick}
                >
                  {menuElement.text}
                </Link>
              </li>
            ))}
            <li className="menu__element">
              <Button onClick={handleLogout} text="log out" grayButton={true} />
            </li>
            {isMobileSize && (
              <li>
                <ThemeSwitch />
              </li>
            )}
          </ul>
        </>
        {!isMobileSize && <ThemeSwitch />}
      </div>
    </div>
  );
}
