import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ page, limit, total }) => {
  page = Number(page);
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", Number(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getPageNumbers = () => {
    if (totalPages <= 9) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (page <= 4) return [1, 2, 3, 4, "...", totalPages];
    if (page >= totalPages - 3) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", page - 2, page - 1, page, page + 1, page + 2, "...", totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className='mt-5 w-full flex items-center justify-center transition-colors duration-300'>
      {/* Nút Previous */}
      {page > 1 && (
        <button
          className='pr-3 pl-2 py-2 mr-2 text-[#4a4b4d] dark:text-gray-300 
                 border border-[#e0e0e0] dark:border-gray-700 
                 rounded-[6px] h-[40px] bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition'
          onClick={() => handlePageChange(page - 1)}
        >
          <Image src='/assets/arrow_left.png' alt='Prev' width={16} height={16} />
        </button>
      )}

      {/* Các trang */}
      {pages.map((p, index) => (
        <React.Fragment key={index}>
          {p === "..." ? (
            <span className='px-3 py-2 mr-2 text-[#4a4b4d] dark:text-gray-300'>...</span>
          ) : (
            <button
              className={`px-3 py-2 mr-2 border border-[#e0e0e0] dark:border-gray-700 rounded-[6px] h-[40px] 
                      transition-all duration-200 
                      ${
                        p == page
                          ? "bg-[#fc6011] text-white dark:bg-[#fc6011] dark:text-white"
                          : "bg-white text-[#4a4b4d] dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Nút Next */}
      {page < totalPages && (
        <button
          className='pr-2 pl-3 py-2 mr-2 text-[#4a4b4d] dark:text-gray-300 
                 border border-[#e0e0e0] dark:border-gray-700 
                 rounded-[6px] h-[40px] bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition'
          onClick={() => handlePageChange(page + 1)}
        >
          <Image src='/assets/arrow_right.png' alt='Next' width={16} height={16} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
