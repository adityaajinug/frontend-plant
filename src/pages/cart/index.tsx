import { Button } from "@/components/atoms/Button/Button";
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
interface CartProps {
  cart_id: string;
  title: string;
  image: string;
  price: number;
  price_discount: number;
  product_id: string;
  quantity: number;
  size: string;
}
const Carts = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartProps[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const cookies = new Cookies();
  const formatRupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  const fetchCart = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/cart/getcart`,
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      if (response.status == 200) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error("error fetching", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const handleUpdateCart = async (cartId: string, newQuantity: number) => {
    const param = new URLSearchParams();
    param.append("cart_id", cartId);
    param.append("qty", newQuantity.toString());

    if (newQuantity > 0) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/cart/updatecart`,
          param,
          {
            headers: {
              Authorization: cookies.get("token"),
            },
          }
        );
        if (response.status == 200) {
          fetchCart();
          console.log("response", response.data.data);
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  };
  const handleCartMinus = (cartId: string, quantity: number) => {
    if (quantity === 0) {
      alert("Quantity cannot be less than 0");
      return;
    }
    const newQuantity = quantity - 1;
    handleUpdateCart(cartId, newQuantity);
  };
  const handleCartPlus = (cartId: string, quantity: number) => {
    const newQuantity = quantity + 1;
    handleUpdateCart(cartId, newQuantity);
  };
  const handleProductSelect = (productId: string) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const getTotalProductsSelected = () => {
    return selectedProducts.length;
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      if (selectedProducts.includes(item?.cart_id)) {
        totalPrice += item.price * item.quantity;
      }
    });
    return totalPrice;
  };
  const handleCheckAll = () => {
    if (selectedProducts.length === cart.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(cart.map((item) => item.cart_id));
    }
  };
  useEffect(() => {
    if (selectedProducts.length === cart.length && cart.length > 0) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedProducts, cart]);

  const handleProcessCheckout = () => {
    // Simpan selectedProducts ke localStorage
    if (selectedProducts.length > 0) {
      setIsSuccess(true);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
      router.push("/checkout");
    } else {
      alert("please choose products");
    }

    // Tambahkan logika checkout lainnya di sini
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
                <div className="flex items-center gap-42 py-ten px-5 bg-white rounded-t-lg mb-2">
                  <input
                    type="checkbox"
                    name="choose-all"
                    id="check"
                    className="categories-checkbox"
                    checked={isAllSelected}
                    onChange={handleCheckAll}
                  />
                  <span className="font-bold text-primary-800 text-lg">
                    Choose All
                  </span>
                </div>
                {isLoading
                  ? Array.from({ length: 2 }).map((_, index) => (
                      <div
                        className="flex p-5 gap-42 items-center justify-between bg-white border-b border-divider-400"
                        key={index}
                      >
                        <div className="flex gap-42 items-start">
                          <div className="font-semibold text-lg text-black w-5 h-5 rounded bg-divider-400 animate-pulse"></div>

                          <div className="font-semibold text-lg text-black w-192 h-192 rounded bg-divider-400 animate-pulse"></div>
                        </div>

                        <div className="flex gap-six w-full justify-between">
                          <div className="flex flex-col gap-six">
                            <div className="font-semibold text-lg text-black w-20 h-5 rounded bg-divider-400 animate-pulse"></div>
                            <div className="flex gap-1 w-full items-center">
                              <div className="font-semibold text-lg text-black w-24 h-5 rounded bg-divider-400 animate-pulse"></div>
                              <div className="font-semibold text-lg text-black w-20 h-5 rounded bg-divider-400 animate-pulse"></div>
                            </div>
                            <div className="font-semibold text-lg text-black w-16 h-5 rounded bg-divider-400 animate-pulse"></div>
                          </div>
                          <div className="flex gap-6 items-center">
                            <div className="font-semibold text-lg text-black w-8 h-3 rounded bg-divider-400 animate-pulse"></div>
                            <div className="font-semibold text-lg text-black w-5 h-3 rounded bg-divider-400 animate-pulse"></div>
                            <div className="font-semibold text-lg text-black w-8 h-3 rounded bg-divider-400 animate-pulse"></div>
                            <div className="font-semibold text-lg text-black w-9 h-9 rounded bg-divider-400 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : cart.map((item, index) => (
                      <div
                        className="flex p-5 gap-42 items-center justify-between bg-white border-b border-divider-400"
                        key={index}
                      >
                        <div className="flex gap-42 items-start">
                          <input
                            type="checkbox"
                            name="choose-all"
                            id={`check-${item?.cart_id}`}
                            className="categories-checkbox p-2"
                            onChange={() => handleProductSelect(item?.cart_id)}
                            checked={selectedProducts.includes(item?.cart_id)}
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
                              {item?.title}
                            </h3>
                            <div className="flex gap-1 w-full items-center">
                              <s className="font-bold text-primary-900 text-sm">
                                {formatRupiah(item?.price_discount)}
                              </s>
                              <p className="font-bold text-primary-700 text-sm">
                                {formatRupiah(item?.price)}
                              </p>
                            </div>
                            <span className="text-sm text-primary-700 font-semibold">
                              Size : {item?.size.charAt(0)}
                            </span>
                          </div>
                          <div className="flex gap-6 items-center">
                            <button
                              onClick={() =>
                                handleCartMinus(item?.cart_id, item?.quantity)
                              }
                              type="button"
                              className="p-ten font-semibold"
                            >
                              <img
                                src="/icon/minus.svg"
                                alt="minus"
                                className="w-6 h-6"
                              />
                            </button>
                            <span className="font-semibold">
                              {item?.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleCartPlus(item?.cart_id, item?.quantity)
                              }
                              type="button"
                              className="p-ten font-semibold"
                            >
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
                    ))}
              </div>
              <div className="col-span-4">
                {
                  <div className="rounded-lg bg-white flex flex-col gap-5 p-5">
                    <h4 className="text-black font-bold text-base">
                      {getTotalProductsSelected()} Product Selected
                    </h4>
                    <div className="flex justify-between">
                      <h4 className="text-black font-bold text-base">Total</h4>
                      <h4 className="text-black font-bold text-base">
                        Rp. {getTotalPrice().toLocaleString()}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleProcessCheckout()}
                      type="button"
                      className={`py-[10px] px-8 ${
                        isSuccess
                          ? "bg-divider-500 hover:bg-divider-500"
                          : "bg-primary-800 hover:bg-primary-700"
                      } rounded-[6px] w-full text-white font-semibold  active:scale-90 transition-all duration-300`}
                      disabled={isSuccess}
                    >
                      {isSuccess ? (
                        <img
                          src="/icon/loading.gif"
                          alt="Loading"
                          className="h-6 w-12 mx-auto"
                        />
                      ) : (
                        `Process Checkout`
                      )}
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Carts;
