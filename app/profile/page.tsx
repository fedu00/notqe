"use client";
import "./profile.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/redux/store/userSlice";
import { RootState } from "../../redux/store/store";
import axios from "axios";

export default function ProfilePage() {
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
