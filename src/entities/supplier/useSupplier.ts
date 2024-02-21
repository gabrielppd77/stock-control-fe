import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PaginationParams } from "@entities/common/PaginationParams";

import { list } from "./requests/list";
import { create } from "./requests/create";
import { update } from "./requests/update";
import { remove } from "./requests/remove";

import { extractError } from "@lib/alert";

const query = ["suppliers"];

export function useSupplierQuery(props: PaginationParams) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching };
}

export function useSupplierMutate() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: create,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: query,
        }),
      onError: extractError,
    });

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: update,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: query,
        }),
      onError: extractError,
    });

  const { mutateAsync: mutateAsyncDelete, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: remove,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: query,
        }),
      onError: extractError,
    });

  return {
    mutateAsyncCreate,
    isLoadingCreate,
    mutateAsyncUpdate,
    isLoadingUpdate,
    mutateAsyncDelete,
    isLoadingDelete,
  };
}
