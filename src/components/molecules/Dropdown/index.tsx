import React from "react";
import { Button } from "@/components/atoms";
import { DropProps } from "@/interfaces";
import { useStore } from "@/store";

const Dropdown: React.FC<DropProps> = ({
  style,
  dropItems,
  guest,
  title,
  translateX,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useStore();

  let dropdownRef = React.useRef<HTMLDivElement>(null);
  let buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        buttonRef={buttonRef}
        style={style}
        data-dropdown-toggle="dropdown"
        type="button"
      >
        {title}
      </Button>

      <div
        ref={dropdownRef}
        id="dropdown"
        className={`${isOpen ? "" : "hidden"} ${
          translateX && translateX
        } mt-1 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700 z-10`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropItems.map((item) => (
            <li
              key={item.name}
              className={`${
                item.hidden && user?.user?.role !== "admin" ? "hidden" : ""
              }`}
            >
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
