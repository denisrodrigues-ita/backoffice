import { InputProps } from "@/interfaces";
import React from "react";

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
    className="rounded-lg p-2 w-full font-medium
    dark:bg-black-dark dark:text-gray-dark focus:outline-none"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
