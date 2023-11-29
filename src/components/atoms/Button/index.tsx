import React from "react";
import { ButtonProps } from "@/interfaces";
import "./button.css";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type,
  style,
  buttonRef,
}) => {
  return (
    <button
      type={type}
      className={`btn ${style}`}
      onClick={onClick}
      ref={buttonRef}
    >
      {children}
    </button>
  );
};

export default Button;
