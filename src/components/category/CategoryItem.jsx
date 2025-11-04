"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryItem = ({ type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const name = searchParams.get("name") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const limit = searchParams.get("limit") || "20";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    setSelectedCategories(category !== "" ? category.split(",") : []);
  }, [category]);

  const handleCategoryClick = () => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(type._id)) {
      // Nếu đã chọn, thì bỏ chọn
      updatedCategories = updatedCategories.filter((id) => id !== type._id);
    } else {
      // Nếu chưa chọn, thì thêm vào danh sách
      updatedCategories.push(type._id);
    }

    setSelectedCategories(updatedCategories);

    // Cập nhật URL
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (updatedCategories.length > 0) params.set("category", updatedCategories.join(","));
    if (sort) params.set("sort", sort);
    if (limit) params.set("limit", limit);
    if (page) params.set("page", page);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div
      className='category-item relative flex flex-col items-center gap-[6px] w-fit cursor-pointer 
             transition-transform duration-300 hover:scale-105'
      onClick={handleCategoryClick}
      data-category-name={category.name}
    >
      {/* Ảnh danh mục */}
      <div className='relative w-[100px] h-[100px]'>
        <Image
          src={type.image.url}
          layout='fill'
          alt={type.name}
          className={`rounded-full object-cover border-[4px] border-solid 
        ${selectedCategories.includes(type._id) ? "border-[#fc6011]" : "border-gray-200 dark:border-gray-700"}`}
        />
      </div>

      {/* Tên danh mục */}
      <span
        className={`text-[16px] text-center font-semibold line-clamp-2 transition-colors duration-300
      ${selectedCategories.includes(type._id) ? "text-[#fc6011]" : "text-[#4A4B4D] dark:text-gray-200"}`}
      >
        {type.name}
      </span>

      {/* Icon check khi chọn */}
      {selectedCategories.includes(type._id) && (
        <Image
          src='/assets/check_box_circle_active.png'
          alt='selected'
          width={28}
          height={28}
          className='absolute top-1 right-1 drop-shadow-lg'
        />
      )}
    </div>
  );
};

export default CategoryItem;
