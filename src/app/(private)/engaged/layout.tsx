"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";

export default function EngagedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useStore();
  const router = useRouter();

  if (user?.user?.role !== "admin") return router.push("/");
  return (
    <>
      <section>{children}</section>
    </>
  );
}
