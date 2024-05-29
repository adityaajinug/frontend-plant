import { SecondaryLogo } from "@/components/atoms/Logo/SecondaryLogo";
import { BankLogoMolecules } from "@/components/molecules/Logo/BankLogoMolecules";
import { FooterMenuMolecules } from "@/components/molecules/Menus/FooterMenuMolecules";
import React from "react";

export const FooterOrganisms = () => {
  return (
    <>
      <footer className="container mx-auto px-25 bg-primary-800 py-[42px] mt-[162px]">
        <div className="flex gap-8 flex-col">
          <div className="flex justify-between items-center">
            <SecondaryLogo />
            <FooterMenuMolecules />
          </div>

          <div className="flex justify-between py-8 border-t border-solid border-primary-0 items-center">
            <p className="text-base font-regular text-white uppercase">
              © 2024 Planting
            </p>
            <BankLogoMolecules />
          </div>
        </div>
      </footer>
    </>
  );
};
