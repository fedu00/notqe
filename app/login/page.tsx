"use client";
import "./login.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login your account</h2>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <input
          type="text"
          placeholder="enter your email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="enter your password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
        <button type="submit">log in</button>
      </form>
    </div>
  );
}
