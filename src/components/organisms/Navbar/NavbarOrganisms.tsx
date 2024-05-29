import { MainLogo } from "@/components/atoms/Logo/MainLogo";
import React from "react";

export const Navbar = () => {
  return (
    <header className="container mx-auto px-25 shadow-box sticky top-0 bg-white">
      <div className="flex justify-between items-center">
        <MainLogo />
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
