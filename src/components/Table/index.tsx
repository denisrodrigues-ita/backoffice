import React from "react";
import statusEnum from "@/enums/stautsEnum";
import { DataGuestsProps } from "@/interfaces";

const Table: React.FC<DataGuestsProps> = ({ dataGuests}) => {
  const renderBadge = (confirmado: boolean) => {
    if (confirmado) {
      return (
        <span className="bg-green-200 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
          {statusEnum.CONFIRMADO}
        </span>
      );
    }
    return (
      <span className="bg-yellow-200 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
        {statusEnum.PENDENTE}
      </span>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded">
      <table className="w-full text-sm text-left text-gray-light dark:text-gray-dark">
        <thead className="text-xs text-gray-light uppercase bg-white-light dark:bg-black-dark dark:text-gray-dark">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Presença
            </th>
            <th scope="col" className="px-6 py-3">
              Código
            </th>
            <th scope="col" className="px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {dataGuests.guests.map((guest, index) => (
            <tr
              key={index}
              className="odd:bg-slate-100 border-b odd:dark:bg-slate-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
              >
                {guest.name}
              </th>
              <td className="px-6 py-4">
                {renderBadge(guest.attendance_status)}
              </td>
              <td className="px-6 py-4">{guest.code}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Alterar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
