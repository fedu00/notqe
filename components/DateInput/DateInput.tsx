"use client";
import "./DateInput.css";

interface DateInputType {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default function DateInput({ onChange }: DateInputType) {
  return (
    <div className="date_input_container">
      <input
        className="date_input test"
        onChange={onChange}
        type="date"
        id="date"
      />
    </div>
  );
}
