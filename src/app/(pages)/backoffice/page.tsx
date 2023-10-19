"use client";

import React from "react";
import { api } from "@/services";
import { BackofficeComponent, Loading } from "@/components";

const Backoffice = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchGuests = async () => {
      const { result, response } = await api.getGuests(1, setIsLoading);
      console.log(result, response);
    };
    fetchGuests();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section>
      <BackofficeComponent />
    </section>
  );
};

export default Backoffice;
