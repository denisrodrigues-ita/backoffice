"use client";

import React from "react";
import Link from "next/link";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";
import { ToggleTheme } from "..";

const Header = () => {
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false);

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <header>
      <div className="flex items-center justify-between">
        <ToggleTheme />
        <Link href="/">
          <DdevSVG
            style={{ width: "12rem", height: "4rem" }}
            className="fill-black dark:fill-white"
          />
        </Link>
        <button
          onClick={handleDropdown}
          type="button"
          className="flex gap-2 items-center py-2 px-4 bg-blue-light-50 dark:bg-gray-dark rounded-lg text-white-light dark:text-black-dark font-bold shadow"
        >
          User name{" "}
          <FiChevronDown
            className={`${
              isOpenDropdown
                ? "-rotate-180 duration-300"
                : "rotate-0 duration-300"
            }`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
