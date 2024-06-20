import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import { productDatas } from "@/dummy/Products/productsDummy";
import { Products } from "@/types/Products/products";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const NewProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const fetchNewestProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/home/newest-product`
      );
      if (response.status === 200) {
        setProducts(response.data.data);
      } else {
        console.error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchNewestProducts();
  }, []);
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
