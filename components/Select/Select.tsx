"use client";
import "./Select.css";

interface SelectType {
  data: string[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export default function Select({ data, onChange }: SelectType) {
  return (
    <select onChange={onChange}>
      {data.map((category: string) => (
        <option key={category}>{category}</option>
      ))}
      <option></option>
    </select>
  );
}
