import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
