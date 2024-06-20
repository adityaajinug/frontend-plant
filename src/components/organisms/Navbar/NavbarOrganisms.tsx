import { MainLogo } from "@/components/atoms/Logo/MainLogo";
import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const getActiveClass = (path: string) => {
    return router.pathname === path
      ? "after:absolute after:h-[4px] after:bg-primary-800 after:w-full after:left-0 after:bottom-0"
      : "";
  };
  return (
    <header className="container mx-auto px-25 shadow-box sticky top-0 bg-white z-20">
      <div className="flex justify-between items-center">
        <MainLogo />
        <div>
          <ul className="flex items-center flex-row gap-8 min-h-full">
            <li className="min-h-full relative py-5">
              <Link href="/" className="menus">
                Home
              </Link>
            </li>
            <li className="min-h-full relative py-5">
              <Link
                href="/about"
                className={`menus ${getActiveClass("/about")}`}
              >
                About
              </Link>
            </li>
            <li className="min-h-full relative py-5">
              <Link
                href="/products"
                className={`menus ${getActiveClass("/products")}`}
              >
                Products
              </Link>
            </li>
            <li className="min-h-full relative py-5">
              <Link href="/blog" className={`menus ${getActiveClass("/blog")}`}>
                Blog
              </Link>
            </li>
            <li className="min-h-full relative py-5">
              <Link
                href="/contact"
                className={`menus ${getActiveClass("/contact")}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-8">
          <Link href="/cart">
            <img src="/icon/shopping-cart.svg" alt="" />
          </Link>
          {isAuthenticated ? (
            <Link href="/profile" className="flex items-center gap-[6px]">
              <img src="/icon/user.svg" alt="" />
              <span className="text-black font-normal text-sm">{user}</span>
            </Link>
          ) : (
            <Link href="/sign-in">
              <img src="/icon/user.svg" alt="" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
