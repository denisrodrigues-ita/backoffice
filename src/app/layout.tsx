import type { Metadata } from "next";
import { Footer, Header } from "@/components/organisms";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backoffice",
  description: "página de gerenciamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
