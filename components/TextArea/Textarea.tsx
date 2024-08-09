import styles from "./Textarea.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface TextareaType {
  value: string;
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  placeholder: string;
  errorMessage?: string;
  showError?: boolean;
  darkMode: boolean;
}

export default function Textarea({
  value,
  onChange,
  placeholder,
  errorMessage,
  showError = false,
  darkMode,
}: TextareaType) {
  return (
    <div className={styles.textarea_container}>
      <textarea
        className={`${inter.className} ${styles.textarea_form} ${
          darkMode && styles.textarea_for_dark
        } ${showError && styles.error_active}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showError && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
}
