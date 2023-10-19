import React from "react";
import { MdPeopleAlt, MdPlaylistAddCheck } from "react-icons/md";

const testeCard = {
  convidados_total: 30,
  convidados_confirmados: 20,
};

const Card = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="border-gray-light dark:border-gray-dark border-2 rounded flex gap-4 p-4">
        <div className="self-center">
          <MdPeopleAlt size={50} />
        </div>
        <div>
          <h4>Convidados</h4>
          <p className="card-p">{testeCard.convidados_total}</p>
        </div>
      </div>
      <div className="border-gray-light dark:border-gray-dark border-2 rounded flex gap-4 p-4">
        <div className="self-center">
          <MdPlaylistAddCheck size={50} />
        </div>
        <div>
          <h4>Confirmados</h4>
          <p className="card-p">{testeCard.convidados_confirmados}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
