import React from "react";
interface SectionProps {
  title: string;
}
export const SectionTitle: React.FC<SectionProps> = ({ title }) => {
  return (
    <>
      <h2 className="font-bold text-primary-800 text-2xl">{title}</h2>
    </>
  );
};
