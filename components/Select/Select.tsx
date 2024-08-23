"use client";
import "./Select.css";
import { useDarkModeContext } from "@/context/userContext";

interface SelectType {
  data: string[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  value: string;
  placeholder: string;
}
export default function Select({
  data,
  onChange,
  value,
  placeholder = "default",
}: SelectType) {
  const { darkMode } = useDarkModeContext();
  return (
    <select
      className={`select_field ${darkMode && "select_field_dark"}`}
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
