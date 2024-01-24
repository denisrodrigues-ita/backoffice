"use client";

import React from "react";
import NavTools from "@/components/molecules/NavTools";
import { DropItems } from "@/interfaces";
import { toast } from "react-toastify";
import { apiEngaged } from "@/services";

const Engaged = () => {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataEngageds, setDataEngageds] = React.useState();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handlePrint = () => {
    window.print();
  };

  React.useEffect(() => {
    const fetchEngageds = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        if (token === null) {
          toast.error("Ops, algo deu errado!");
          return;
        }

        const { result, response } = await apiEngaged.getEngageds(token);
        if (response.ok) {
          setDataEngageds(result);
        }
      } catch (error) {
        toast.error(`Ops, algo deu errado! ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEngageds();
  }, []);
  
console.log(dataEngageds)

  const dropItems: DropItems[] = [
    {
      name: "Nome",
      type: "button",
      onClick: () => {},
    },
    {
      name: "Presença",
      type: "button",
      onClick: () => {},
    },
  ];

  return (
    <section>
      <NavTools
        toast={toast}
        handlePrint={handlePrint}
        dropItems={dropItems}
        search={search}
        handleSearch={handleSearch}
      />
    </section>
  );
};

export default Engaged;
