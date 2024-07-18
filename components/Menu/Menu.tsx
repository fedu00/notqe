"use client";
import "./Menu.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Menu() {
  const router = useRouter();
  const [showmenu, setShowMenu] = useState<boolean>(false);
  const isMobileSize: boolean = useMediaQuery({ query: "(max-width: 800px)" });

  if (!isMobileSize && showmenu) {
    setShowMenu(false);
  }

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      sessionStorage.removeItem("userNotqeEmail");
      sessionStorage.removeItem("userNotqeDoneTasks");
      sessionStorage.removeItem("userID");
      router.push("/");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };
  return (
    <div className="menu_container">
      <Logo bigSize={false} />
      {isMobileSize && (
        <RxHamburgerMenu
          className="hamburger_menu"
          onClick={() => {
            setShowMenu(!showmenu);
          }}
          size={40}
        />
      )}
      <ul className={`menu_list ${showmenu ? "show_menu" : ""}`}>
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
    </div>
  );
}
