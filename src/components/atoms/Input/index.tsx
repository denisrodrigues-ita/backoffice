import { InputProps } from "@/interfaces";
import React from "react";

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      className="rounded-lg border-2 border-blue-light-50 w-1/3 p-2 
      focus:outline-none focus:border-blue-400 dark:border-white-light dark:bg-black-dark dark:focus:border-slate-400 font-medium"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
