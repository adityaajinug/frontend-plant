import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import React from "react";

export const PopularCategories = () => {
  return (
    <>
      <div className="container mx-auto px-25 mt-[106px]">
        <SectionTitle title="Popular Categories" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="mt-[39px] flex gap-6 items-center px-4 py-2 shadow-popular-box rounded-xl">
              <div className="max-w-[76px]">
                <img
                  src="/images/plant-category.jpg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-primary-800 font-semibold text-base">
                  Hot Plants
                </h4>
                <p className="text-base text-black">
                  Place on your sitting room for elegance
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="mt-[39px] flex gap-6 items-center px-4 py-2 shadow-popular-box rounded-xl">
              <div className="max-w-[76px]">
                <img
                  src="/images/plant-category.jpg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-primary-800 font-semibold text-base">
                  Hot Plants
                </h4>
                <p className="text-base text-black">
                  Place on your sitting room for elegance
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="mt-[39px] flex gap-6 items-center px-4 py-2 shadow-popular-box rounded-xl">
              <div className="max-w-[76px]">
                <img
                  src="/images/plant-category.jpg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-primary-800 font-semibold text-base">
                  Hot Plants
                </h4>
                <p className="text-base text-black">
                  Place on your sitting room for elegance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
