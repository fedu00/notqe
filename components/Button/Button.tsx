"use client";
import "./Button.scss";
import { useRef } from "react";
import clsx from "clsx";
interface ButtonType {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  grayButton?: boolean;
}

export default function Button({
  text,
  onClick = () => {},
  type,
  grayButton,
}: ButtonType) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOnClick = () => {
    if (onClick != undefined) {
      onClick();
    }
    buttonRef.current?.classList.add("button--animation");
    setTimeout(() => {
      buttonRef.current?.classList.remove("button--animation");
    }, 301);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={clsx("button", grayButton && "button--gray")}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
}
