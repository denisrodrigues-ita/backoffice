import React from "react";
import { Table } from "..";
import { DataGuestsProps } from "@/interfaces";

const BackofficeComponent: React.FC<DataGuestsProps> = ({ dataGuests }) => {
  return <Table dataGuests={dataGuests} />;
};

export default BackofficeComponent;
