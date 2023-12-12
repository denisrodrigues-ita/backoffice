import { DataGuestsProps } from "@/interfaces";
import React from "react";
import { MdPeopleAlt, MdPlaylistAddCheck } from "react-icons/md";
import "./card.css";

const Card: React.FC<DataGuestsProps> = ({ dataGuests }) => {
  return (
    <div className="card">
      <div className="border-blue-light-50 dark:border-gray-dark border-2 rounded-lg flex gap-4 p-4">
        <div className="self-center">
          <MdPeopleAlt size={50} />
        </div>
        <div>
          <h4>Convidados</h4>
          <p className="card-p">{dataGuests.totalGuests}</p>
        </div>
      </div>
      <div className="border-blue-light-50 dark:border-gray-dark border-2 rounded-lg flex gap-4 p-4">
        <div className="self-center">
          <MdPlaylistAddCheck size={50} />
        </div>
        <div>
          <h4>Confirmados</h4>
          <p className="card-p">{dataGuests.attendanceCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
