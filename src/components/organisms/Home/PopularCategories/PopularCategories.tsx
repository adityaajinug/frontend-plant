import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface Category {
  id?: string;
  category_name: string;
  description: string;
  image: string;
}
export const PopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchPopularCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/home/popular-category`
      );
      if (response.status === 200) {
        console.log(response.data.data);
        setCategories(response.data.data);
      } else {
        console.error("Error fetching category");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  useEffect(() => {
    fetchPopularCategories();
  }, []);
  return (
    <>
      <div className="container mx-auto px-25 mt-[106px]">
        <SectionTitle title="Popular Categories" />
        <div className="grid grid-cols-12 gap-4">
          {categories.map((category, index) => (
            <div className="col-span-4" key={index}>
              <div className="mt-[39px] flex gap-6 items-center px-4 py-2 shadow-popular-box rounded-xl">
                <div className="max-w-[76px]">
                  <img
                    // src="/images/plant-category.jpg"
                    src={category.image}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-primary-800 font-semibold text-base">
                    {category.category_name}
                  </h4>
                  <p className="text-base text-black">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
