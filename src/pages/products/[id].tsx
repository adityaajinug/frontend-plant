// pages/products/[id].tsx
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { productDatas } from "@/dummy/Products/productsDummy";
import Cookies from "universal-cookie";
interface Size {
  size: string;
  size_id: string;
}

interface ProductDetail {
  id: string;
  title: string;
  price: number;
  after_discount: number;
  description: string;
  category: string;
  images: string[];
  size: Size[];
}
interface ProductsDetailProps {
  detail: ProductDetail;
}
interface CartData {
  productId: string;
  selectedSize: string;
  qty: number;
}
const ProductsDetail: React.FC<ProductsDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productId, setProductId] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // Fetch product detail using the `id` from the URL query
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product/detail?id=${id}`
        );
        if (response.status == 200) {
          setDetail(response.data.data);
          console.log("response", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);
  const formatRupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  const handleSizeSelected = (uuid: any) => {
    setSelectedSize(uuid);
  };
  const handleBuyNow = async (id: any) => {
    if (selectedSize) {
      setProductId(id);
      const cartData: CartData = {
        productId: id,
        selectedSize: selectedSize,
        qty: 1,
      };
      // console.log(cookies.get("token"));

      const params = new URLSearchParams();
      params.append("product_id", cartData.productId);
      params.append("size_id", cartData.selectedSize);
      params.append("qty", cartData.qty.toString());

      // console.log("param", params);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/cart/addtocart`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: cookies.get("token"),
            },
          }
        );
        if (response.status == 200) {
          console.log("Product added to cart:", response.data);
          router.push("/cart");
        }
      } catch (error) {
        console.error(
          "There was an error adding the product to the cart:",
          error
        );
      }
    } else {
      alert("Please choose the Size");
    }
  };
  return (
    <>
      <Layout title={detail?.title as string}>
        <div className="container mx-auto px-25 mt-[65px] mb-[162px]">
          <div className="flex flex-row gap-[82px] items-center">
            <div className="flex gap-8">
              <div className="flex flex-col gap-[18px]">
                <div className="max-w-[100px] p-[10px]  min-h-[100px] max-h-[100px]">
                  <img
                    src="/images/img-card.png"
                    alt="img"
                    className="w-full h-full"
                  />
                </div>
                <div className="max-w-[100px] min-h-[100px] max-h-[100px] p-[10px] rounded-md border border-solid border-primary-800">
                  <img
                    src="/images/img-card.png"
                    alt="img"
                    className="w-full h-full"
                  />
                </div>
                <div className="max-w-[100px] p-[10px] min-h-[100px] max-h-[100px]">
                  <img
                    src="/images/img-card.png"
                    alt="img"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="max-w-[383px] min-w-[383px]">
                <img
                  src="/images/img-card.png"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex gap-[46px] flex-col">
              <div className="flex gap-6 flex-col">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{detail?.title}</h1>
                  <div className="flex gap-1 w-full items-center">
                    <s className="font-bold text-primary-900 text-lg">
                      {formatRupiah(detail?.price)}
                    </s>
                    <p className="font-bold text-primary-700 text-lg">
                      {formatRupiah(detail?.after_discount)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[14px] flex-col">
                  <h3 className="font-bold text-base text-black">Size :</h3>
                  <div className="flex gap-[10px]">
                    {detail?.size?.map((size, index) => (
                      <button
                        onClick={() => handleSizeSelected(size.size_id)}
                        key={index}
                        type="button"
                        className={`border border-solid  px-[10px] py-1 rounded-lg max-w-[80px] ${
                          selectedSize === size.size_id
                            ? "bg-primary-50 border-primary-400 text-primary-400"
                            : "bg-primary-0 border border-solid border-divider-500 text-divider-500"
                        }`}
                      >
                        {size.size.charAt(0)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    handleBuyNow(detail?.id);
                  }}
                  type="button"
                  className="w-fit bg-primary-800 py-3 px-[18px] rounded-lg text-primary-0 flex gap-[10px] hover:bg-primary-700 active:scale-90 transition-all duration-300 items-center"
                >
                  <img src="/icon/bags-cart.svg" alt="money" />
                  Buy Now
                </button>
                <button
                  type="button"
                  className="w-fit bg-primary-0 border border-solid border-primary-800 py-3 px-[18px] rounded-lg text-primary-800 flex gap-[10px] hover:bg-primary-50 active:scale-90 transition-all duration-300 font-semibold items-center"
                >
                  <img src="/icon/link.svg" alt="share icon" />
                  Share Product
                </button>
              </div>
            </div>
          </div>
          <div className="mt-[66px]">
            <div className="flex gap-6 border-b-2 border-solid border-[#CCCBCB] w-full">
              <button className="font-semibold text-sm border-b-2 border-solid border-primary-800 py-ten">
                Description
              </button>
              <button className="font-semibold text-sm py-ten">Review</button>
            </div>
            <div className="mt-7">
              <p className="text-sm">{detail?.description}</p>
            </div>
            <div className="flex justify-between mt-[42px] gap-6 border-b-2 border-solid border-[#CCCBCB] w-full">
              <h1 className="font-semibold text-sm py-ten">Related Products</h1>
              <div className="flex gap-[10px] items-center">
                <h4 className="text-primary-700 font-bold text-sm">
                  View More
                </h4>
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
                {productDatas.map((product, index) => (
                  <div className="col-span-3" key={index}>
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

export default ProductsDetail;
