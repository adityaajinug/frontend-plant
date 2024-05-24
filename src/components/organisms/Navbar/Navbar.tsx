import React from "react";

export const Navbar = () => {
  return (
    <header className="container mx-auto px-25 shadow-box">
      <div className="flex justify-between items-center">
        <div className="max-w-[115px]">
          <img src="/logo.png" alt="" className="w-full h-full" />
        </div>

        <div>
          <ul className="flex items-center flex-row gap-8 min-h-full">
            <li className="min-h-full relative py-5">
              <a href="#" className="menus">
                Home
              </a>
            </li>
            <li className="min-h-full relative py-5">
              <a href="#" className="menus">
                About
              </a>
            </li>
            <li className="min-h-full relative py-5">
              <a href="#" className="menus">
                Products
              </a>
            </li>
            <li className="min-h-full relative py-5">
              <a href="#" className="menus">
                Blog
              </a>
            </li>
            <li className="min-h-full relative py-5">
              <a href="#" className="menus">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex gap-8">
          <div>
            <img src="/icon/user.svg" alt="" />
          </div>
          <div>
            <img src="/icon/shopping-cart.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};
