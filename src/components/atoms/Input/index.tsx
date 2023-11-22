import { InputProps } from "@/interfaces";
import React from "react";

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  onClick,
  placeholder,
  stylePropsInput,
}) => {
  return (
    <input
      className={`rounded-lg p-2 w-full font-medium
  dark:bg-black-dark dark:text-gray-dark focus:outline-none 
  placeholder:text-center md:placeholder:text-left text-center md:text-left ${
    stylePropsInput && stylePropsInput
  }`}
      onClick={() => {
        onClick && onClick();
      }}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  );
};

export default Input;
