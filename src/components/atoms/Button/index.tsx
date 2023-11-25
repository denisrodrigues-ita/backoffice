import React from "react";
import { ButtonProps } from "@/interfaces";
import "./button.css";

const Button: React.FC<ButtonProps> = ({ onClick, children, type, style }) => {
  return (
    <button type={type} className={`btn ${style}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
