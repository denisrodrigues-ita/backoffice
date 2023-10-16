import React from "react";
import Link from "next/link";
import { routes } from "@/json";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <DdevSVG style={{ width: "12rem", height: "4rem", fill: "#000" }} />
      </Link>
      <nav className="flex gap-4">
        <ul className="flex gap-4">
          {routes.map(({ route, title }) => (
            <li key={title}>
              <Link href={route}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="flex gap-2 items-center p-2">
        User name <FiChevronDown />
      </button>
    </header>
  );
};

export default Header;
