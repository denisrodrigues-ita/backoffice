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
            className="fill-blue-light-50 dark:fill-white-light"
          />
        </Link>
        <button
          onClick={handleDropdown}
          type="button"
          className="btn1"
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
