"use client";
import "./Textarea.scss";
import clsx from "clsx";

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
    <div className="textarea">
      <textarea
        className={clsx(
          "textarea__field",
          showError && "textarea__field--error"
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className="textarea__error">{errorMessage}</p>}
    </div>
  );
}
