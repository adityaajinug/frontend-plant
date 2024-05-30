import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React from "react";
import { productDatas } from "@/dummy/Products/productsDummy";
import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { filterDatas } from "@/dummy/Products/filterDummy";

const Products = () => {
  return (
    <>
      <Layout title="Products">
        <div className="container mx-auto px-25 mt-[68px]">
          <div className="grid grid-cols-12 gap-[89px]">
            <div className="col-span-3">
              <div className="flex flex-col gap-6 px-4 py-[18px] bg-primary-50 rounded-lg">
                <div className="flex flex-col gap-6">
                  <h3 className="text-black font-semibold text-base">
                    Categories
                  </h3>
                  <div className="flex flex-col gap-4">
                    {filterDatas.categories.map((category, index) => (
                      <div className="flex gap-2 items-center" key={index}>
                        <input
                          type="checkbox"
                          name="checkbox"
                          id={`${category.name}-${index}`}
                          className="categories-checkbox"
                        />
                        <label
                          htmlFor={`${category.name}-${index}`}
                          className="text-base font-medium text-black"
                        >
                          {category.name}
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
                          name="checkbox"
                          id={`${size.name}-${index}`}
                          className="categories-checkbox"
                        />
                        <label
                          htmlFor={`${size.name}-${index}`}
                          className="text-base font-medium text-black"
                        >
                          {size.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-black font-semibold text-base">Price</h3>
                  <div className="flex gap-[10px] border border-solid border-primary-800 rounded overflow-hidden items-center">
                    <div className="bg-divider-300 py-[10px] px-[10px]">
                      <span className="text-sm font-semibold text-primary-800">
                        Rp
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="min_price"
                        id="min_price"
                        className="bg-transparent text-primary-700 outline-none placeholder:text-primary-800 text-sm font-medium"
                        placeholder="Min Price"
                      />
                    </div>
                  </div>
                  <div className="flex gap-[10px] border border-solid border-primary-800 rounded overflow-hidden items-center">
                    <div className="bg-divider-300 py-[10px] px-[10px]">
                      <span className="text-sm font-semibold text-primary-800">
                        Rp
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="min_price"
                        id="min_price"
                        className="bg-transparent text-primary-700 outline-none placeholder:text-primary-800 text-sm font-medium"
                        placeholder="Max Price"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-fit bg-primary-800 p-[10px] rounded-lg text-primary-0 flex gap-[10px] hover:bg-primary-700 active:scale-90 transition-all duration-300"
                >
                  <img src="/icon/money.svg" alt="money" />
                  Filter Price
                </button>
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex justify-between items-center mb-[35px]">
                <div className="flex gap-[14px] items-center px-5 py-[10px] border border-solid border-primary-800 rounded-[14px] min-w-[337px] max-w-[337px] overflow-hidden">
                  <img src="/icon/search-normal.svg" alt="search" />
                  <input
                    className="bg-transparent font-normal text-sm text-black placeholder:text-black outline-none border-none w-full"
                    placeholder="Search"
                  />
                </div>
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
                      <a className="active:bg-primary-400">A - Z</a>
                    </li>
                    <li>
                      <a>Z - A</a>
                    </li>
                    <li>
                      <a className="active:bg-primary-400">Low - Expensive</a>
                    </li>
                    <li>
                      <a className="active:bg-primary-400">Expensive - Low</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5">
                {productDatas.slice(0, 6).map((product, index) => (
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
