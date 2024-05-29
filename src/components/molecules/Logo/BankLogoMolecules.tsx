import React from "react";
import { bankDatas } from "@/dummy/Bank/banksDummy";
import { BankLogoAtoms } from "@/components/atoms/Logo/BankLogoAtoms";

export const BankLogoMolecules: React.FC = () => {
  return (
    <>
      <div className="flex gap-4">
        {bankDatas.map((bank, index) => (
          <BankLogoAtoms key={index} bank={bank} />
        ))}
      </div>
    </>
  );
};
