import { PrivateRoute } from "@/components/molecules";
import { Footer, Header } from "@/components/organisms";

export default function PrivateRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrivateRoute>
        <Header />
        <section>{children}</section>
        <Footer />
      </PrivateRoute>
    </>
  );
}
