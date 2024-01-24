"use client";

import { PrivateRoute } from "@/components/molecules";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

export default function PrivateRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useStore();
  const router = useRouter();

  if (user?.user?.role !== "admin") return router.push("/");
  return (
    <>
      <PrivateRoute>
        <main>{children}</main>
      </PrivateRoute>
    </>
  );
}
