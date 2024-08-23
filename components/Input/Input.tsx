"use client";
import { useDarkModeContext } from "@/context/userContext";
import "./Input.css";
interface InputType {
  type: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  errorMessage?: string;
  showError?: boolean;
}

export default function Input({
  type,
  value,
  onChange,
  placeholder,
  errorMessage,
  showError = false,
}: InputType) {
  const { darkMode } = useDarkModeContext();
  return (
    <div className={`input_container`}>
      <input
        autoComplete="new-password"
        className={`${showError && "error_active"} input ${
          darkMode && "input_dark"
        }
         `}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={"error_message"}>{errorMessage}</p>}
    </div>
  );
}
