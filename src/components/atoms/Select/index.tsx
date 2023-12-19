import React from "react";

interface Option {
  value: "client" | "admin" | "Selecione um tipo de usuário";
}

interface SelectProps {
  options: Option[];
  onChange: (selectedValue: string) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    >
      {options.map((option) => (
        <option
          // className={`${
          //   option.selected ? "text-gray-500 dark:text-gray-400" : ""
          // }`}
          key={option.value}
          // selected={option.selected}
          value={option.value}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
