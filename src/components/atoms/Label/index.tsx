import React from "react";
import {LabelProps} from "@/interfaces";

const Label: React.FC<LabelProps> = ({ children }) => {
  return <label className="w-full">{children}</label>;
};

export default Label;
