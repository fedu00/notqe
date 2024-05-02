"use client";
import "./Menu.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Menu() {
  const { setEmail } = useUserContext();
  const router = useRouter();
  const [showmenu, setShowMenu] = useState(false);
  const isMobileSize = useMediaQuery({ query: "(max-width: 800px)" });

  if (!isMobileSize && showmenu) {
    setShowMenu(false);
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      setEmail("");
      router.push("/");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };
  return (
    <div className="menu_container">
      <Logo />
      {isMobileSize && (
        <RxHamburgerMenu
          onClick={() => {
            setShowMenu(!showmenu);
          }}
          size={40}
        />
      )}
      <ul className={`menu_list ${showmenu ? "show_menu" : ""}`}>
        <li>
          <Link href={"http://localhost:3000/profile/createTask"}>
            create task
          </Link>
        </li>
        <li>
          <Link href={"http://localhost:3000/profile/manageTask"}>
            manage task
          </Link>
        </li>
        <li>
          <Link href={"http://localhost:3000/profile/experience"}>
            experience
          </Link>
        </li>
        <li>
          <Link href={"http://localhost:3000/profile"}>profile</Link>
        </li>
        <li>
          <Button onClick={handleLogout} text="log out" test={true} />
        </li>
      </ul>
    </div>
  );
}
