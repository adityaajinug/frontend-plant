import React from "react";

export const Banner = () => {
  return (
    <div className="container mx-auto px-25 rounded-xl mt-10">
      <div className="bg-primary-50 py-5 px-[50px] flex gap-[108px] justify-between items-center">
        <div className="flex flex-col gap-7 xl:max-w-[549px]">
          <h1 className="text-primary-800 text-5xl font-bold leading-[100%]">
            Get 20% Off <br /> Let’s Order Now
          </h1>
          <p className="text-divider-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultricies ornare arcu, et pulvinar lectus tincidunt ac. Duis
            pulvinar purus id pellentesque finibus. Nunc purus tellus, viverra
            ac sempe
          </p>
          <a
            href="#"
            className="py-[10px] px-8 bg-primary-800 rounded-[4px] w-fit text-white font-semibold hover:bg-primary-700"
          >
            Shop Now
          </a>
        </div>
        <div className="min-w-[483px] max-w-[483px] rounded-lg overflow-hidden">
          <img
            src="/images/banner-img.jpg"
            alt="banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
