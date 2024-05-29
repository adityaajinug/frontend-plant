import React from "react";
import { BanksData } from "@/types/Bank/banks";

export const BankLogoAtoms: React.FC<BanksData> = ({ bank }) => {
  return (
    <>
      <div className="max-w-[83px] rounded-[4px] overflow-hidden">
        <img src={bank.logo} alt={bank.name} className="w-full h-full" />
      </div>
    </>
  );
};
