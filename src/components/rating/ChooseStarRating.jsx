import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const ChooseStarRating = ({ ratingValue, setRatingValue }) => {
  const { theme } = useTheme();
  const handleStarClick = (index) => {
    setRatingValue(index + 1);
  };

  return (
    <div className='flex items-center gap-[15px]'>
      {Array.from({ length: 5 }, (_, index) => (
        <Image
          key={index}
          src={index < ratingValue ? "/assets/star_active.png" : `/assets/star${theme === "dark" ? "_white" : ""}.png`}
          alt=''
          width={40}
          height={40}
          onClick={() => handleStarClick(index)}
          className='cursor-pointer'
        />
      ))}
    </div>
  );
};

export default ChooseStarRating;
