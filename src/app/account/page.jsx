"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import Header from "@/components/header/Header";
import MobileHeader from "@/components/header/MobileHeader";
import Heading from "@/components/Heading";
import NavBar from "@/components/header/NavBar";
import { authService } from "@/api/authService";
import { useAuth } from "@/context/authContext";

const page = () => {
  const { user, setUser, setUserId } = useAuth();

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await authService.logout();
        setUserId(null);
        setUser(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='pt-[30px] pb-[100px] md:pt-[75px] md:mt-[20px] md:px-0 bg-[#fff] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Heading title='Tài khoản' description='' keywords='' />

      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <MobileHeader />

      <div className='bg-[#fff] dark:bg-gray-800 lg:w-[75%] px-[20px] md:w-[80%] pb-[20px] mb-[20px] md:mx-auto md:border md:border-[#a3a3a3a3] dark:md:border-gray-700 md:border-solid md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden transition-colors duration-300'>
        {/* Hồ sơ người dùng */}
        <Link href='/account/profile' className='flex gap-[15px] my-[20px] cursor-pointer'>
          <div className='relative w-[60px] pt-[60px]'>
            <Image
              src={
                user?.avatar?.url ||
                "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
              }
              alt=''
              layout='fill'
              objectFit='cover'
              className='rounded-[6px]'
            />
          </div>
          <div className='flex flex-1 justify-between items-center'>
            <div>
              <p className='text-[22px] font-semibold text-[#4A4B4D] dark:text-gray-100'>{user?.name}</p>
              <p className='text-[16px] text-[#636464] dark:text-gray-400'>{user?.phonenumber}</p>
            </div>

            <div className='relative w-[30px] pt-[30px]'>
              <Image src='/assets/pencil.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </div>
        </Link>

        {/* Yêu thích */}
        <div className='hidden md:block lg:hidden'>
          <Link
            href='/favorite'
            className='bg-[#fff] dark:bg-gray-800 flex items-center justify-between border-b border-b-[#a3a3a3] dark:border-gray-700 px-[8px] py-[12px] my-[20px] transition-colors'
          >
            <div className='flex items-center gap-[10px]'>
              <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
                <Image src='/assets/favorite.png' alt='' layout='fill' objectFit='contain' />
              </div>
              <span className='text-[20px] font-semibold text-[#4A4B4D] dark:text-gray-100'>Yêu thích</span>
            </div>
            <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </Link>
        </div>

        {/* Địa chỉ */}
        <Link
          href='/account/location'
          className='bg-[#fff] dark:bg-gray-800 flex items-center justify-between border-b border-b-[#a3a3a3] dark:border-gray-700 px-[8px] py-[12px] my-[20px] transition-colors'
        >
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/location.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[20px] font-semibold text-[#4A4B4D] dark:text-gray-100'>Địa chỉ</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </Link>

        {/* Đổi mật khẩu (nếu không login Google) */}
        {!user?.isGoogleLogin && (
          <Link
            href='/account/change-password'
            className='bg-[#fff] dark:bg-gray-800 flex items-center justify-between border-b border-b-[#a3a3a3] dark:border-gray-700 px-[8px] py-[12px] my-[20px] transition-colors'
          >
            <div className='flex items-center gap-[10px]'>
              <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
                <Image src='/assets/lock.png' alt='' layout='fill' objectFit='contain' />
              </div>
              <span className='text-[20px] font-semibold text-[#4A4B4D] dark:text-gray-100'>Đổi mật khẩu</span>
            </div>
            <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
              <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
            </div>
          </Link>
        )}

        {/* Cài đặt */}
        <Link
          href='/account/setting'
          className='bg-[#fff] dark:bg-gray-800 flex items-center justify-between border-b border-b-[#a3a3a3] dark:border-gray-700 px-[8px] py-[12px] my-[20px] transition-colors'
        >
          <div className='flex items-center gap-[10px]'>
            <div className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
              <Image src='/assets/setting.png' alt='' layout='fill' objectFit='contain' />
            </div>
            <span className='text-[20px] font-semibold text-[#4A4B4D] dark:text-gray-100'>Cài đặt</span>
          </div>
          <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
            <Image src='/assets/arrow_right.png' alt='' layout='fill' objectFit='contain' />
          </div>
        </Link>

        {/* Đăng xuất */}
        <button
          onClick={confirmLogout}
          className='bg-[#fc6011] text-white font-semibold w-full p-[20px] rounded-full my-[10px] cursor-pointer shadow-md hover:shadow-lg'
        >
          Đăng Xuất
        </button>
      </div>

      <div className='block md:hidden'>
        <NavBar page='account' />
      </div>
    </div>
  );
};

export default page;
