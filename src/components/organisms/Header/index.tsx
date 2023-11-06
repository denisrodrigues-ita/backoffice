"use client";

import React from "react";
import Link from "next/link";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";
import { ToggleTheme } from "@/components/molecules";
import { Button } from "@/components/atoms";

const Header = () => {
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false);

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <header>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <ToggleTheme />
        <div className="flex mt-8 sm:mt-0 justify-between gap-4 items-center w-full">
          <Link href="/">
            <DdevSVG
              style={{ width: "10rem", height: "4rem" }}
              className="fill-blue-light-50 dark:fill-white-light"
            />
          </Link>
          <Button onClick={handleDropdown} type="button" style="btn1">
            User name{" "}
            <FiChevronDown
              className={`${
                isOpenDropdown
                  ? "-rotate-180 duration-300"
                  : "rotate-0 duration-300"
              }`}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
