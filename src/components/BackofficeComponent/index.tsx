import React from "react";
import { Card, Table } from "..";
import { DataGuestsProps } from "@/interfaces";

const BackofficeComponent: React.FC<DataGuestsProps> = ({dataGuests}) => {
  console.log(dataGuests)
  return (
    <>
      <Card />
      <Table />
    </>
  );
};

export default BackofficeComponent;
