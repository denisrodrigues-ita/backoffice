"use client";

import React from "react";
import { apiGuests } from "@/services";
import { Button, Input, Loading } from "@/components/atoms";
import { Card, Dropdown, Toast } from "@/components/molecules";
import { AddGuest, ModalChangeStatus, Table } from "@/components/organisms";
import { toast } from "react-toastify";
import { useStore } from "@/store";
import AddEngaged from "@/components/organisms/AddEngaged";
import "react-toastify/dist/ReactToastify.css";
import { DropItems } from "@/interfaces";

const Home = () => {
  const { user } = useStore();

  const [isLoading, setIsLoading] = React.useState(false);
  const [dataGuests, setDataGuests] = React.useState<any>();
  const [propsModal, setPropsModal] = React.useState({
    guestId: -1,
    isOpenModal: false,
    guestName: "",
    attendanceStatus: false,
    code: "",
    changeOn: "",
  });
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  React.useEffect(() => {
    const fetchGuests = async () => {
      try {
        setIsLoading(true);
        const { result, response } = await apiGuests.getGuests(
          user?.user?.id || 0
        );
        if (response.ok) {
          setDataGuests(result);
        }
      } catch (error) {
        toast.error(`Ops, algo deu errado! ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const sortByName = () => {
    try {
      if (!dataGuests || !dataGuests?.guests) return;
      const newArray = Object.values(dataGuests?.guests);

      const sortedArray = newArray.sort((a: any, b: any) => {
        const nomeA = a.name.toUpperCase();
        const nomeB = b.name.toUpperCase();
        if (nomeA < nomeB) {
          return -1;
        }
        if (nomeA > nomeB) {
          return 1;
        }
        return 0;
      });

      setDataGuests((prev: any) => ({ ...prev, guests: sortedArray }));
    } catch (error) {
      toast.warning(`Ops, algo deu errado! ${error}`);
    }
  };

  const sortByPresence = () => {
    try {
      if (!dataGuests || !dataGuests.guests) return;

      const newArray = Object.values(dataGuests.guests);

      const sortedArray = newArray.sort((a: any, b: any) => {
        if (a.attendance_status === b.attendance_status) {
          return 0;
        }
        return a.attendance_status ? -1 : 1;
      });

      setDataGuests((prev: any) => ({ ...prev, guests: sortedArray }));
    } catch (error) {
      toast.warning(`Ops, algo deu errado! ${error}`);
    }
  };

  const dropItems: DropItems[] = [
    {
      name: "Nome",
      type: "button",
      onClick: () => {
        sortByName();
      },
    },
    {
      name: "Presença",
      type: "button",
      onClick: () => {
        sortByPresence();
      },
    },
  ];

  if (isLoading) return <Loading />;
  return (
    <section>
      {dataGuests && <Card dataGuests={dataGuests} />}

      <div className="flex flex-col lg:flex-row w-full lg:w-full sm:w-fit mb-4 gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {user?.user?.role === "admin" && <AddEngaged toast={toast} />}
          <AddGuest toast={toast} />
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
        <div className="lg:w-full xl:w-96">
          <Input
            type="text"
            onChange={(e) => handleSearch(e)}
            value={search}
            placeholder="Pesquisar"
            variant="search"
          />
        </div>
      </div>

      {dataGuests && (
        <Table
          dataGuests={dataGuests}
          setPropsModal={setPropsModal}
          propsModal={propsModal}
          search={search}
        />
      )}
      <ModalChangeStatus
        propsModal={propsModal}
        setPropsModal={setPropsModal}
        toast={toast}
      />
      <Toast />
    </section>
  );
};

export default Home;
