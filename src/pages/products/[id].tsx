// pages/products/[id].tsx
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { ProductCard } from "@/components/atoms/ProductCard/ProductCard";
import { productDatas } from "@/dummy/Products/productsDummy";
interface Size {
  size: string;
  uuid: string;
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
const ProductsDetail: React.FC<ProductsDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [detail, setDetail] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // Fetch product detail using the `id` from the URL query
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product/detail?id=${id}`
        );
        if (response.status == 200) {
          setDetail(response.data.data);
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
                    <button
                      type="button"
                      className="uppercase bg-primary-50 border border-solid text-primary-400 border-primary-400 px-[10px] py-1 rounded-lg max-w-[80px]"
                    >
                      S
                    </button>
                    <button
                      type="button"
                      className="uppercase bg-primary-0 border border-solid border-divider-500 text-divider-500 px-[10px] py-1 rounded-lg max-w-[80px]"
                    >
                      M
                    </button>
                    <button
                      type="button"
                      className="uppercase bg-primary-0 border border-solid border-divider-500 text-divider-500 px-[10px] py-1 rounded-lg max-w-[80px]"
                    >
                      L
                    </button>
                    <button
                      type="button"
                      className="uppercase bg-primary-0 border border-solid border-divider-500 text-divider-500 px-[10px] py-1 rounded-lg max-w-[80px]"
                    >
                      XL
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <button
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
