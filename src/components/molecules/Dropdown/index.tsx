import React from "react";
import { DropdownArrayProps } from "./interface";
import "./dropdown.css";

const Dropdown: React.FC<DropdownArrayProps> = ({ dropdownItems, translate }) => {
  return (
    <div className={`dropdown ${translate}`}>
      <ul className="dropUl" aria-labelledby="dropdownDefaultButton">
        {dropdownItems.map((drop) => (
          <li key={drop.name}>
            <button className="dropLi" onClick={drop.onClick}>
              {drop.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
