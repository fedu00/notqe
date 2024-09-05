"use client";
import "./Select.css";
import { useTheme } from "@/context/themeContext";
import { BiSolidDownArrow } from "react-icons/bi";
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
  const { darkModeTheme } = useTheme();

  return (
    <div className="select_container">
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
      <BiSolidDownArrow className="select_arrow_icon" />
    </div>
  );
}
