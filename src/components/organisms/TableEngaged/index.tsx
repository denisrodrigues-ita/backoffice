import { Dropdown } from "@/components/molecules";
import { DropItems } from "@/interfaces";
import React from "react";
import { CiCircleList } from "react-icons/ci";

interface DataEngagedsProps {
  dataEngageds: EngagedsProps[];
  search: string;
}

interface EngagedsProps {
  active: boolean;
  bride_name: string;
  created_at: string;
  email: string;
  first_access: boolean;
  groom_name: string;
  id: number;
  role: string;
  update_at: string;
}

const TableEngaged: React.FC<DataEngagedsProps> = ({
  dataEngageds,
  search,
}) => {
  const renderNameEmail = (
    groomName: String,
    brideName: String,
    email: String
  ) => {
    return (
      <div className="flex flex-col">
        <span className="uppercase">{groomName}</span>
        <span className="uppercase">{brideName}</span>
        <span>{email}</span>
      </div>
    );
  };

  const renderBadge = (status: boolean) => {
    if (status) {
      return <span className="greenBadge">Ativo</span>;
    }
    return <span className="redBadge">Inativo</span>;
  };

  const renderFirstAccess = (status: boolean) => {
    if (status) {
      return <span className="greenBadge">Realizado</span>;
    }
    return <span className="yellowBadge">Aguardando</span>;
  };

  const renderCreatAt = (date: string) => {
    const dateFormated = new Date(date);
    return dateFormated.toLocaleDateString("pt-BR");
  };

  const dropItems: DropItems[] = [
    {
      name: "Nome do noivo",
      type: "button",
      onClick: () => {
        alert("Nome do noivo");
      },
    },
    {
      name: "Nome da noiva",
      type: "button",
      onClick: () => {
        alert("Nome da noiva");
      },
    },
    {
      name: "Status",
      type: "button",
      onClick: () => {
        alert("Status");
      },
    },
    {
      name: "Perfil",
      type: "button",
      onClick: () => {
        alert("Perfil");
      },
    },
  ];

  return (
    <div className="overflow-x-auto shadow-md sm:rounded">
      <table className="w-full text-sm text-left text-gray-light dark:text-gray-dark">
        <thead className="hidden sm:table-header-group text-xs text-gray-light uppercase bg-white-light dark:bg-black-dark dark:text-gray-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome e Email</th>
            <th scope="col">Ativo</th>
            <th scope="col" className="print:hidden">
              Primeiro acesso
            </th>
            <th scope="col" className="print:hidden">
              Perfil
            </th>
            <th scope="col" className="print:hidden">
              Criado em
            </th>
            <th scope="col" className="print:hidden">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {dataEngageds
            .filter(
              (engaged) =>
                engaged.bride_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                engaged.groom_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((engaged, index) => (
              <tr key={engaged.id} className="trBody">
                <th className="row-start-1 col-start-3">{index + 1}</th>
                <th
                  scope="row"
                  className="row-span-2 row-start-1 col-start-1 font-medium whitespace-nowrap"
                >
                  {renderNameEmail(
                    engaged.groom_name,
                    engaged.bride_name,
                    engaged.email
                  )}
                </th>
                <td className="row-start-2 col-start-1">
                  {renderBadge(engaged.active)}
                </td>
                <td className="row-start-3 col-start-1 print:hidden">
                  {renderFirstAccess(engaged.first_access)}
                </td>
                <td className="row-start-3 col-start-1 font-medium font print:hidden">
                  {engaged.role}
                </td>
                <td className="row-start-3 col-start-1 print:hidden">
                  {renderCreatAt(engaged.created_at)}
                </td>
                <td className="row-start-2 col-start-3">
                  <Dropdown
                    style="btnSVG"
                    title={<CiCircleList className="w-6 h-6" />}
                    dropItems={dropItems}
                    // guest={guest}
                    translateX="-translate-x-20"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableEngaged;
