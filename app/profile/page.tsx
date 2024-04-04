"use client";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage({ children }: any) {
  const [data, setData] = useState("nothing");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    console.log("user details", response.data);
    setData(response.data.data.email);
  };

  return (
    <div className="profile-container">
      <div className="profile_message">
        <h1>welcome on your account {data}</h1>
        <p>
          Build your future brick by brick. The NOTQE application can help you
          with this - organize your tasks and check your plans for today before
          you start taking action. Check your progress and how much work you
          have done in the "score" tab. If you have any comments about the
          application or know what is missing, please send your comments in the
          "feedback" tab.
        </p>
      </div>
    </div>
  );
}
