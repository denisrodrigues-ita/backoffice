import { PrintTableProps } from "@/interfaces";
import React from "react";

const Button: React.FC<PrintTableProps> = ({ onClick }) => {
  return (
    <button
      className="btn2"
      onClick={onClick}
    >
      Imprimir Lista
    </button>
  );
};

export default Button;
