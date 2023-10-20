import React from "react";
import statusEnum from "@/enums/stautsEnum";

const Table = () => {
  const convidados = [
    { nome: "João", confirmado: true },
    { nome: "Maria", confirmado: false },
    { nome: "José", confirmado: true },
    { nome: "Ana", confirmado: false },
    { nome: "Pedro", confirmado: true },
    { nome: "Marta", confirmado: true },
    { nome: "Carlos", confirmado: false },
    { nome: "Laura", confirmado: true },
    { nome: "Paulo", confirmado: false },
    { nome: "Catarina", confirmado: true },
  ];

  const handleBadge = (confirmado: boolean) => {
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black-dark dark:text-gray-dark">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Presença
            </th>

            <th scope="col" className="px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {convidados.map((convidado, index) => (
            <tr
              key={index}
              className="odd:bg-slate-200 border-b odd:dark:bg-gray-700 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {convidado.nome}
              </th>
              <td className="px-6 py-4">{handleBadge(convidado.confirmado)}</td>
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
