"use client";
import Link from "next/link";
import React from "react";
import StoreSlider from "./StoreSlider";
import { groupStoresByCategory } from "@/utils/functions";
import StoreBigSlider from "./StoreBigSlider";

const ListStore = ({ allStore }) => {
  const groupedStores = groupStoresByCategory(allStore);

  return (
    <>
      {groupedStores.map(({ category, stores }) => (
        <div key={category._id} className='mb-[20px]'>
          <div className='flex items-center justify-between mb-[5px]'>
            <h3 className='text-[#4A4B4D] dark:text-gray-100 text-[24px] font-bold line-clamp-1'>{category.name}</h3>
            <Link href={`/search?category=${category._id}`} className='whitespace-nowrap text-[#fc6011] text-[16px]'>
              Xem tất cả
            </Link>
          </div>

          <div className='hidden sm:block'>
            <StoreBigSlider reverse={true} allStore={stores} />
            {/* {stores.length > 6 ? (
              <>
                <StoreBigSlider reverse={true} allStore={stores.slice(0, Math.ceil(stores.length / 2))} />
                <StoreBigSlider reverse={false} allStore={stores.slice(Math.ceil(stores.length / 2))} />
              </>
            ) : (
              <StoreBigSlider reverse={true} allStore={stores} />
            )} */}
          </div>
          <div className='block sm:hidden'>
            <StoreSlider reverse={true} stores={stores} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListStore;
