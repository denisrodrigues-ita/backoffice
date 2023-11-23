"use client";

import React from "react";
import { useStore } from "@/store";
import { Toast } from "@/components/molecules";
import { toast } from "react-toastify";
import { apiAuth } from "@/services";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const FirstAccess = () => {
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const newPasswordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { user } = useStore();

  const handleinput = async (e: any) => {
    e.preventDefault();
    let password;
    let newPassword;
    let confirmPassword;

    if (passwordRef.current) {
      password = passwordRef.current.value;
    }
    if (newPasswordRef.current) {
      newPassword = newPasswordRef.current.value;
    }
    if (confirmPasswordRef.current) {
      confirmPassword = confirmPasswordRef.current.value;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As novas senhas não são iguais.");
      return;
    }

    if (user?.user?.id === undefined) {
      toast.error("Usuário não encontrado.");
      return;
    }

    if (password === newPassword) {
      toast.error("A nova senha não pode ser igual a atual.");
      return;
    }

    if (password === undefined) {
      toast.error("Senha atual não informada.");
      return;
    }

    if (newPassword === undefined) {
      toast.error("Nova senha não informada.");
      return;
    }

    if (confirmPassword === undefined) {
      toast.error("Confirmação de senha não informada.");
      return;
    }

    if (!user?.token) {
      toast.error("Token não informado.");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("A senha atual deve ter no mínimo 6 caracteres.");
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

        <form className="mt-8" onSubmit={handleinput}>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha atual
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nova senha
            </label>
            <input
              ref={newPasswordRef}
              type="password"
              id="new-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirmar nova senha
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              id="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
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
