"use client";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/store/authSlice";
import { RootState } from "../../redux/store/store";
import "./Menu.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import Link from "next/link";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
// const baseUrl = https://notqe.vercel.app/profile/createTask || 'http://localhost:3000';
const baseUrl = "http://localhost:3000" || process.env.NEXT_PUBLIC_BASE_URL;

export default function Menu() {
  const router = useRouter();
  const [showmenu, setShowMenu] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobileSize: boolean = useMediaQuery({ query: "(max-width: 800px)" });
  const dispatch = useDispatch();
  const { auth, ui } = useSelector((state: RootState) => state);
  const { isUserLogIn } = auth;
  const { darkModeTheme } = ui;

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

  const handleMenuClick = () => {
    setShowMenu(false);
  };
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      sessionStorage.removeItem("userState");
      router.push("/");
      dispatch(logout());
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`menu_container ${darkModeTheme && "menu_container_dark"}`}>
      <Logo bigSize={false} />
      {isMobileSize && isUserLogIn && (
        <RxHamburgerMenu
          className={"hamburger_menu"}
          onClick={() => {
            setShowMenu(!showmenu);
          }}
          size={40}
        />
      )}
      <div className={"menu"}>
        {isUserLogIn && (
          <>
            <ul
              className={`menu_list ${showmenu && "show_menu"} ${
                darkModeTheme && "menu_list_dark"
              }`}
            >
              <li>
                <Link
                  href={`${baseUrl}/profile/createTask`}
                  onClick={handleMenuClick}
                >
                  create task
                </Link>
              </li>
              <li>
                <Link
                  href={`${baseUrl}/profile/manageTask`}
                  onClick={handleMenuClick}
                >
                  manage task
                </Link>
              </li>
              <li>
                <Link
                  href={`${baseUrl}/profile/experience`}
                  onClick={handleMenuClick}
                >
                  experience
                </Link>
              </li>
              <li>
                <Link href={`${baseUrl}/profile`} onClick={handleMenuClick}>
                  profile
                </Link>
              </li>
              <li>
                <Button onClick={handleLogout} text="log out" test={true} />
              </li>
              <li>
                <DarkModeSwitch />
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
