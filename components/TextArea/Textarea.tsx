"use client";
import "./Textarea.scss";
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
  return (
    <div className={"textarea"}>
      <textarea
        className={`${inter.className} ${"textarea__field"} ${
          showError && "textarea__field--error"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={"textarea__error"}>{errorMessage}</p>}
    </div>
  );
}
