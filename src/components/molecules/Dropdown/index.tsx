import React from "react";
import { Button } from "@/components/atoms";
import { DropProps } from "@/interfaces";

const Dropdown: React.FC<DropProps> = ({ title, style, dropItems, guest }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        style={style}
        data-dropdown-toggle="dropdown"
        type="button"
      >
        {title}
      </Button>

      <div
        id="dropdown"
        className={`z-10 ${
          !isOpen && "hidden"
        } mt-1 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropItems.map((item) => (
            <li key={item.name}>
              {item.type === "button" && (
                <button
                  onClick={() => item.onClick && item.onClick(guest)}
                  className="block text-left p-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.name}
                </button>
              )}
              {item.type === "checkbox" && (
                <label className="whitespace-nowrap flex gap-2 p-2 cursor-pointer hover:bg-gray-100 w-full dark:hover:bg-gray-600">
                  <input
                    type="checkbox"
                    value="dark"
                    onChange={item.onChange}
                    checked={item.checked}
                  />
                  {item.name}
                </label>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
