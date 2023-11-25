"use client";

import React from "react";
import Link from "next/link";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";
import { Dropdown, ToggleTheme } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { useStore } from "@/store";

const Header = () => {
  const [isOpenDropdown, setIsOpenDropdown] = React.useState(false);

  const { user, setUser } = useStore();

  const handleName = () => {
    const groomName = user?.user?.groom_name?.split(" ")[0];
    const brideName = user?.user?.bride_name?.split(" ")[0];

    if (groomName && brideName) {
      return `${groomName} e ${brideName}`;
    }

    if (groomName) {
      return groomName;
    }
    if (brideName) {
      return brideName;
    }
    return "Usuário";
  };

  const handleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const dropProps = [
    {
      name: "Logout",
      onClick: () => {
        alert("Logout");
      },
    },
  ];

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
          <div className="relative">
            <Button onClick={handleDropdown} type="button" style="btn1">
              {handleName()}
              <FiChevronDown
                className={`${
                  isOpenDropdown
                    ? "-rotate-180 duration-300"
                    : "rotate-0 duration-300"
                }`}
              />
            </Button>
            {isOpenDropdown && (
              <Dropdown translate="-translate-x-3" dropdownItems={dropProps} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
