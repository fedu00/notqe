"use client";
import "./Select.css";

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
  return (
    <select onChange={onChange} value={value}>
      <option value="default" disabled>
        {placeholder}
      </option>
      {data.map((category: string) => (
        <option key={category}>{category}</option>
      ))}
    </select>
  );
}
