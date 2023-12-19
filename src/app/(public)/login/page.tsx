"use client";

import React from "react";
import { WeddingSVG } from "@/assets";
import { Toast } from "@/components/molecules";
import { Button, Input, Spinner } from "@/components/atoms";
import { apiAuth } from "@/services";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormValidations } from "@/validations/LoginValidations";

const Login = () => {
  const { register, handleSubmit, errors, reset } = useFormValidations({
    isRequiredEmail: true,
    isRequiredLoginPassword: true,
  });

  const { setUser, user } = useStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: any) => {
    const { email, loginPassword: password } = data;

    try {
      setIsLoading(true);
      const { result, response } = await apiAuth.loginUser(email, password);

      if (!response?.ok) {
        toast.error("Email ou senha incorretos!");
        return;
      }

      setUser(result);

      localStorage.setItem("token", JSON.stringify(result.token));

      if (result?.user.first_access) {
        router.push("/first-access");
        return;
      }

      router.push("/");
    } catch (error) {
      toast.error(`Ops, algo deu errado! ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen">
      <div className="flex flex-col lg:flex-row items-center h-full w-full">
        <div>
          <WeddingSVG className="max-w-xs max-h-80 lg:max-w-md" />
        </div>
        <form
          className="flex flex-col gap-4 w-full sm:w-2/3 lg:w-1/2 xl:max-w-lg"
          action="submit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="flex flex-col gap-4 w-full border border-blue-light-50 p-4 rounded-lg font-medium">
            Login
            <div>
              <Input
                register={register("email")}
                type="email"
                placeholder="Email"
                label="Email"
                onChange={() => {}}
                variant="login"
              />
              {errors.email && (
                <span className="error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <Input
                register={register("loginPassword")}
                type="password"
                placeholder="Senha"
                label="Senha"
                onChange={() => {}}
                variant="login"
              />
              {errors.loginPassword && (
                <span className="error">
                  {errors.loginPassword.message}
                </span>
              )}
            </div>
            <Button
              isLoading={isLoading}
              type="submit"
              style="btn1"
              onClick={() => {}}
            >
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </fieldset>
        </form>
      </div>
      <Toast />
    </section>
  );
};

export default Login;
