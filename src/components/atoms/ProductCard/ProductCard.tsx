import { Products } from "@/types/Products/products";
import React from "react";
interface ProductCardProps {
  product: Products;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <>
      <div className="rounded-10 overflow-hidden min-w-65 max-w-65">
        <div className="max-w-65 bg-primary-50">
          <img
            src="/images/img-card.png"
            alt="card"
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-between w-full items-center mt-[6px]">
          <div className="flex flex-col gap-[6px]">
            <h4 className="font-semibold text-base text-black">
              {product.name}
            </h4>
            <div className="flex gap-1 w-full items-center">
              <s className="font-bold text-primary-900 text-sm">
                {product.price}
              </s>
              <p className="font-bold text-primary-700 text-sm">
                {product.price_discount}
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
