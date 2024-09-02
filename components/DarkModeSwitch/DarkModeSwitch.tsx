"use client";
import "./DarkModeSwitch.css";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { toggleTheme } from "@/redux/store/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DarkModeSwitch() {
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  const dispatch = useDispatch();

  return (
    <button
      className={`switch_btn ${darkModeTheme && "dark_btn"} `}
      onClick={() => {
        dispatch(toggleTheme());
      }}
    >
      <FaRegSun className="icon_sun" color={"#fcbd90"} size={24} />
      <FaRegMoon className="icon_moon" color={"#22252a"} size={24} />
      <div
        className={`icon_background ${
          darkModeTheme ? "icon_background_dark" : "icon_background_light"
        }`}
      ></div>
    </button>
  );
}
