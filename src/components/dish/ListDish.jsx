"use client";
import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { dishService } from "@/api/dishService";

const ListDish = ({ storeInfo, cartItems }) => {
  const [allDishGroups, setAllDishGroups] = useState(null);

  const getStoreGroupDish = async () => {
    try {
      const response = await dishService.getActiveStoreDishGroups(storeInfo._id);
      setAllDishGroups(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (storeInfo) {
      getStoreGroupDish();
    }
  }, [storeInfo]);

  return (
    <>
      {allDishGroups?.length > 0 &&
        allDishGroups.map((group) =>
          group.dishes.length > 0 ? (
            <div key={group._id} className='mb-[20px]'>
              <h3 className='text-[#4A4B4D] text-[24px] font-bold mb-[5px] line-clamp-2'>{group.name}</h3>
              <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2'>
                {group.dishes?.map((dish) => (
                  <DishCard key={dish._id} dish={dish} storeInfo={storeInfo} cartItems={cartItems} />
                ))}
              </div>
            </div>
          ) : null
        )}
    </>
  );
};

export default ListDish;
