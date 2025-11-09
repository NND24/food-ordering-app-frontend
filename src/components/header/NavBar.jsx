"use client";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useFavorite } from "@/context/favoriteContext";
import { useOrder } from "@/context/orderContext";
import { useSocket } from "@/context/socketContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = ({ page }) => {
  const { user } = useAuth();

  const { notifications } = useSocket();
  const { favorite } = useFavorite();
  const { cart } = useCart();
  const { order } = useOrder();

  const { theme } = useTheme();

  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    setCurrentOrders(order?.filter((o) => o.status !== "done"));
  }, [order]);

  return (
    <div
      className='fixed bottom-0 right-0 left-0 z-[99] pt-[5px]
    bg-transparent
   shadow-md 
  border-b border-gray-200 dark:border-gray-700 
  transition-all duration-300
    md:relative md:w-fit md:p-0 md:shadow-none'
    >
      {!user ? (
        <div className='flex items-center gap-[20px] h-[75px]'>
          <Link
            href='/auth/login'
            className='text-white text-[18px] font-semibold cursor-pointer 
          bg-[#fc6011] flex-1 md:flex-none text-center p-[15px] md:py-[10px] md:px-[15px] 
          rounded-[6px] shadow-md hover:shadow-lg transition'
          >
            Đăng nhập
          </Link>
          <Link
            href='/auth/register'
            className='text-white text-[18px] font-semibold cursor-pointer 
          bg-[#fc6011] flex-1 md:flex-none text-center p-[15px] md:py-[10px] md:px-[15px] 
          rounded-[6px] shadow-md hover:shadow-lg transition'
          >
            Đăng ký
          </Link>
        </div>
      ) : (
        <div className='relative flex items-center justify-between h-full w-full md:justify-normal md:gap-[20px]'>
          <div className='flex items-center gap-[20px]'>
            {/* Cart */}
            <Link href='/carts' className='relative group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/cart${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "carts" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/cart_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "carts" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] md:text-[11px] lg:text-[12px] 
              group-hover:text-[#fc6011] 
              ${page == "carts" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
              >
                Giỏ hàng
              </p>

              {cart && cart.length > 0 && (
                <div
                  className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full 
              bg-[#fc6011] border border-white dark:border-gray-900 
              flex items-center justify-center'
                >
                  <span className='text-[11px] text-white'>{cart.length}</span>
                </div>
              )}
            </Link>

            {/* Orders */}
            <Link href='/orders' className='relative group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/ic_order${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "orders" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/ic_order_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "orders" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] md:text-[11px] lg:text-[12px] 
              group-hover:text-[#fc6011] 
              ${page == "orders" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
              >
                Đơn hàng
              </p>

              {order && currentOrders && currentOrders.length > 0 && (
                <div
                  className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full 
              bg-[#fc6011] border border-white dark:border-gray-900 
              flex items-center justify-center'
                >
                  <span className='text-[11px] text-white'>{currentOrders.length}</span>
                </div>
              )}
            </Link>
          </div>

          {/* Home Button (Mobile) */}
          <Link
            href='/home'
            className='absolute top-[-40px] right-[50%] translate-x-[50%] 
          bg-[#fff] dark:bg-gray-800 p-[15px] rounded-full md:hidden shadow-md dark:shadow-gray-800/50 transition'
          >
            <Image
              src='/assets/tab_home.png'
              alt=''
              width={70}
              height={70}
              className={`p-[20px] rounded-full ${page === "home" ? "bg-[#fc6011]" : "bg-[#b6b7b7] dark:bg-gray-700"}`}
            />
          </Link>

          {/* Other Buttons */}
          <div className='flex items-center gap-[20px]'>
            {/* Notification */}
            <div className='hidden md:block'>
              <Link href='/notifications' className='relative group flex flex-col items-center gap-[1px]'>
                <Image
                  src={`/assets/notification${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={24}
                  height={24}
                  className={`group-hover:hidden ${page == "notifications" ? "!hidden" : ""}`}
                />
                <Image
                  src='/assets/notification_active.png'
                  alt=''
                  width={24}
                  height={24}
                  className={`hidden group-hover:block ${page == "notifications" ? "!block" : ""}`}
                />
                <p
                  className={`text-[12px] md:text-[11px] lg:text-[12px] 
                group-hover:text-[#fc6011] 
                ${page == "notifications" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
                >
                  Thông báo
                </p>

                {notifications.filter((n) => n.status === "unread").length > 0 && (
                  <div
                    className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full 
                bg-[#fc6011] border border-white dark:border-gray-900 
                flex items-center justify-center'
                  >
                    <span className='text-[11px] text-white'>
                      {notifications.filter((n) => n.status === "unread").length}
                    </span>
                  </div>
                )}
              </Link>
            </div>

            {/* Favorite */}
            <div className='block md:hidden lg:block'>
              <Link href='/favorite' className='relative group flex flex-col items-center gap-[1px]'>
                <Image
                  src={`/assets/favorite${theme === "dark" ? "_white" : ""}.png`}
                  alt=''
                  width={24}
                  height={24}
                  className={`group-hover:hidden ${page == "favorite" ? "!hidden" : ""}`}
                />
                <Image
                  src='/assets/favorite-active.png'
                  alt=''
                  width={24}
                  height={24}
                  className={`hidden group-hover:block ${page == "favorite" ? "!block" : ""}`}
                />
                <p
                  className={`text-[12px] md:text-[11px] lg:text-[12px] 
                group-hover:text-[#fc6011] 
                ${page == "favorite" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
                >
                  Yêu thích
                </p>

                {favorite && favorite?.store?.length > 0 && (
                  <div
                    className='absolute top-[-6px] right-[6px] w-[21px] h-[21px] text-center rounded-full 
                bg-[#fc6011] border border-white dark:border-gray-900 
                flex items-center justify-center'
                  >
                    <span className='text-[11px] text-white'>{favorite?.store?.length}</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Account */}
            <Link href='/account' className='group flex flex-col items-center gap-[1px]'>
              <Image
                src={`/assets/account${theme === "dark" ? "_white" : ""}.png`}
                alt=''
                width={24}
                height={24}
                className={`group-hover:hidden ${page == "account" ? "!hidden" : ""}`}
              />
              <Image
                src='/assets/account_active.png'
                alt=''
                width={24}
                height={24}
                className={`hidden group-hover:block ${page == "account" ? "!block" : ""}`}
              />
              <p
                className={`text-[12px] md:text-[11px] lg:text-[12px] 
              group-hover:text-[#fc6011] 
              ${page == "account" ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
              >
                Tài khoản
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
