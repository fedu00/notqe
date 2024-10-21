"use client";
import "./profile.scss";
import { useEffect } from "react";
import { fetchUserDetails } from "@/redux/slices/userSlice/userThunk/fetchUserDetails";
import { getUserName } from "@/redux/slices/userSlice/userSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function ProfilePage() {
  const username = useAppSelector(getUserName);
  const dispatch = useAppDispatch();

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
