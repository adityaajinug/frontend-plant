import axios from "axios";
import React, { useEffect, useState } from "react";
import { Filter } from "@/types/Products/filter";

interface FilterMoleculesProps {
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
  selectedSizes: number[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<number[]>>;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
}
const FilterMolecules: React.FC<FilterMoleculesProps> = ({
  selectedCategories,
  setSelectedCategories,
  selectedSizes,
  setSelectedSizes,
  setPriceRange,
}) => {
  const [filterDatas, setFilterDatas] = useState<Filter>({
    categories: [],
    sizes: [],
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product/category`
        );
        if (response.status == 200) {
          return response.data.data;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    };
    const fetchSizes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product/size`
        );
        if (response.status == 200) {
          return response.data.data;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    };
    const fetchFilters = async () => {
      const categories = await fetchCategories();
      const sizes = await fetchSizes();
      setFilterDatas({ categories, sizes });
    };

    fetchFilters();
  }, []);
  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev: any) =>
      prev.includes(id)
        ? prev.filter((categoryId: number) => categoryId !== id)
        : [...prev, id]
    );
  };
  const handleSizeChange = (id: number) => {
    setSelectedSizes((prev: any) =>
      prev.includes(id)
        ? prev.filter((sizeId: number) => sizeId !== id)
        : [...prev, id]
    );
  };
  const handlePriceFilter = () => {
    setPriceRange(parseInt(minPrice, 10), parseInt(maxPrice, 10));
  };
  return (
    <>
      <div className="flex flex-col gap-6 px-4 py-[18px] bg-primary-50 rounded-lg">
        <div className="flex flex-col gap-6">
          <h3 className="text-black font-semibold text-base">Categories</h3>
          <div className="flex flex-col gap-4">
            {filterDatas.categories.map((category, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <input
                  type="checkbox"
                  name={category.id}
                  id={`${category.category_name}-${index}`}
                  className="categories-checkbox"
                  checked={selectedCategories.includes(
                    category.id ? parseInt(category.id) : 0
                  )}
                  onChange={() =>
                    handleCategoryChange(
                      category.id ? parseInt(category.id) : 0
                    )
                  }
                />
                <label
                  htmlFor={`${category.category_name}-${index}`}
                  className="text-base font-medium text-black"
                >
                  {category.category_name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-black font-semibold text-base">Size</h3>
          <div className="flex flex-col gap-4">
            {filterDatas.sizes.map((size, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <input
                  type="checkbox"
                  name={size.id}
                  id={`${size.size}-${index}`}
                  className="categories-checkbox"
                  checked={selectedSizes.includes(
                    size.id ? parseInt(size.id) : 0
                  )}
                  onChange={() =>
                    handleSizeChange(size.id ? parseInt(size.id) : 0)
                  }
                />
                <label
                  htmlFor={`${size.size}-${index}`}
                  className="text-base font-medium text-black"
                >
                  {size.size}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-black font-semibold text-base">Price</h3>
          <div className="flex gap-[10px] border border-solid border-primary-800 rounded overflow-hidden items-center">
            <div className="bg-divider-300 py-[10px] px-[10px]">
              <span className="text-sm font-semibold text-primary-800">Rp</span>
            </div>
            <div>
              <input
                type="text"
                name="min_price"
                id="min_price"
                className="bg-transparent text-primary-700 outline-none placeholder:text-primary-800 text-sm font-medium"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-[10px] border border-solid border-primary-800 rounded overflow-hidden items-center">
            <div className="bg-divider-300 py-[10px] px-[10px]">
              <span className="text-sm font-semibold text-primary-800">Rp</span>
            </div>
            <div>
              <input
                type="text"
                name="min_price"
                id="min_price"
                className="bg-transparent text-primary-700 outline-none placeholder:text-primary-800 text-sm font-medium"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handlePriceFilter}
          className="w-fit bg-primary-800 p-[10px] rounded-lg text-primary-0 flex gap-[10px] hover:bg-primary-700 active:scale-90 transition-all duration-300"
        >
          <img src="/icon/money.svg" alt="money" />
          Filter Price
        </button>
      </div>
    </>
  );
};
export default FilterMolecules;
