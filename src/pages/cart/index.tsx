import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
import React from "react";

const Carts = () => {
  return (
    <>
      <Layout title="Cart">
        <div className="container mx-auto px-25 mt-[65px]">
          <div className="flex flex-row gap-[82px]">
            <div className="flex gap-8">
              <div className="flex flex-col gap-[18px]">
                <div>
                  <img src="/images/img-card.png" alt="" srcset="" />
                </div>
              </div>
              <div></div>
            </div>
            <div></div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Carts;
