"use client";

import React from "react";
import { api } from "@/services";
import { StatusProps } from "@/interfaces";
import { Button, Loading } from "@/components/atoms";
import { Card, Toast, CustomInput } from "@/components/molecules";
import { AddGuest, ModalChangeStatus, Table } from "@/components/organisms";
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<StatusProps["status"]>("success");
  const [dataGuests, setDataGuests] = React.useState();
  const [propsModal, setPropsModal] = React.useState({
    isOpenModal: false,
    guestName: "",
    attendanceStatus: false,
    code: "",
    changeOn: "",
    dropdownIndex: -1,
  });
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsToastOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isToastOpen]);

  React.useEffect(() => {
    const fetchGuests = async () => {
      try {
        const { result, response } = await api.getGuests(1, setIsLoading);
        if (response.ok) {
          setDataGuests(result);
        }
      } catch (error) {
        setIsToastOpen(true);
        setMessage(`Ops, algo deu errado! ${error}`);
        setStatus("error");
      }
    };
    fetchGuests();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Loading />;
  return (
    <section>
      {isToastOpen && (
        <Toast
          message={message}
          status={status}
          setIsToastOpen={setIsToastOpen}
        />
      )}
      {dataGuests && <Card dataGuests={dataGuests} />}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <AddGuest />
        <Button style="btn2" type="button" onClick={handlePrint}>
          Imprimir
        </Button>
        <CustomInput
          type="text"
          onChange={(e) => handleSearch(e)}
          value={search}
          placeholder="Pesquisar"
          setPropsModal={setPropsModal}
          onClick={() => {
            setPropsModal((prev) => ({ ...prev, dropdownIndex: -1 }));
          }}
          styleProps="lg:w-1/2 xl:w-1/3"
          stylePropsInput="ml-4 sm:ml-0 sm:placeholder:text-left sm:text-left"
        >
          <AiOutlineSearch className="mx-2" size={20} />
        </CustomInput>
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
      />
    </section>
  );
};

export default Home;
