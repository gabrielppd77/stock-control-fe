import { useSearchParams } from "react-router-dom";

export function useTableSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";
  const sort = searchParams.get("sort") || undefined;
  const order = (searchParams.get("order") || undefined) as
    | "asc"
    | "desc"
    | undefined;
  const search = searchParams.get("search") || undefined;
  const field = searchParams.get("field") || undefined;

  async function changeSize(size: number) {
    searchParams.set("size", size.toString());
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  function changeSort(sort: string, order: "asc" | "desc") {
    searchParams.set("sort", sort);
    searchParams.set("order", order);
    setSearchParams(searchParams);
  }

  function changePage(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  function changeSearch(search: string, field: string) {
    searchParams.set("search", search);
    searchParams.set("field", field);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  return {
    pagination: {
      page: parseInt(page),
      size: parseInt(size),
      order,
      sort,
      search,
      field,
    },
    changes: {
      changeSize,
      changeSort,
      changePage,
      changeSearch,
    },
  };
}
