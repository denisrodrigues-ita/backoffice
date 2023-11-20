"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { apiAuth } from "@/services";
import { childrenlProps } from "@/interfaces";

const PrivateRoute: React.FC<childrenlProps> = ({ children }) => {
  const { user, setUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    const handleToken = async (): Promise<void> => {
      try {
        if (!user) {
          const token = localStorage.getItem("token");

          if (!token) {
            router.push("/login");
          }

          const { result, response } = await apiAuth.userVerify(token);

          if (response.status !== 200) {
            router.push("/login");
          }

          setUser(result);
        }
      } catch (error) {
        router.push("/login");
      }
    };

    handleToken();
  }, []);

  return user ? children : null;
};

export default PrivateRoute;
