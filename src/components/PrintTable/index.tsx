import { PrintTableProps } from "@/interfaces";
import React from "react";

const PrintTable: React.FC<PrintTableProps> = ({ onClick }) => {
  return (
    <button
      className="btn2"
      onClick={onClick}
    >
      Imprimir Lista
    </button>
  );
};

export default PrintTable;
