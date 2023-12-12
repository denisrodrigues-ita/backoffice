import React from "react";
import "./input.css";

interface CustomInputProps {
  placeholder: string;
  type: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  value?: string;
  variant: "login" | "search";
}

const Input: React.FC<CustomInputProps> = ({
  placeholder,
  type,
  label,
  register,
  onChange,
  value,
  variant
}) => {
  return (
    <div className="containerDiv">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        className={variant}
        type={type}
        id={label}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...register}
      />
    </div>
  );
};

export default Input;
