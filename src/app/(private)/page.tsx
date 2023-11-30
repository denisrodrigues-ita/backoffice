"use client";

import React from "react";
import { apiGuests } from "@/services";
import { Button, Loading } from "@/components/atoms";
import { Card, CustomInput, Toast } from "@/components/molecules";
import { AddGuest, ModalChangeStatus, Table } from "@/components/organisms";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import { useStore } from "@/store";
import "react-toastify/dist/ReactToastify.css";
import AddEngaged from "@/components/organisms/AddEngaged";

const Home = () => {
  const { user } = useStore();

  const [isLoading, setIsLoading] = React.useState(false);
  const [dataGuests, setDataGuests] = React.useState();
  const [propsModal, setPropsModal] = React.useState({
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
        const { result, response } = await apiGuests.getGuests(
          user?.user?.id || 0,
          setIsLoading
        );
        if (response.ok) {
          setDataGuests(result);
        }
      } catch (error) {
        toast.error(`Ops, algo deu errado! ${error}`);
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
      {dataGuests && <Card dataGuests={dataGuests} />}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {user?.user?.role === "admin" && <AddEngaged toast={toast} />}
        <AddGuest toast={toast} />
        <Button style="btn2" type="button" onClick={handlePrint}>
          Imprimir
        </Button>
        <CustomInput
          type="text"
          onChange={(e) => handleSearch(e)}
          value={search}
          placeholder="Pesquisar"
          setPropsModal={setPropsModal}
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
        toast={toast}
      />
      <Toast />
    </section>
  );
};

export default Home;
