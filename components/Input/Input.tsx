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
  return (
    <div className="input_container">
      <input
        autoComplete="new-password"
        className={`${showError ? "error_active" : ""} input_form`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className="error_message">{errorMessage}</p>}
    </div>
  );
}
