"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/json";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";
import { ToggleTheme, Card } from "..";

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
        <nav className="flex gap-4">
          <ul className="flex gap-4">
            {routes.map(({ route, title }) => (
              <li key={title}>
                <Link className="li-a" href={route}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleDropdown}
          type="button"
          className="flex gap-2 items-center py-2 px-4 bg-blue-light-100 dark:bg-gray-dark rounded text-white-light dark:text-black-dark font-bold shadow"
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
      <Card />
    </header>
  );
};

export default Header;
