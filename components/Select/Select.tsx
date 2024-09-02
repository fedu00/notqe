"use client";
import "./Select.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const { ui } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  return (
    <select
      className={`select_field ${darkModeTheme && "select_field_dark"}`}
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
