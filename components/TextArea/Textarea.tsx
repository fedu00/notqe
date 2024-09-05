"use client";
import { useTheme } from "@/context/themeContext";
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
  const { darkModeTheme } = useTheme();
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
