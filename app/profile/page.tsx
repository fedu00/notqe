"use client";
import "./profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "@/redux/store/userSlice";

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("unknow");
  const { ui, userData } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    dispatch(getUserData(response.data.data));
    setUsername(response.data.data.username);
  };

  return (
    <div
      className={`profile_message ${darkModeTheme && "profile_message_dark"} `}
    >
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
