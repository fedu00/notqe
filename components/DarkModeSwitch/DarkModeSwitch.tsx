"use client";
import "./DarkModeSwitch.css";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { useTheme } from "@/context/themeContext";

export default function DarkModeSwitch() {
  const { darkModeTheme, toggleTheme } = useTheme();

  return (
    <button
      className={`switch_btn ${darkModeTheme && "dark_btn"} `}
      onClick={toggleTheme}
    >
      <FaRegSun
        className="icon_sun"
        color={`${darkModeTheme ? "#fcbd90" : "#d0c2bd"}`}
        size={24}
      />
      <FaRegMoon className="icon_moon" color={"#22252a"} size={24} />
      <div
        className={`icon_background ${
          darkModeTheme ? "icon_background_dark" : "icon_background_light"
        }`}
      ></div>
    </button>
  );
}
