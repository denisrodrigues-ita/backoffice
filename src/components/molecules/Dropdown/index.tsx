import { ModalProps } from "@/interfaces";
import React from "react";

const Dropdown: React.FC<ModalProps> = ({ setPropsModal }) => {
  return (
    <div
      id="dropdown"
      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 -translate-x-28"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <button
            onClick={() =>
              setPropsModal((prev) => ({
                ...prev,
                isOpenModal: true,
                changeOn: "presence",
                dropdownIndex: -1,
              }))
            }
            className="uppercase block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full dark:hover:text-white"
          >
            Presença
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              setPropsModal((prev) => ({
                ...prev,
                isOpenModal: true,
                changeOn: "name",
                dropdownIndex: -1,
              }))
            }
            className="uppercase block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 w-full dark:hover:text-white"
          >
            Nome
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
