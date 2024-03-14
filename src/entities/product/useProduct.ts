import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProductListQuery } from "./dtos/product-list.query";

import { list } from "./requests/list";
import { create } from "./requests/create";
import { update } from "./requests/update";
import { remove } from "./requests/remove";

import { extractError } from "@lib/alert";

import { notifyCreate, notifyUpdate, notifyRemove } from "@lib/notification";

const query = ["products"];

export function useProductQuery(props: ProductListQuery) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching };
}

export function useProductMutate() {
  const queryClient = useQueryClient();

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: create,
      onSuccess: () => {
        notifyCreate();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: update,
      onSuccess: () => {
        notifyUpdate();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
      onError: extractError,
    });

  const { mutateAsync: mutateAsyncDelete, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: remove,
      onSuccess: () => {
        notifyRemove();
        queryClient.invalidateQueries({
          queryKey: query,
        });
      },
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
