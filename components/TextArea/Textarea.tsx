"use client";
import { useDarkModeContext } from "@/context/userContext";
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
  const { darkMode } = useDarkModeContext();
  return (
    <div className={"textarea_container"}>
      <textarea
        className={`${inter.className} textarea_form ${
          darkMode && "textarea_for_dark"
        } ${showError && "error_active"}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={"error_message"}>{errorMessage}</p>}
    </div>
  );
}
