"use client";

import React from "react";

import { Loading } from "@/components/atoms";
import { Card, Toast } from "@/components/molecules";
import { ModalChangeStatus, TableGuests } from "@/components/organisms";
import { toast } from "react-toastify";
import { useStore } from "@/store";
import { DropItems } from "@/interfaces";
import NavTools from "@/components/molecules/NavTools";
import apiGuests from "@/services/apiGuests";

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

      <NavTools
        toast={toast}
        handlePrint={handlePrint}
        dropItems={dropItems}
        search={search}
        handleSearch={handleSearch}
      />

      {dataGuests && (
        <TableGuests
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
