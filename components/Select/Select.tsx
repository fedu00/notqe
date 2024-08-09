"use client";
import styles from "./Select.module.css";

interface SelectType {
  data: string[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  value: string;
  placeholder: string;
  darkMode: boolean;
}
export default function Select({
  data,
  onChange,
  value,
  placeholder = "default",
  darkMode,
}: SelectType) {
  return (
    <select
      className={`${styles.select_field} ${
        darkMode && styles.select_field_dark
      }`}
      onChange={onChange}
      value={value}
    >
      <option value="default" disabled>
        {placeholder}
      </option>
      {data.map((category: string) => (
        <option key={category}>{category}</option>
      ))}
    </select>
  );
}
