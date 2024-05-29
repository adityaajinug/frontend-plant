import { FooterMenuAtoms } from "@/components/atoms/Menus/FooterMenuAtoms";
import React from "react";

const menuDatas = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Faq",
    url: "/faq",
  },
  {
    name: "Term & Condition",
    url: "/term-condition",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];
export const FooterMenuMolecules: React.FC = () => {
  return (
    <ul className="flex gap-8">
      {menuDatas.map((menu, index) => (
        <FooterMenuAtoms nav={{ name: menu.name, url: menu.url }} />
      ))}
    </ul>
  );
};
