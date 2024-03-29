import React from "react";
import statusEnum from "@/enums/stautsEnum";
import { ModalProps, ModalChangeStatusProps, ToastProps } from "@/interfaces";
import { Loading } from "@/components/atoms";
import apiGuests from "@/services/apiGuests";

const ModalChangeStatus: React.FC<
  ModalChangeStatusProps & ModalProps & ToastProps
> = ({ propsModal, setPropsModal, toast }) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const fetchChangeStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdatingStatus(true);
    if (propsModal.changeOn === "name") {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token não informado.");
          return;
        }

        const response = await apiGuests.changeGuestName(
          propsModal.code,
          newName,
          token
        );
        if (response) {
          toast.success(`Nome alterado com sucesso!`);
        }
      } catch (err) {
        toast.error(`Ops, algo deu errado! ${err}`);
      } finally {
        setPropsModal((prev) => ({ ...prev, isOpenModal: false }));
        setIsUpdatingStatus(false);
        setNewName("");
      }
    } else if (propsModal.changeOn === "presence") {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token não informado.");
          return;
        }

        const response = await apiGuests.changeStatusGuest(
          propsModal.code,
          !propsModal.attendanceStatus,
          token
        );
        if (response) {
          toast.success(`Status alterado com sucesso!`);
        }
      } catch (err) {
        toast.error(`Ops, algo deu errado! ${err}`);
      } finally {
        setPropsModal((prev) => ({ ...prev, isOpenModal: false }));
        setIsUpdatingStatus(false);
      }
    } else {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token não informado.");
          return;
        }

        const response = await apiGuests.deleteGuest(propsModal.guestId, token);

        if (response) {
          toast.success("Convidado deletado!");
        }
      } catch (err) {
        toast.error(`Ops, algo deu errado! ${err}`);
      } finally {
        setPropsModal((prev) => ({ ...prev, isOpenModal: false }));
        setIsUpdatingStatus(false);
      }
    }
  };

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={`fixed top-0 left-0 right-0 z-50 justify-center items-center bg-black/80 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        propsModal.isOpenModal ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            disabled={isUpdatingStatus}
            onClick={() =>
              setPropsModal((prev) => ({ ...prev, isOpenModal: false }))
            }
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Cancelar</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {propsModal.changeOn === "name"
                ? `Você esta alterando o nome de ${propsModal.guestName.toLocaleUpperCase()}!`
                : propsModal.changeOn === "presence"
                ? `Você tem certeza que deseja alterar o status de ${propsModal.guestName.toUpperCase()} para ${
                    propsModal.attendanceStatus
                      ? statusEnum.PENDENTE.toLocaleUpperCase()
                      : statusEnum.CONFIRMADO.toUpperCase()
                  }?`
                : `Você tem certeza que deseja excluir o convidado ${propsModal.guestName}?`}{" "}
              {isUpdatingStatus && <Loading />}
            </h3>
            <form action="submit" onSubmit={(e) => fetchChangeStatus(e)}>
              {propsModal.changeOn === "name" && (
                <input
                  className="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 my-4"
                  type="text"
                  placeholder="Digite o novo nome"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              )}
              <button
                disabled={isUpdatingStatus}
                data-modal-hide="popup-modal"
                type="submit"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {propsModal.changeOn === "delete" ? "Deletar" : "Alterar"}
              </button>
              <button
                disabled={isUpdatingStatus}
                onClick={() =>
                  setPropsModal((prev) => ({ ...prev, isOpenModal: false }))
                }
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChangeStatus;
