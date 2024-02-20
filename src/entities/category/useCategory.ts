import { useQuery } from "@tanstack/react-query";

import { PaginationParams } from "@entities/common/PaginationParams";

import { list } from "./requests/list";

import { extractError } from "@lib/alert";

const query = ["categories"];

export function useCategoryQuery(props: PaginationParams) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching };
}
