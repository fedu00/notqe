"use client";
import "./profile.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/redux/slices/userSlice/userThunk";
import { getUserName } from "@/redux/slices/userSlice/userSelectors";
import { AppDispatch } from "@/redux/store";

export default function ProfilePage() {
  const username = useSelector(getUserName);
  const dispatch = useDispatch<AppDispatch>();

  const getUserDetails = async () => {
    dispatch(fetchUserDetails());
  };
  useEffect(() => {
    getUserDetails();
  }, [dispatch]);

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
