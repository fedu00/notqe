"use client";
import "./signup.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", user);

      console.log("signup success", response);
      router.push("/login");
    } catch (error: any) {
      console.log("signup error", error.message);
    }
  };
  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form
        onSubmit={(e) => {
          handleSignup(e);
        }}
      >
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <input
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button type="submit">create account</button>
      </form>
    </div>
  );
}
