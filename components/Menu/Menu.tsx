"use client";
import styles from "./Menu.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useDarkModeContext } from "@/context/userContext";
import SwitchMode from "../SwitchMode/SwitchMode";

export default function Menu() {
  const router = useRouter();
  const [showmenu, setShowMenu] = useState<boolean>(false);
  const isMobileSize: boolean = useMediaQuery({ query: "(max-width: 800px)" });
  const { darkMode } = useDarkModeContext();

  if (!isMobileSize && showmenu) {
    setShowMenu(false);
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      sessionStorage.removeItem("userNotqeDoneTasks");
      sessionStorage.removeItem("userID");
      router.push("/");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };
  return (
    <div
      className={`${styles.menu_container} ${
        darkMode && styles.menu_container_dark
      }`}
    >
      <Logo bigSize={false} />
      {isMobileSize && (
        <RxHamburgerMenu
          className={styles.hamburger_menu}
          onClick={() => {
            setShowMenu(!showmenu);
          }}
          size={40}
        />
      )}
      <div className={styles.menu}>
        <ul className={`${styles.menu_list} ${showmenu && styles.show_menu}`}>
          <li>
            <Link
              //just for production
              // href={`https://notqe.vercel.app/profile/createTask`}
              href={`http://localhost:3000/profile/createTask`}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              create task
            </Link>
          </li>
          <li>
            <Link
              // href={`https://notqe.vercel.app/profile/manageTask`}
              href={`http://localhost:3000/profile/manageTask`}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              manage task
            </Link>
          </li>
          <li>
            <Link
              // href={`https://notqe.vercel.app/profile/experience`}
              href={`http://localhost:3000/profile/experience`}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              experience
            </Link>
          </li>
          <li>
            <Link
              // href={`https://notqe.vercel.app/profile`}
              href={`http://localhost:3000/profile`}
              onClick={() => {
                setShowMenu(false);
              }}
            >
              profile
            </Link>
          </li>
          <li>
            <Button onClick={handleLogout} text="log out" test={true} />
          </li>
        </ul>
        <SwitchMode />
      </div>
    </div>
  );
}
