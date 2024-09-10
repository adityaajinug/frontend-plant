import { MainLogo } from "@/components/atoms/Logo/MainLogo";
import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import Cookies from "universal-cookie";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [countCart, setCountCart] = useState(0);
  const cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(true);

  const getActiveClass = (path: string) => {
    return router.pathname === path
      ? "after:absolute after:h-[4px] after:bg-primary-800 after:w-full after:left-0 after:bottom-0"
      : "";
  };
  const fetchCountCart = async () => {
    setIsLoading(true); // Tampilkan shimmer saat memulai pengambilan data
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}/cart/getcountcart`,
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      if (response.status === 200) {
        setCountCart(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    } finally {
      setIsLoading(false); // Sembunyikan shimmer setelah mendapatkan respons
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchCountCart();
    }
  }, [isAuthenticated]);
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
            <div className="relative">
              <img src="/icon/shopping-cart.svg" alt="" />
              {isLoading ? (
                <div className="bg-divider-400 w-3 h-3 rounded-full absolute top-[-5px] right-[-5px] animate-pulse"></div>
              ) : (
                <div>
                  {countCart !== 0 && (
                    <div className="absolute top-[-10px] right-[-10px]">
                      <span className="text-white bg-primary-800 rounded-full px-1 text-xs">
                        {countCart}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
          {isAuthenticated ? (
            <Dropdown>
              <DropdownTrigger>
                {/* <Button variant="bordered">Open Menu</Button> */}
                <button type="button" className="flex items-center gap-[6px]">
                  <img src="/icon/user.svg" alt="" />
                  <span className="text-black font-normal text-sm">{user}</span>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="profile">
                  <Link href="/profile" className="border border-solid w-full">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                >
                  <Link href="/profile" className="border border-solid w-full">
                    Logout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
