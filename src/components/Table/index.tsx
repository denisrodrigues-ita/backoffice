import React from "react";
import statusEnum from "@/enums/stautsEnum";
import {
  DataGuestsProps,
  ModalProps,
  ModalChangeStatusProps,
  SearchProps,
} from "@/interfaces";
import { Dropdown } from "@/components";

const Table: React.FC<
  DataGuestsProps & ModalProps & ModalChangeStatusProps & SearchProps
> = ({ dataGuests, setPropsModal, propsModal, search }) => {
  const openDropdown = (index: number) => {
    if (propsModal.dropdownIndex === index) {
      setPropsModal((prev) => ({ ...prev, dropdownIndex: -1 }));
    } else {
      setPropsModal((prev) => ({ ...prev, dropdownIndex: index }));
    }
  };

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
            <th scope="col">Nome</th>
            <th scope="col">Presença</th>
            <th scope="col" className="print:hidden">
              Código
            </th>
            <th scope="col" className="print:hidden">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {dataGuests.guests
            .filter((guest) => guest.name.includes(search))
            .map((guest, index) => (
              <tr
                key={index}
                className="odd:bg-slate-100 border-b odd:dark:bg-gray-800 dark:border-gray-700
               hover:bg-slate-200 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className=" font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                >
                  {guest.name}
                </th>
                <td>{renderBadge(guest.attendance_status)}</td>
                <td className="print:hidden">{guest.code}</td>
                <td className="relative">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-0"
                    onClick={() => {
                      setPropsModal((prev) => ({
                        ...prev,
                        guestName: guest.name,
                        attendanceStatus: guest.attendance_status,
                        code: guest.code,
                      }));
                      openDropdown(index);
                    }}
                  >
                    Alterar
                  </button>
                  {propsModal.dropdownIndex === index && (
                    <Dropdown setPropsModal={setPropsModal} />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
