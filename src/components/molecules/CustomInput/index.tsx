import React from "react";
import { InputProps, LabelProps } from "@/interfaces";
import { Input, Label } from "@/components/atoms";

const CustomInput: React.FC<InputProps & LabelProps> = ({
  type,
  value,
  onChange,
  placeholder,
  children,
}) => {
  return (
    <div className="print:hidden flex justify-between items-center 
    border-2 border-blue-light-50 dark:border-gray-dark rounded-lg w-1/3">
      <Label>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </Label>
      {children}
    </div>
  );
};

export default CustomInput;
