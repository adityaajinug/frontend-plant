import { Values } from "@/types/Value/value";
import React from "react";

const valueDatas: Values[] = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Good Delivery on All Order",
    icon: "/icon/truck-fast.svg",
  },
  {
    id: 2,
    title: "Loyalty Reward",
    description: "Get the loyalty after order",
    icon: "/icon/coin.svg",
  },
  {
    id: 3,
    title: "Voucher Discount",
    description: "Use voucher for All Order",
    icon: "/icon/ticket-discount.svg",
  },
];
export const Value: React.FC = () => {
  return (
    <>
      <section className="mt-[106px] container mx-auto px-25 mb-[162px]">
        <div className="flex justify-between items-center  px-25 py-[30px] bg-primary-50 rounded-lg">
          {valueDatas.map((value, index) => (
            <div className="flex gap-[15px]" key={index}>
              <div>
                <img src={value.icon} alt={value.title} className="w-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base text-primary-800 font-semibold">
                  {value.title}
                </h3>
                <p className="text-base text-divider-500 font-semibold">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
