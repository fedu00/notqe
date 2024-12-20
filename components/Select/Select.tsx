"use client";
import "./Select.scss";
import { BiSolidDownArrow } from "react-icons/bi";
import { ExtendedCategoryTaskType } from "@/types/ExtendedCategoryTaskType";
import { ExtendedImportanceLevelTaskType } from "@/types/ExtendedImportanceLevelTaskType";
interface SelectType {
  data: ExtendedCategoryTaskType[] | ExtendedImportanceLevelTaskType[];
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
    <div className="select">
      <select className="select__field" onChange={onChange} value={value}>
        <option value="default" disabled>
          {placeholder}
        </option>
        {data.map((category: string) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <BiSolidDownArrow className="select__arrow-icon" />
    </div>
  );
}
