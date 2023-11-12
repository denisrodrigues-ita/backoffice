"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return user ? children : null;
};

export default PrivateRoute;
