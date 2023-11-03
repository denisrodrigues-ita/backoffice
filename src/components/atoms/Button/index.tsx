import React from "react";
import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ onClick, children, type, style }) => {
  return (
    <button type={type} className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
