"use client";
import "./profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDarkModeContext } from "@/context/userContext";

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
    <div className={`profile_message ${darkMode && "profile_message_dark"} `}>
      <h1>welcome on your account {username}</h1>
      <p>
        Build your future brick by brick. The NOTQE application can help you
        with this - organize your tasks and check your plans for today before
        you start taking action. Check your progress and how much work you have
        done in the "experience" tab.
      </p>
    </div>
  );
}
