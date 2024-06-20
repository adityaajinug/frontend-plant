import { SignInOrganisms } from "@/components/organisms/Auth/SignInOrganisms";
import React from "react";

export const SignInTemplates = () => {
  return (
    <>
      <div className="grid grid-cols-12 w-full">
        <div className="xl:col-span-6 col-span-12 xl:px-42 py-5 px-5 w-full ">
          <div className="max-w-8 min-h-fit">
            <img src="/icon/logo-img.svg" alt="logo" className="w-full h-fit" />
          </div>
          <SignInOrganisms />
          <div></div>
          <div className="flex justify-between items-center mt-[114px]">
            <span className="font-normal text-divider-500">
              @ 2024 Plainting
            </span>
            <span className="font-normal text-divider-500">
              planting@gmail.com
            </span>
          </div>
        </div>
        <div className="xl:col-span-6 max-w-full overflow-hidden min-h-full max-h-screen w-full xl:block hidden">
          <img
            src="/images/auth-img.jpg"
            alt="auth img"
            className="w-full h-fit object-cover"
          />
        </div>
      </div>
    </>
  );
};
