import { FooterOrganisms } from "@/components/organisms/Footer/FooterOrganisms";
import { Navbar } from "@/components/organisms/Navbar/NavbarOrganisms";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

export const LayoutTemplates: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <FooterOrganisms />
    </>
  );
};
