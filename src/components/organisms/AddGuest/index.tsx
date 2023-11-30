import { apiGuests } from "@/services";
import React from "react";
import { Button } from "@/components/atoms";
import { ToastProps } from "@/interfaces";
import { useStore } from "@/store";

const AddGuest: React.FC<ToastProps> = ({ toast }) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [guestName, setGuestName] = React.useState("");

  const { user } = useStore();

  const shortid = require("shortid");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFetch();
  };

  const handleFetch = async () => {
    try {
      const { response, result } = await apiGuests.createGuest({
        name: guestName,
        engaged_id: user?.user?.id,
        code: shortid.generate().substring(0, 6),
      });
      if (response.ok) {
        setGuestName("");
        toast.success(`${result.name} cadastrado com sucesso!`);
        return;
      }
    } catch (error) {
      toast.error(`Ops, algo deu errado! ${error}`);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpenModal(true)}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        style="btn1"
        type="button"
      >
        Add Convidado
      </Button>

      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed inset-0 bg-black z-50 justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-opacity-90 ${
          isOpenModal ? "flex" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white-light rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setIsOpenModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-blue-light-50 dark:text-white-light bg-transparent hover:bg-gray-200 rounded-lg text-sm w-12 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600"
              data-modal-hide="authentication-modal"
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
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-blue-light-50 dark:text-white">
                Cadastrar Convidado
              </h3>
              <form
                className="space-y-6"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="guestName"
                    className="block mb-2 text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Nome do Convidado
                  </label>
                  <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    type="text"
                    name="guestName"
                    id="guestName"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Digite aqui"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white-light bg-blue-light-50 hover:bg-blue-light-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-700 "
                >
                  Cadastrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGuest;
