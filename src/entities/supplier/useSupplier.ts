import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PaginationParams } from "@entities/common/PaginationParams";

import { list } from "./requests/list";
import { create } from "./requests/create";
import { update } from "./requests/update";

const query = ["suppliers"];

export function useSupplierQuery(props: PaginationParams) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  return { data, isLoading, isFetching };
}

export function useSupplierMutate() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: create,
      onSuccess: async () =>
        await queryClient.invalidateQueries({
          queryKey: query,
        }),
    });

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: update,
      onSuccess: async () =>
        await queryClient.invalidateQueries({
          queryKey: query,
        }),
    });

  return {
    mutateAsyncCreate,
    isLoadingCreate,
    mutateAsyncUpdate,
    isLoadingUpdate,
  };
}
