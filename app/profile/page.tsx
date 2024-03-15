"use client";
import "./profile.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage({ children }: any) {
  const [data, setData] = useState("nothing");
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [userEmail, setUserEmail] = useState("");
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
    setUserEmail(response.data.data.email);
    setData(response.data.data._id);
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usersTasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userEmail: userEmail, task: task }),
      });

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-container">
      <h1>welcome on your account</h1>
      {children}
      <h2>{data}</h2>
      <button onClick={getUserDetails}>get user details</button>
      <button onClick={handleLogout}>logout</button>
      <div>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="enter title"
        />
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="enter description"
        />
        <button onClick={handleAddNote}>dodaj notatke</button>
      </div>
    </div>
  );
}
