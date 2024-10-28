"use client";
import "./profile.scss";
import { useAppDispatch } from "@/redux/hooks";
import { updateUserData } from "@/redux/slices/userSlice/userSlice";
import { useEffect } from "react";

export default function ProfilePageClient({ user }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateUserData(user));
  }, []);

  const { username } = user;
  return (
    <div className="profile theme-background">
      <h2 className="profile__title">
        Welcome on your account {username || "unknow"}
      </h2>
      <p>
        Build your future brick by brick. The NOTQE application can help you
        with this - organize your tasks and check your plans for today before
        you start taking action. Check your progress and how much work you have
        done in the "experience" tab.
      </p>
    </div>
  );
}
