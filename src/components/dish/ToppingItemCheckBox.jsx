import Image from "next/image";
import React from "react";

const ToppingItemCheckBox = ({ topping, toppingGroup, selectedTopping, handleChooseTopping }) => {
  const isChecked = selectedTopping?.some((tp) => tp._id === topping._id);
  const isOutOfStock = topping.status === "OUT_OF_STOCK";

  return (
    <div
      className={`
        flex mb-[2px] items-center justify-between p-4 rounded-lg border transition
        ${isOutOfStock ? "opacity-50 pointer-events-none" : "cursor-pointer"}

        ${
          isChecked
            ? "bg-orange-50 dark:bg-orange-900/30 border-[#fc6011]"
            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-800"
        }
      `}
      onClick={() => !isOutOfStock && handleChooseTopping(topping, topping.price, toppingGroup)}
      name='checkedBtn'
    >
      <div className='flex items-center gap-4'>
        <Image
          src={isChecked ? "/assets/check_box_checked.png" : "/assets/check_box_empty.png"}
          alt={isChecked ? "checked" : "unchecked"}
          width={22}
          height={22}
        />

        <div className='flex flex-col'>
          <h3 className='text-[#333] dark:text-gray-100 text-[16px] md:text-[18px] font-medium' name='toppingName'>
            {topping.name}
          </h3>

          {isOutOfStock && <span className='text-red-500 text-sm mt-1 font-medium'>Hết hàng</span>}
        </div>
      </div>

      {topping.price !== 0 && (
        <span
          className='text-[#4A4B4D] dark:text-gray-200 text-[16px] md:text-[18px] font-semibold'
          name='toppingPrice'
        >
          +{Number(topping.price).toLocaleString("vi-VN")}đ
        </span>
      )}
    </div>
  );
};

export default ToppingItemCheckBox;
