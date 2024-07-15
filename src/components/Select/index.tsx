import React, { FC, ReactNode } from "react";

interface SelectOption {
  value: string;
  label: ReactNode;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

const Select: FC<Props> = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
