"use client";
import "./DarkModeSwitch.css";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { useDarkModeContext } from "@/context/userContext";

export default function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <button
      className={`switch_btn ${darkMode && "dark_btn"} `}
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      <FaRegSun className="icon_sun" color={"#fcbd90"} size={24} />
      <FaRegMoon className="icon_moon" color={"#22252a"} size={24} />
      <div
        className={`icon_background ${
          darkMode ? "icon_background_dark" : "icon_background_light"
        }`}
      ></div>
    </button>
  );
}
