"use client";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("unknow");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    sessionStorage.setItem("userNotqeEmail", response.data.data.email);
    sessionStorage.setItem("userNotqeId", response.data.data._id);
    sessionStorage.setItem("userID", response.data.data._id);
    sessionStorage.setItem(
      "userNotqeDoneTasks",
      JSON.stringify(response.data.data.doneTasks)
    );
    setUsername(response.data.data.username);
  };

  return (
    <div className="profile-container">
      <div className="profile_message">
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
