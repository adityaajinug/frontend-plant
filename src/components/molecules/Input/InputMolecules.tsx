import { InputTextAtoms } from "@/components/atoms/Auth/InputTextAtoms";
import { LabelAtoms } from "@/components/atoms/Auth/LabelAtoms";
import React from "react";
import { LabelType, InputType } from "@/types/Input/input";
interface InputMoleculesProps {
  labelVal: LabelType;
  inputVal: InputType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputMolecules: React.FC<InputMoleculesProps> = ({
  labelVal,
  inputVal,
  onChange,
}) => {
  return (
    <>
      <LabelAtoms label={labelVal} />
      <InputTextAtoms input={inputVal} onChange={onChange} />
    </>
  );
};
