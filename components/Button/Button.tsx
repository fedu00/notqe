"use client";
import "./Button.css";
import { useRef } from "react";
interface ButtonType {
  text: string;
  onClick?: () => any | undefined;
  type?: "submit" | "reset" | "button";
  test?: boolean;
}

export default function Button({
  text,
  onClick = () => {},
  type,
  test,
}: ButtonType) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOnClick = () => {
    if (onClick != undefined) {
      onClick();
    }

    buttonRef.current?.classList.add("show-animation");

    setTimeout(() => {
      buttonRef.current?.classList.remove("show-animation");
    }, 301);
  };
  return (
    <button
      ref={buttonRef}
      type={type}
      className={`${test ? "test_button" : ""} button`}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
}
