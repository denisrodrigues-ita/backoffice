import { Button, Input } from "@/components/atoms";
import { AddGuest } from "@/components/organisms";
import AddEngaged from "@/components/organisms/AddEngaged";
import React from "react";
import { Dropdown } from "..";
import { usePathname } from "next/navigation";
import { NavToolsProps } from "./interface";

const NavTools: React.FC<NavToolsProps> = ({
  toast,
  handlePrint,
  dropItems,
  search,
  handleSearch,
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row w-full md:w-full sm:w-fit mb-4 gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        {pathname === "/" ? (
          <AddGuest toast={toast} />
        ) : (
          <AddEngaged toast={toast} />
        )}

        <Button style="btn2" type="button" onClick={handlePrint}>
          Imprimir
        </Button>
        <div className="relative">
          <Dropdown
            style="btnDropdown"
            dropItems={dropItems}
            title={"Filtrar"}
          />
        </div>
      </div>
      <div className="md:w-full xl:w-96">
        <Input
          type="text"
          onChange={(e) => handleSearch(e)}
          value={search}
          placeholder="Pesquisar"
          variant="search"
        />
      </div>
    </div>
  );
};

export default NavTools;
