import React from "react";
interface FooterType {
  name: string;
  url: string;
}
interface FooterMenuProps {
  nav: FooterType;
}
export const FooterMenuAtoms: React.FC<FooterMenuProps> = ({ nav }) => {
  return (
    <>
      <li>
        <a href={nav.url} className="text-primary-0 font-semibold text-sm">
          {nav.name}
        </a>
      </li>
    </>
  );
};
