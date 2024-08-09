"use client";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { useDarkModeContext } from "@/context/userContext";
import axios from "axios";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("unknow");
  const { darkMode } = useDarkModeContext();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    sessionStorage.setItem("userNotqeId", response.data.data._id);
    sessionStorage.setItem("userID", response.data.data._id);
    sessionStorage.setItem(
      "userNotqeDoneTasks",
      JSON.stringify(response.data.data.doneTasks)
    );
    setUsername(response.data.data.username);
  };

  return (
    <div
      className={`${styles.profile_container} ${
        darkMode && styles.profil_container_dark
      } `}
    >
      <div
        className={`${styles.profile_message} ${
          darkMode && styles.profile_message_dark
        } `}
      >
        <h1>welcome on your account {username}</h1>
        <p>
          Build your future brick by brick. The NOTQE application can help you
          with this - organize your tasks and check your plans for today before
          you start taking action. Check your progress and how much work you
          have done in the "experience" tab.
        </p>
      </div>
    </div>
  );
}
