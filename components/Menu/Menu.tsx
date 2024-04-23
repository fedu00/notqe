"use client";
import "./Menu.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

export default function Menu() {
  const { email, setEmail } = useUserContext();
  const router = useRouter();

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
      <ul>
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
