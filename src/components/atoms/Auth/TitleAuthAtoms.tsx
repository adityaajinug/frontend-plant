import React from "react";
interface titleAuthType {
  title: string;
  description: string;
}
interface titleAuthProps {
  titleAuth: titleAuthType;
}
export const TitleAuthAtoms: React.FC<titleAuthProps> = ({ titleAuth }) => {
  return (
    <>
      <div>
        <h1 className="text-black font-semibold text-32">{titleAuth.title}</h1>
        <h3 className="mt-3 font-normal text-xl">{titleAuth.description}</h3>
      </div>
    </>
  );
};
