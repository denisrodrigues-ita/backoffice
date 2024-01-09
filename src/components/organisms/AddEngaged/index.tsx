import { apiEngaged } from "@/services";
import React from "react";
import { Button, Input, Spinner } from "@/components/atoms";
import { ToastProps } from "@/interfaces";
import { Select } from "@/components/atoms";
import { useFormValidations } from "@/validations";

interface EngagedProps {
  password: string;
  confirmPassword: string;
  groomName: string;
  brideName: string;
  email: string;
}

const AddEngaged: React.FC<ToastProps> = ({ toast }) => {
  const { register, handleSubmit, errors, reset } = useFormValidations({
    isRequiredEmail: true,
    isRequiredPassword: true,
    isRequiredConfirmPassword: true,
    isRequiredGroomName: true,
    isRequiredBrideName: true,
  });

  const Opcoes: {
    value: "client" | "admin" | "Selecione um tipo de usuário";
  }[] = [
    { value: "Selecione um tipo de usuário" },
    { value: "client" },
    { value: "admin" },
  ];

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleSelectChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };

  const onSubmit = async (data: any) => {
    const { groomName, brideName, password, confirmPassword, email } = data;

    if (selectedOption !== "client" && selectedOption !== "admin") {
      toast.warning("Selecione um tipo de usuário.");
      return;
    }

    const result = await handleFetch({
      groomName,
      brideName,
      password,
      confirmPassword,
      email,
    });

    if (result?.response.ok) {
      toast.success(
        `${result.result.bride_name} e ${result.result.groom_name} cadastrados com sucesso!`
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  register={register("groomName")}
                  type="text"
                  placeholder="Nome do noivo"
                  label="Nome do noivo"
                  onChange={() => {}}
                  variant="login"
                />
                {errors.groomName && (
                  <span className="error">{errors.groomName.message}</span>
                )}

                <Input
                  register={register("brideName")}
                  type="text"
                  placeholder="Nome da noiva"
                  label="Nome da noiva"
                  onChange={() => {}}
                  variant="login"
                />
                {errors.brideName && (
                  <span className="error">{errors.brideName.message}</span>
                )}

                <Input
                  register={register("email")}
                  type="email"
                  placeholder="Email"
                  label="Email"
                  onChange={() => {}}
                  variant="login"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}

                <label className="block text-sm font-medium text-blue-light-50 dark:text-white">
                  Tipo de usuário
                  <Select
                    options={Opcoes}
                    value={selectedOption}
                    onChange={handleSelectChange}
                  />
                </label>

                <Input
                  register={register("password")}
                  type="text"
                  placeholder="Senha"
                  label="Senha"
                  onChange={() => {}}
                  variant="login"
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}

                <Input
                  register={register("confirmPassword")}
                  type="text"
                  placeholder="Confirmar senha"
                  label="Confirmar senha"
                  onChange={() => {}}
                  variant="login"
                />
                {errors.confirmPassword && (
                  <span className="error">
                    {errors.confirmPassword.message}
                  </span>
                )}

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
