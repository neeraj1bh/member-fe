import React, { FC, useMemo } from "react";
import Button from "../../components/Button";
import ArrowLeft from "@/app/assets/ArrowLeft";
import ArrowRight from "@/app/assets/ArrowRight";

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({
  itemsPerPage = 10,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNavigation = (step: number) => {
    const newPage = currentPage + step;
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const pages = useMemo(() => {
    const pageArray = [1];

    const addPage = (page: number) => {
      if (!pageArray.includes(page)) {
        pageArray.push(page);
      }
    };

    const addEllipsisIfNeeded = (start: number, end: number) => {
      if (end - start > 1) {
        pageArray.push(-1);
      }
    };

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(currentPage + 1, totalPages - 1);

    addEllipsisIfNeeded(1, start);
    for (let i = start; i <= end; i++) {
      addPage(i);
    }
    addEllipsisIfNeeded(end, totalPages);

    if (totalPages !== 1) {
      addPage(totalPages);
    }

    return pageArray;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full py-2 flex justify-between">
      <Button
        variant="outlined"
        className="flex gap-1"
        disabled={currentPage === 1}
        onClick={() => {
          handleNavigation(-1);
        }}
      >
        <ArrowLeft />
        Previous
      </Button>
      <div>
        {pages.map((page, index) => {
          if (page === -1) {
            return (
              <Button key={index} disabled>
                ...
              </Button>
            );
          }
          return (
            <Button
              key={index}
              className={
                currentPage === page ? "bg-purple-200 text-purple-700" : ""
              }
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
      <Button
        variant="outlined"
        className=" flex gap-1"
        disabled={currentPage === totalPages}
        onClick={() => {
          handleNavigation(1);
        }}
      >
        Next
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
