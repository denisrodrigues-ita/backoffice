"use client";

import React from "react";
import { useStore } from "@/store";
import { Toast } from "@/components/molecules";
import { toast } from "react-toastify";
import { apiAuth } from "@/services";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useFormValidations } from "@/validations/LoginValidations";

const FirstAccess = () => {
  const { register, handleSubmit, errors, reset } = useFormValidations({
    isRequiredLoginPassword: true,
    isRequiredNewPassword: true,
    isRequiredNewConfirmPassword: true,
  });

  const router = useRouter();

  const { user } = useStore();

  const handleinput = async (data: any) => {
    const { loginPassword: password, newPassword, newConfirmPassword: confirmPassword } = data;

    if (user?.user?.id === undefined) {
      toast.error("Usuário não encontrado.");
      return;
    }

    if (password === newPassword) {
      toast.error("A nova senha não pode ser igual a atual.");
      return;
    }

    if (!user?.token) {
      toast.error("Token não informado.");
      return;
    }

    const { result, response } = await apiAuth.firstAccess(
      password,
      newPassword,
      confirmPassword,
      user.token
    );

    if (response?.ok) {
      toast.success("Senha alterada com sucesso!");
      return router.push("/");
    }

    toast.error("Ops, algo deu errado!");
  };

  return (
    <section className="h-screen flex items-center">
      <div className="max-w-sm mx-auto">
        <h1>Esse é seu primeiro acesso.</h1>
        <h3>Vamos alterar sua senha para uma maior segurança, ok?</h3>

        <form className="mt-8" onSubmit={handleSubmit(handleinput)}>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha atual
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("loginPassword")}
            />
            {errors.loginPassword && (
              <span className="error">{errors.loginPassword.message}</span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nova senha
            </label>
            <input
              type="password"
              id="new-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="error">{errors.newPassword.message}</span>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirmar nova senha
            </label>
            <input
              type="password"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("newConfirmPassword")}
            />
            {errors.newConfirmPassword && (
              <span className="error">{errors.newConfirmPassword.message}</span>
            )}
          </div>
          <div className="flex items-start mb-5"></div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Alterar senha
          </button>
        </form>
      </div>
      <Toast />
    </section>
  );
};

export default FirstAccess;
