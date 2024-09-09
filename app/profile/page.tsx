"use client";
import "./profile.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/context/themeContext";
import { getUserData } from "@/redux/store/userSlice";
import { RootState } from "../../redux/store/store";
import axios from "axios";

export default function ProfilePage() {
  const { darkModeTheme } = useTheme();
  const { userData } = useSelector((state: RootState) => state);
  const { username } = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    dispatch(getUserData(response.data.data));
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
