import React from "react";
import { InputProps, LabelProps, ModalProps } from "@/interfaces";
import { Input, Label } from "@/components/atoms";

const CustomInput: React.FC<InputProps & LabelProps & ModalProps> = ({
  type,
  value,
  onChange,
  placeholder,
  setPropsModal,
  children,
}) => {
  return (
    <div className="print:hidden flex justify-between items-center 
    border-2 border-blue-light-50 dark:border-gray-dark rounded-lg w-full lg:w-1/2 xl:w-1/3">
      <Label>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          setPropsModal={setPropsModal}
        />
      </Label>
      {children}
    </div>
  );
};

export default CustomInput;
