"use client";
import "./Select.css";

interface SelectType {
  data: string[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  value: string;
}

export default function Select({ data, onChange, value }: SelectType) {
  return (
    <select onChange={onChange} value={value}>
      {data.map((category: string) => (
        <option key={category}>{category}</option>
      ))}
    </select>
  );
}
