import { useQuery } from "@tanstack/react-query";

import { PaginationParams } from "@entities/common/PaginationParams";

import { list } from "./requests/list";

const query = ["categories"];

export function useCategoryQuery(props: PaginationParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  return { data, isLoading, isFetching };
}
