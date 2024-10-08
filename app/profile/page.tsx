"use client";
import "./profile.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/redux/slices/userSlice/userSlice";
import { getUserName } from "@/redux/slices/userSlice/userSelectors";
import axios from "axios";

export default function ProfilePage() {
  const username = useSelector(getUserName);
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    dispatch(updateUserData(response.data.data));
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="profile theme-background">
      <h2 className="profile__title">welcome on your account {username}</h2>
      <p>
        Build your future brick by brick. The NOTQE application can help you
        with this - organize your tasks and check your plans for today before
        you start taking action. Check your progress and how much work you have
        done in the "experience" tab.
      </p>
    </div>
  );
}
