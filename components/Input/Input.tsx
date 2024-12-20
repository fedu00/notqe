"use client";
import "./Input.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
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
  return (
    <div className="input">
      <input
        autoComplete="new-password"
        className="input__field"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <ErrorMessage errorMessage={errorMessage} showError={showError} />
    </div>
  );
}
