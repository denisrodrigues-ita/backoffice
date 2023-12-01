import React from "react";
import { ButtonProps } from "./interface";
import "./button.css";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type,
  style,
  buttonRef,
  isLoading = false,
}) => {
  return (
    <button
      disabled={isLoading}
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
