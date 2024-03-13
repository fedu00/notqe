"use client";
import "./profile.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage({ children }: any) {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successful!!!");
      router.push("/login");
    } catch (error: any) {
      console.log("logout failed", error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/userDetails");
    console.log("user details", response.data);
    setData(response.data.data._id);
  };

  return (
    <div className="profile-container">
      <h1>welcome on your account</h1>
      {children}
      <h2>{data}</h2>
      <button onClick={getUserDetails}>get user details</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
