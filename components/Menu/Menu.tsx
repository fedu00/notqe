"use client";
import "./Menu.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      router.push("/login");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };
  return (
    <div className="menu_container">
      <Logo />
      <ul>
        <li>
          <a href="http://localhost:3000/profile/createTask">create task</a>
        </li>
        <li>
          <a href="http://localhost:3000/profile/manageTask">manage task</a>
        </li>
        <li>
          <a href="http://localhost:3000/profile/score">score</a>
        </li>
        <li>
          <a href="http://localhost:3000/profile">profile</a>
        </li>
        <li>
          <Button onClick={handleLogout} text="log out" test={true} />
        </li>
      </ul>
    </div>
  );
}
