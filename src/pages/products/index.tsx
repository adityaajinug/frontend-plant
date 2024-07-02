import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React, { useEffect, useState } from "react";
import { productDatas } from "@/dummy/Products/productsDummy";
import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { filterDatas } from "@/dummy/Products/filterDummy";
import FilterMolecules from "@/components/molecules/Filter/FilterMolecules";
import axios from "axios";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const fetchFilteredProducts = async () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0)
      params.append("category", JSON.stringify(selectedCategories));

    if (selectedSizes.length > 0)
      params.append("size", JSON.stringify(selectedSizes));

    if (minPrice !== null) params.append("min-price", minPrice.toString());

    if (maxPrice !== null) params.append("max-price", maxPrice.toString());

    if (search !== "") params.append("search", search);

    if (sort !== "") params.append("sort", sort);

    const url = `${
      process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE
    }/product?${params.toString()}`;
    router.push({
      pathname: router.pathname,
      query: Object.fromEntries(params.entries()),
    });

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setFilteredProducts(response.data.data.product);
        setIsFilterApplied(true);
      } else {
        console.error("Error fetching filtered products");
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
  useEffect(() => {
    if (
      selectedCategories.length > 0 ||
      selectedSizes.length > 0 ||
      minPrice !== null ||
      maxPrice !== null ||
      search !== "" ||
      sort !== ""
    ) {
      fetchFilteredProducts();
    } else {
      const fetchAllProducts = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product`
          );
          if (response.status === 200) {
            setFilteredProducts(response.data.data.product);
            setIsFilterApplied(false);
          } else {
            console.error("Error fetching products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchAllProducts();
    }
  }, [selectedCategories, selectedSizes, minPrice, maxPrice, search, sort]);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setMinPrice(null);
    setMaxPrice(null);
    setIsFilterApplied(false);
    setSearch("");
    setSearchInput("");
    setSort("");
  };
  const setPriceRange = (minPrice: number, maxPrice: number) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice || 0);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchInput);
    await fetchFilteredProducts();
  };
  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <>
      <Layout title="Products">
        <div className="container mx-auto px-25 mt-[68px] mb-[162px]">
          <div className="grid grid-cols-12 gap-[89px]">
            <div className="col-span-3">
              {isFilterApplied && (
                <div className="mb-8 flex justify-between items-center">
                  <h3 className="font-semibold text-base">
                    Filter Result is {filteredProducts.length}
                  </h3>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="flex gap-2 bg-primary-800 px-3 py-[6px] text-primary-0 rounded-xl hover:bg-primary-700 button-hover-effect border-none outline-none"
                  >
                    <span className="text-base font-semibold">Clear</span>
                    <img src="/icon/close-circle.svg" alt="close-circle" />
                  </button>
                </div>
              )}
              <FilterMolecules
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                setPriceRange={setPriceRange}
              />
            </div>
            <div className="col-span-9">
              <div className="flex justify-between items-center mb-[35px]">
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex gap-[14px] items-center px-5 py-[10px] border border-solid border-primary-800 rounded-[14px] min-w-[337px] max-w-[337px] overflow-hidden">
                    <img src="/icon/search-normal.svg" alt="search" />
                    <input
                      className="bg-transparent font-normal text-sm text-black placeholder:text-black outline-none border-none w-full"
                      placeholder="Search"
                      name="search"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                </form>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="bg-primary-800 flex gap-2 rounded-xl w-fit px-3 py-[6px] items-center"
                  >
                    <span className="text-white font-semibold text-sm">
                      Sort
                    </span>
                    <img src="/icon/sort.svg" alt="sort" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSortChange("a-z")}
                        className="active:bg-primary-400"
                      >
                        A - Z
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSortChange("z-a")}
                        className="active:bg-primary-400"
                      >
                        Z - A
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSortChange("low-expensive")}
                        className="active:bg-primary-400"
                      >
                        Low - Expensive
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSortChange("expensive-low")}
                        className="active:bg-primary-400"
                      >
                        Expensive - Low
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                {filteredProducts.map((product, index) => (
                  <div className="col-span-4" key={index}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
