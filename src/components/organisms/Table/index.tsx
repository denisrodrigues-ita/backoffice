import React from "react";
import statusEnum from "@/enums/stautsEnum";
import {
  DataGuestsProps,
  ModalProps,
  ModalChangeStatusProps,
  SearchProps,
} from "@/interfaces";
import "./table.css";
import { Dropdown } from "@/components/molecules";
import { BackofficeProps, DropItems } from "@/interfaces";

const Table: React.FC<
  DataGuestsProps & ModalProps & ModalChangeStatusProps & SearchProps
> = ({ dataGuests, setPropsModal, search }) => {
  const dropItems: DropItems[] = [
    {
      name: "Nome",
      type: "button",
      onClick: (guest: BackofficeProps) =>
        setPropsModal((prev) => ({
          ...prev,
          guestName: guest.name,
          attendanceStatus: guest.attendance_status,
          code: guest.code,
          changeOn: "name",
          isOpenModal: true,
        })),
    },
    {
      name: "Presença",
      type: "button",
      onClick: (guest: BackofficeProps) =>
        setPropsModal((prev) => ({
          ...prev,
          guestName: guest.name,
          attendanceStatus: guest.attendance_status,
          code: guest.code,
          changeOn: "presence",
          isOpenModal: true,
        })),
    },
  ];

  const renderBadge = (confirmado: boolean) => {
    if (confirmado) {
      return <span className="greenBadge">{statusEnum.CONFIRMADO}</span>;
    }
    return <span className="yellowBadge">{statusEnum.PENDENTE}</span>;
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded">
      <table className="w-full text-sm text-left text-gray-light dark:text-gray-dark">
        <thead className="hidden sm:table-header-group text-xs text-gray-light uppercase bg-white-light dark:bg-black-dark dark:text-gray-dark">
          <tr>
            <th scope="col">#</th>
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
              <tr key={index} className="trBody">
                <th className="row-start-1 col-start-3">{index + 1}</th>
                <th
                  scope="row"
                  className="row-span-2 row-start-1 col-start-1 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase"
                >
                  {guest.name}
                </th>
                <td className="row-start-2 col-start-1">
                  {renderBadge(guest.attendance_status)}
                </td>
                <td className="row-start-3 col-start-1 print:hidden">
                  {guest.code}
                </td>
                <td className="row-start-2 col-start-3">
                  <Dropdown
                    style="btn1"
                    title="Alterar"
                    dropItems={dropItems}
                    guest={guest}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
