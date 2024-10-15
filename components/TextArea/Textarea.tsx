"use client";
import "./Textarea.scss";

interface TextareaType {
  value: string;
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  placeholder: string;
  errorMessage?: string;
}

export default function Textarea({
  value,
  onChange,
  placeholder,
}: TextareaType) {
  return (
    <div className="textarea">
      <textarea
        className="textarea__field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
