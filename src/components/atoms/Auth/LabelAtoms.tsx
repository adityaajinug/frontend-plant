import React from "react";
interface LabelType {
  labelName: string;
  idFor: string;
}
interface LabelProps {
  label: LabelType;
}
export const LabelAtoms: React.FC<LabelProps> = ({ label }) => {
  return (
    <>
      <label htmlFor={label.idFor} className="text-base">
        {label.labelName} <small className="text-accent-base-400">*</small>
      </label>
    </>
  );
};
