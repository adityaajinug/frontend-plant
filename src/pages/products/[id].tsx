// pages/products/[id].tsx
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
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
// function formatRupiah(angka: any) {
//   return angka.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
// }
const ProductsDetail: React.FC<ProductsDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(router.query);
  const [detail, setDetail] = useState<ProductDetail | null>(null);

  console.log(detail);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        // Fetch product detail using the `id` from the URL query
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/product/detail?id=${id}`
        );
        if (response.status == 200) {
          console.log(response.data.data);
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
        <div className="container mx-auto px-25 mt-[65px]">
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
        </div>
      </Layout>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params!;
//   // Fetch the product detail from an API or database
//   // Here we use a mock product detail for demonstration
//   const productDetail: ProductDetail = {
//     id: Number(id),
//     name: `Sansiviera`,
//     price: 15000,
//     price_discount: 5000,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   };

//   return {
//     props: {
//       detail: productDetail,
//     },
//   };
// };

export default ProductsDetail;
