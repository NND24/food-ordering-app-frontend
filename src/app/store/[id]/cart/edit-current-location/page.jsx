"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Header from "@/components/header/Header";
import Heading from "@/components/Heading";
import { useStoreLocation } from "@/context/storeLocationContext";
import { locationService } from "@/api/locationService";

const page = () => {
  const router = useRouter();
  const { id: storeId } = useParams();

  const { storeLocation, setStoreLocation } = useStoreLocation();

  const [name, setName] = useState(storeLocation.name || "");
  const [address, setAddress] = useState(storeLocation.address || "");
  const [contactName, setContactName] = useState(storeLocation.contactName || "");
  const [contactPhonenumber, setContactPhonenumber] = useState(storeLocation.contactPhonenumber || "");
  const [detailAddress, setDetailAddress] = useState(storeLocation.detailAddress || "");
  const [note, setNote] = useState(storeLocation.note || "");
  const [addSuccess, setAddSuccess] = useState(false);

  const addToLocation = async () => {
    if (!name) {
      toast.error("Vui lòng nhập tên!");
    } else {
      try {
        await locationService.addLocation({
          name,
          address,
          location: {
            type: "Point",
            coordinates: [storeLocation?.lon ?? 200, storeLocation?.lat ?? 200],
          },
          detailAddress,
          note,
          contactName,
          contactPhonenumber,
          type: "familiar",
        });
        setAddSuccess(true);
        toast.success("Thêm địa chỉ thành công");
      } catch (error) {
        setAddSuccess(false);
      }
    }
  };

  return (
    <div className='pt-[85px] pb-[90px] md:pt-[75px] md:mt-[20px] md:px-0 bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'>
      <Heading title='Thêm chi tiết địa chỉ' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      <div className='bg-white dark:bg-gray-800 lg:w-[60%] md:w-[80%] md:mx-auto md:border md:border-gray-300 dark:md:border-gray-700 md:rounded-[10px] md:shadow-[rgba(0,0,0,0.24)_0px_3px_8px] md:overflow-hidden md:p-[20px]'>
        <div
          className='fixed top-0 right-0 left-0 z-10 flex items-center gap-[40px] bg-white dark:bg-gray-800 h-[85px] px-[10px] md:static'
          style={{ borderBottom: "6px solid #e0e0e0a3" }}
        >
          <Link href={`/store/${storeId}/cart`} className='relative w-[30px] pt-[30px] md:w-[25px] md:pt-[25px]'>
            <Image src='/assets/arrow_left_long.png' alt='' layout='fill' objectFit='contain' />
          </Link>
          <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[24px] font-bold'>Thêm chi tiết địa chỉ</h3>
        </div>

        <form>
          {/* Tên */}
          <div className='relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex absolute top-[10px] left-[10px]'>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Tên</span>
            </div>
            <input
              type='text'
              placeholder=''
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='bg-transparent text-[18px] md:text-[14px] w-full outline-none dark:placeholder-gray-400'
            />
          </div>

          {/* Địa chỉ */}
          <div className='relative flex items-center justify-between gap-[10px] bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex-1 line-clamp-1'>
              <div className='flex absolute top-[10px] left-[10px]'>
                <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
                <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Địa chỉ</span>
              </div>
              <input
                type='text'
                readOnly
                value={address}
                className='bg-transparent text-[18px] md:text-[14px] w-full dark:placeholder-gray-400'
              />
            </div>
          </div>

          {/* Địa chỉ chi tiết */}
          <div className='relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex absolute top-[10px] left-[10px]'>
              <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Địa chỉ chi tiết</span>
            </div>
            <input
              type='text'
              onChange={(e) => setDetailAddress(e.target.value)}
              value={detailAddress}
              placeholder='Vd: tên tòa nhà / địa chỉ gần đó'
              className='bg-transparent text-[18px] md:text-[14px] w-full dark:placeholder-gray-400'
            />
          </div>

          {/* Ghi chú */}
          <div className='relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex absolute top-[10px] left-[10px]'>
              <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Ghi chú cho tài xế</span>
            </div>
            <input
              type='text'
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder='Chỉ dẫn chi tiết cho tài xế'
              className='bg-transparent text-[18px] md:text-[14px] w-full dark:placeholder-gray-400'
            />
          </div>

          {/* Người nhận */}
          <div className='relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex absolute top-[10px] left-[10px]'>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Tên người nhận</span>
            </div>
            <input
              type='text'
              onChange={(e) => setContactName(e.target.value)}
              value={contactName}
              className='bg-transparent text-[18px] md:text-[14px] w-full dark:placeholder-gray-400'
            />
          </div>

          {/* SĐT */}
          <div className='relative flex items-center bg-white dark:bg-gray-800 text-[#636464] dark:text-gray-200 w-full px-[10px] pt-[28px] pb-[12px] gap-[8px] border-b border-gray-200 dark:border-gray-700'>
            <div className='flex absolute top-[10px] left-[10px]'>
              <span className='text-[14px] text-red-500 md:text-[12px]'>*</span>
              <span className='text-[14px] md:text-[12px] text-black dark:text-gray-200'>Số điện thoại liên lạc</span>
            </div>
            <input
              type='text'
              onChange={(e) => setContactPhonenumber(e.target.value)}
              value={contactPhonenumber}
              className='bg-transparent text-[18px] md:text-[14px] w-full dark:placeholder-gray-400'
            />
          </div>

          {/* Lưu vào địa chỉ */}
          <div className='flex items-center justify-between gap-[10px] p-[20px] dark:bg-gray-800'>
            <div className='flex flex-col'>
              <span className='text-[18px] text-[#4a4b4d] dark:text-gray-100 font-bold'>Thêm vào Địa chỉ đã lưu</span>
              <span className='text-[15px] text-[#a4a5a8] dark:text-gray-400'>
                Lưu nơi này cho các đơn đặt hàng cho tương lai
              </span>
            </div>

            <div className='relative w-[25px] pt-[25px] cursor-pointer' onClick={addToLocation}>
              <Image
                src={`/assets/favorite${addSuccess ? "-active" : ""}.png`}
                alt=''
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        </form>
      </div>

      {/* Nút lưu */}
      <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 px-[10px] py-[15px] z-[100] flex items-center gap-[10px] border-t border-gray-200 dark:border-gray-700'>
        <button
          onClick={() => {
            setStoreLocation({
              address,
              contactName,
              contactPhonenumber,
              detailAddress,
              name,
              note,
              lat: storeLocation.lat,
              lon: storeLocation.lon,
            });
            router.push(`/store/${storeId}/cart`);
          }}
          className='flex items-center justify-center lg:w-[60%] md:w-[80%] md:mx-auto rounded-[8px] bg-[#fc6011] hover:bg-[#e3550f] text-white py-[15px] px-[10px] w-full shadow-md hover:shadow-lg transition-colors duration-300'
        >
          <span className='text-[20px] font-semibold'>Lưu</span>
        </button>
      </div>
    </div>
  );
};

export default page;
