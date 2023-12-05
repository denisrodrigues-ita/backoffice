import { apiEngaged } from "@/services";
import React from "react";
import { Button, Spinner } from "@/components/atoms";
import { ToastProps } from "@/interfaces";
import { Select } from "@/components/atoms";

interface EngagedProps {
  password: string;
  confirmPassword: string;
  groomName: string;
  brideName: string;
  email: string;
}

const AddEngaged: React.FC<ToastProps> = ({ toast }) => {
  const Opcoes: {
    value: "client" | "admin" | "Selecione um tipo de usuário";
    selected: boolean;
  }[] = [
    { value: "Selecione um tipo de usuário", selected: true },
    { value: "client", selected: false },
    { value: "admin", selected: false },
  ];

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleSelectChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  const groomNameRef = React.useRef<HTMLInputElement>(null);
  const brideNameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordConfirmRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (groomNameRef.current?.value === "") {
      toast.warning("Nome do noivo não informado.");
      return;
    }

    if (brideNameRef.current?.value === "") {
      toast.warning("Nome da noiva não informado.");
      return;
    }

    if (passwordRef.current?.value === "") {
      toast.warning("Senha não informada.");
      return;
    }

    if (
      passwordRef.current?.value.length &&
      passwordRef.current?.value.length < 6
    ) {
      toast.warning("Senha deve conter no mínimo 6 caracteres.");
      return;
    }

    if (passwordConfirmRef.current?.value === "") {
      toast.warning("Confirmação de senha não informada.");
      return;
    }

    if (
      passwordConfirmRef.current?.value &&
      passwordConfirmRef.current?.value.length < 6
    ) {
      toast.warning("Confirmação de senha deve conter no mínimo 6 caracteres.");
      return;
    }

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      toast.warning("As senhas não são iguais.");
      return;
    }

    if (emailRef.current?.value === "") {
      toast.warning("E-mail não informado.");
      return;
    }

    if (selectedOption === "Selecione um tipo de usuário") {
      toast.warning("Selecione um tipo de usuário.");
      return;
    }

    if (
      emailRef.current?.value &&
      !emailRef.current?.value.includes("@") &&
      !emailRef.current?.value.includes(".")
    ) {
      toast.warning("E-mail inválido.");
      return;
    }

    const groomName = groomNameRef.current?.value;
    const brideName = brideNameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = passwordConfirmRef.current?.value;
    const email = emailRef.current?.value;

    if (!(groomName && brideName && password && confirmPassword && email)) {
      toast.warning("Preencha todos os campos.");
      return;
    }

    const data = await handleFetch({
      groomName,
      brideName,
      password,
      confirmPassword,
      email,
    });

    if (data?.response.ok) {
      toast.success(
        `${data.result.bride_name} e ${data.result.groom_name} cadastrados com sucesso!`
      );
      return;
    }
  };

  const handleFetch = async (engaged: EngagedProps) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (token === null) {
        toast.error("Ops, algo deu errado!");
        return;
      }

      const { response, result } = await apiEngaged.createEngaged(
        engaged,
        token
      );

      return { response, result };
    } catch (error) {
      toast.error(`Ops, algo deu errado! ${error}`);
    } finally {
      setIsLoading(false);
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
        Add Noivos
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
                Cadastrar Noivos
              </h3>
              <form
                className="space-y-6"
                action="submit"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="groomName"
                    className="block text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Nome do noivo
                  </label>
                  <input
                    ref={groomNameRef}
                    type="text"
                    name="groomName"
                    id="groomName"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome do noivo"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brideName"
                    className="block text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Nome da noiva
                  </label>
                  <input
                    ref={brideNameRef}
                    type="text"
                    name="brideName"
                    id="brideName"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome da noiva"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome da noiva"
                    required
                  />
                </div>
                <label className="block text-sm font-medium text-blue-light-50 dark:text-white">
                  Tipo de usuário
                  <Select
                    options={Opcoes}
                    value={selectedOption}
                    onChange={handleSelectChange}
                  />
                </label>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Senha
                  </label>
                  <input
                    ref={passwordRef}
                    type="text"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome da noiva"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium text-blue-light-50 dark:text-white"
                  >
                    Confirmação de senha
                  </label>
                  <input
                    ref={passwordConfirmRef}
                    type="text"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    className="bg-gray-50 border border-gray-300 text-blue-light-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nome da noiva"
                    required
                  />
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full flex justify-center text-white-light bg-blue-light-50 hover:bg-blue-light-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Spinner /> : "Cadastrar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEngaged;
