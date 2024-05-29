import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import React from "react";

const products = [
  {
    id: 1,
    name: "Sansiviera",
    price: "Rp. 15.000",
    price_discount: "Rp. 5.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
  {
    id: 2,
    name: "Cactus",
    price: "Rp. 25.000",
    price_discount: "Rp. 10.000",
  },
];
export const NewProducts = () => {
  return (
    <>
      <section className="container mx-auto px-25 mt-[106px]">
        <div className="flex justify-between">
          <SectionTitle title="New Products" />
          <div className="flex gap-[10px] items-center">
            <h4 className="text-primary-700 font-bold text-lg">View More</h4>
            <div className="max-w-6">
              <img
                src="/icon/arrow-right.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-[34px]">
          <div className="grid grid-cols-12 gap-5">
            {products.map((product, index) => (
              <div className="col-span-3" key={index}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
