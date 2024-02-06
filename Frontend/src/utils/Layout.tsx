import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="py-8 px-4 grow flex flex-col justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;