import React from "react";

export const MainLogo = () => {
  return (
    <>
      <div className="flex items-center gap-[6px]">
        <div className="max-w-4 max-h-[30px]">
          <img
            src="/icon/logo-img.svg"
            alt="logo"
            className="min-w-4 min-h-[30px]"
          />
        </div>

        <div className="max-w-[115px]">
          <img src="/logo.png" alt="" className="w-full h-full" />
        </div>
      </div>
    </>
  );
};
