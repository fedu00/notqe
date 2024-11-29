import "./ThemeWrapper.scss";
import React from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import clsx from "clsx";

type ThemeWrapperType = {
  children: React.ReactNode;
  directionColumn?: boolean;
};

export default function ThemeWrapper({
  children,
  directionColumn = false,
}: ThemeWrapperType) {
  return (
    <div
      className={clsx(
        directionColumn && "theme-wrapper--direction-column",
        "theme-wrapper"
      )}
    >
      <ThemeSwitch positionFix />
      {children}
    </div>
  );
}
