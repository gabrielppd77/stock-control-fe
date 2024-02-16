import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

import { useTableStore } from "../TableStore";

import { PaginationButton } from "./PaginationButton";

function generatePagination(
  currentPage: number,
  totalPages: number,
  visiblePages: number,
) {
  const halfVisible = Math.floor(visiblePages / 2);
  let startPage = Math.max(currentPage - halfVisible, 1);
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const paginationArray = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationArray.push(i);
  }

  return paginationArray;
}

export function Pagination() {
  const { paginationResponse, paginationsChange } = useTableStore();
  const { page, lastPage } = paginationResponse;
  const { changePage } = paginationsChange;

  const pages = generatePagination(page, lastPage - 1, 5);

  const showEllipsis = pages.length > 0;

  const showButtonLastPage = lastPage > 0;

  return (
    <div className="flex items-center justify-end space-x-2 py-3">
      <PaginationUI>
        <PaginationContent>
          <PaginationButton
            disabled={page <= 0}
            onClick={() => changePage(page - 1)}
          >
            Anterior
          </PaginationButton>

          <PaginationButton
            onClick={() => changePage(0)}
            isSelected={page == 0}
          >
            1
          </PaginationButton>

          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map((index) => (
            <PaginationButton
              key={index}
              isSelected={index === page}
              onClick={() => changePage(index)}
            >
              {index + 1}
            </PaginationButton>
          ))}

          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {showButtonLastPage && (
            <PaginationButton
              onClick={() => changePage(lastPage)}
              isSelected={page == lastPage}
            >
              {lastPage + 1}
            </PaginationButton>
          )}

          <PaginationButton
            disabled={page >= lastPage}
            onClick={() => changePage(page + 1)}
          >
            Próximo
          </PaginationButton>
        </PaginationContent>
      </PaginationUI>
    </div>
  );
}
