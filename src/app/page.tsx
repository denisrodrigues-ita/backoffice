"use client";

import React from "react";
import { api } from "@/services";
import {
  AddGuest,
  Card,
  Loading,
  ModalChangeStatus,
  PrintTable,
  Table,
  Toast,
} from "@/components";
import { StatusProps } from "@/interfaces";

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

  const handleImprimir = () => {
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
      <div className="flex gap-4 mb-4">
        <AddGuest />
        <PrintTable onClick={handleImprimir} />
      </div>
      {dataGuests && (
        <Table
          dataGuests={dataGuests}
          setPropsModal={setPropsModal}
          propsModal={propsModal}
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
