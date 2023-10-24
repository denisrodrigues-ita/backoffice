"use client";

import React from "react";
import { api } from "@/services";
import {
  AddGuest,
  BackofficeComponent,
  Card,
  Loading,
  Toast,
} from "@/components";
import { StatusProps } from "@/interfaces";

const Backoffice = () => {
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<StatusProps["status"]>("success");
  const [dataGuests, setDataGuests] = React.useState();

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
      <Card />
      <AddGuest />
      {dataGuests ? <BackofficeComponent dataGuests={dataGuests} /> : "no data"}
    </section>
  );
};

export default Backoffice;
