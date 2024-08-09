import styles from "./Input.module.css";
interface InputType {
  type: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  errorMessage?: string;
  showError?: boolean;
  darkMode: boolean;
}

export default function Input({
  type,
  value,
  onChange,
  placeholder,
  errorMessage,
  showError = false,
  darkMode,
}: InputType) {
  return (
    <div className={styles.input_container}>
      <input
        autoComplete="new-password"
        className={`${showError && styles.error_active} ${styles.input} ${
          darkMode && styles.input_dark
        } `}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
}
