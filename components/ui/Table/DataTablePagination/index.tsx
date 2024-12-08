import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "../../button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize; // Get page size
  const totalRows = table.getFilteredRowModel().rows.length;

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  useEffect(() => {
    table.setPageSize(8);
  }, [table]);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage < 5) {
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(pageCount);
      } else if (currentPage >= 5 && currentPage < pageCount - 2) {
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(pageCount);
      } else {
        pageNumbers.push("...");
        for (let i = pageCount - 3; i < pageCount; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(pageCount);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col text-xs md:text-sm md:flex-row items-center justify-between">
      <div className="flex-1  text-muted-foreground">
        Showing data {startRow} - {endRow} of {totalRows} entries.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8 mt-5 md:mt-0">
        <div className="flex items-center space-x-3">
          <Button
            className="h-8 w-8 p-0 text-[#404B52] bg-[#F5F5F5] border-2 border-[#EEEEEE]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {renderPageNumbers().map((number, index) => (
            <Button
              key={index}
              className={`h-8 w-8 p-0 text-xs md:text-sm ${
                currentPage === number
                  ? "bg-[#5932EA] text-white"
                  : "text-[#404B52]  bg-[#F5F5F5] border-2 border-[#EEEEEE]"
              } ${number === "..." ? "cursor-default" : ""}`}
              onClick={() =>
                typeof number === "number" && table.setPageIndex(number - 1)
              }
              disabled={number === "..."}
            >
              {number}
            </Button>
          ))}

          <Button
            className="h-8 w-8 p-0 text-[#404B52] bg-[#F5F5F5] border-2 border-[#EEEEEE]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
