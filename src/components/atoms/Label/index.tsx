import React from "react";
import { childrenlProps } from "@/interfaces";

const Label: React.FC<childrenlProps> = ({ children }) => {
  return <label className="w-full">{children}</label>;
};

export default Label;
