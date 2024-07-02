import { Button } from "@/components/atoms/Button/Button";
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React, { useState } from "react";

const Carts = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const formatRupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <>
      <Layout title="Cart">
        <section className="container mx-auto px-25 bg-primary-50 h-full pb-[162px]">
          <div className="py-27 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                src="/icon/arrow-left.svg"
                alt="arrow-left"
                className="w-4 h-4"
              />
              <h3 className="text-base text-primary-800 font-semibold">
                Back to Shopping
              </h3>
            </div>
            <h1 className="text-32 font-semibold text-primary-800">
              Shopping Cart
            </h1>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8">
                <div className="flex items-center gap-42 py-ten px-5 bg-white rounded-t-lg">
                  <input
                    type="checkbox"
                    name="choose-all"
                    id="check"
                    className="categories-checkbox"
                  />
                  <span className="font-bold text-primary-800 text-lg">
                    Choose All
                  </span>
                </div>
                <div className="mt-2 flex p-5 gap-42 items-center justify-between bg-white border-b border-divider-400">
                  <div className="flex gap-42 items-start">
                    <input
                      type="checkbox"
                      name="choose-all"
                      id="check"
                      className="categories-checkbox p-2"
                    />
                    <div className="max-w-192">
                      <img
                        src="/images/img-card.png"
                        alt="card"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex gap-six w-full justify-between">
                    <div className="flex flex-col gap-six">
                      <h3 className="font-semibold text-lg text-black">
                        Sansiviera
                      </h3>
                      <div className="flex gap-1 w-full items-center">
                        <s className="font-bold text-primary-900 text-sm">
                          {formatRupiah(15000)}
                        </s>
                        <p className="font-bold text-primary-700 text-sm">
                          {formatRupiah(5000)}
                        </p>
                      </div>
                      <span className="text-sm text-primary-700 font-semibold">
                        Size : S
                      </span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <button type="button" className="p-ten font-semibold">
                        <img
                          src="/icon/minus.svg"
                          alt="minus"
                          className="w-6 h-6"
                        />
                      </button>
                      <span className="font-semibold">2</span>
                      <button type="button" className="p-ten font-semibold">
                        <img
                          src="/icon/add.svg"
                          alt="minus"
                          className="w-6 h-6"
                        />
                      </button>
                      <button
                        type="button"
                        className="p-ten font-semibold bg-primary-800 rounded-lg"
                      >
                        <img
                          src="/icon/trash.svg"
                          alt="trash"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="rounded-lg bg-white flex flex-col gap-5 p-5">
                  <h4 className="text-black font-bold text-base">
                    1 Product Selected
                  </h4>
                  <div className="flex justify-between">
                    <h4 className="text-black font-bold text-base">Total</h4>
                    <h4 className="text-black font-bold text-base">
                      Rp. 10.0000
                    </h4>
                  </div>
                  <Button
                    button={{
                      text: "Process To Checkout",
                      disabled: isLoading,
                      isLoading: isLoading,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Carts;
