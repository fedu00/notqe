"use client";
import "./Menu.scss";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice/authSlice";
import { Josefin_Sans } from "next/font/google";
import { getAuth } from "@/redux/slices/authSlice/authSelectors";
import Button from "../Button/Button";
import usersApi from "@/apiClients/usersAPi";
import Link from "next/link";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import clsx from "clsx";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
// const baseUrl = https://notqe.vercel.app/profile/createTask || 'http://localhost:3000';
// const baseUrl = "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL;
const baseUrl = "http://localhost:3000";

type MenuElementsType = { href: string; text: string };
const menuElements: MenuElementsType[] = [
  { href: "/profile/createTask", text: "create task" },
  { href: "/profile/manageTask", text: "manage task" },
  { href: "/profile/experience", text: "experience" },
  { href: "/profile", text: "profile" },
];

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: "200",
});

export default function Menu() {
  const router = useRouter();
  const [showmenu, setShowMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobileSize: boolean = useMediaQuery({ query: "(max-width: 800px)" });
  const dispatch = useAppDispatch();
  const { isUserLogIn } = useAppSelector(getAuth);

  const handleMenuClick = () => {
    setShowMenu(false);
  };

  const toggleShowMenu = () => {
    setShowMenu(!showmenu);
  };
  const handleLogout = async () => {
    try {
      await usersApi.get("/logout");
      console.log("logout successful!!!");
      sessionStorage.removeItem("userState");
      router.push("/");
      dispatch(logout());
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
    if (!isUserLogIn) {
      setShowMenu(false);
    }
  }, [isMobileSize, showmenu, isUserLogIn]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="menu">
      <h1 className={clsx(josefin.className, "menu__logo")}>notqe</h1>
      {isMobileSize && isUserLogIn && (
        <RxHamburgerMenu
          className="menu__hamburger-icon"
          onClick={toggleShowMenu}
          size="40px"
        />
      )}
      <div className="menu__menu-container">
        {isUserLogIn && (
          <>
            <ul
              className={clsx(
                "menu__list",
                showmenu && "menu__list--show-menu"
              )}
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
                <Button
                  onClick={handleLogout}
                  text="log out"
                  grayButton={true}
                />
              </li>
              {isMobileSize && (
                <li>
                  <ThemeSwitch />
                </li>
              )}
            </ul>
          </>
        )}
        {!isMobileSize && <ThemeSwitch />}
      </div>
    </div>
  );
}
