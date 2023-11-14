"use client";

import React from "react";
import { WeddingSVG } from "@/assets";
import { CustomInput } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { apiAuth } from "@/services";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

const Login = () => {
  const { setUser, user } = useStore();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { result, response } = await apiAuth.loginUser(
      email,
      password,
      setIsLoading
    );

    if (!response?.ok) {
      return;
    }

    setUser(result);

    localStorage.setItem("id", JSON.stringify(result.user.id));

    // if (result?.user.first_access) {
    //   router.push("/first-access");
    //   return;
    // }

    router.push("/");
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
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col gap-4 w-full border border-blue-light-50 p-4 rounded-lg font-medium">
            Login
            <CustomInput
              type="email"
              value={email}
              onChange={(e) => handleChangeEmail(e)}
              placeholder="Email"
              stylePropsInput="w-full"
            />
            <CustomInput
              type="password"
              value={password}
              onChange={(e) => handleChangePassword(e)}
              placeholder="Senha"
            />
            <Button type="submit" style="btn1" onClick={() => {}}>
              Login
            </Button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Login;
