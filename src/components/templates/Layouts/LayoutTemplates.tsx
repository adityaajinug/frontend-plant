import { HeadPage } from "@/components/atoms/HeadPage";
import { FooterOrganisms } from "@/components/organisms/Footer/FooterOrganisms";
import { Navbar } from "@/components/organisms/Navbar/NavbarOrganisms";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const LayoutTemplates: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <HeadPage title={title} />
      <Navbar />
      {children}
      <FooterOrganisms />
    </>
  );
};
