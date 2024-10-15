"use client";
import "./ThemeSwitch.scss";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { useTheme } from "@/context/themeContext";

export default function ThemeSwitch() {
  const { toggleTheme } = useTheme();

  return (
    <div className="switch-button" onClick={toggleTheme}>
      <FaRegSun className="switch-button__icon-sun" size="24px" />
      <FaRegMoon className="switch-button__icon-moon" size="24" />
    </div>
  );
}
