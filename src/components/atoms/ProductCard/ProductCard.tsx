import { Products } from "@/types/Products/products";
import Link from "next/link";
import React from "react";
interface ProductCardProps {
  product: Products;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatRupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <>
      <div className="rounded-10 overflow-hidden min-w-65 max-w-65">
        <div className="max-w-65 bg-primary-50">
          <img
            src="/images/img-card.png"
            // src={product.image}
            alt="card"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between w-full items-center mt-[6px]">
          <div className="flex flex-col gap-[6px]">
            <Link
              href={`/products/${product.id}`}
              className="font-semibold text-base text-black hover:text-primary-700"
            >
              {product.title}
            </Link>
            <div className="flex gap-1 w-full items-center">
              <s className="font-bold text-primary-900 text-sm">
                {formatRupiah(product.price)}
              </s>
              <p className="font-bold text-primary-700 text-sm">
                {formatRupiah(product.price_discount)}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="bg-primary-800 rounded-lg p-2 w-fit hover:bg-primary-700"
          >
            <img src="/icon/bags-cart.svg" alt="icon cart" />
          </button>
        </div>
      </div>
    </>
  );
};
