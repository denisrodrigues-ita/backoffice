"use client";

import React from "react";
import Link from "next/link";
import { DdevSVG } from "@/assets";
import { FiChevronDown } from "react-icons/fi";
import { useStore } from "@/store";
import { Dropdown } from "@/components/molecules";
import initialState from "@/store/initialState";
import { useRouter } from "next/navigation";
import { DropItems } from "@/interfaces";

const Header: React.FC = () => {
  const router = useRouter();

  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

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

  const dropItems: DropItems[] = [
    {
      name: "logout",
      type: "button",
      onClick: () => {
        setUser(initialState);
        localStorage.setItem("token", "");
        router.push("/login");
      },
    },
    {
      name: "Tema escuro",
      type: "checkbox",
      checked: isDark,
      onChange: toggleTheme,
    },
  ];

  return (
    <header>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex mt-8 sm:mt-0 justify-between gap-4 items-center w-full">
          <Link href="/">
            <DdevSVG
              style={{ width: "10rem", height: "4rem" }}
              className="fill-blue-light-50 dark:fill-white-light"
            />
          </Link>
          <div className="relative">
            <Dropdown style="btn1" dropItems={dropItems} title={handleName()} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
