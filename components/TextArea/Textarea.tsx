"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "./Textarea.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface TextareaType {
  value: string;
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  placeholder: string;
  errorMessage?: string;
  showError?: boolean;
}

export default function Textarea({
  value,
  onChange,
  placeholder,
  errorMessage,
  showError = false,
}: TextareaType) {
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  return (
    <div className={"textarea_container"}>
      <textarea
        className={`${inter.className} textarea_form ${
          darkModeTheme && "textarea_for_dark"
        } ${showError && "error_active"}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={"error_message"}>{errorMessage}</p>}
    </div>
  );
}
