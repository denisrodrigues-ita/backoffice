import { InputProps, ModalProps } from "@/interfaces";
import React from "react";

const Input: React.FC<InputProps & ModalProps> = ({
  type,
  value,
  onChange,
  setPropsModal,
  placeholder,
}) => {
  return (
    <input
      onClick={() => setPropsModal((prev) => ({ ...prev, dropdownIndex: -1 }))}
      className="rounded-lg p-2 w-full font-medium
    dark:bg-black-dark dark:text-gray-dark focus:outline-none 
    placeholder:text-center sm:placeholder:text-left text-center sm:text-left ml-4 sm:ml-0"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
