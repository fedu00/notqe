"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  return (
    <div className={`input_container`}>
      <input
        autoComplete="new-password"
        className={`${showError && "error_active"} input ${
          darkModeTheme && "input_dark"
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
