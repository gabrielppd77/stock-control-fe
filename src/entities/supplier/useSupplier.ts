import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PaginationQuery } from "@entities/common/pagination.query";
import { SupplierPresenter } from "./dtos/supplier.presenter";
import { SearchQuery } from "@entities/common/search.query";

import { list } from "./requests/list";
import { listSearch } from "./requests/list-search";
import { create } from "./requests/create";
import { update } from "./requests/update";
import { remove } from "./requests/remove";

import { extractError } from "@lib/alert";

import { notifyCreate, notifyUpdate, notifyRemove } from "@lib/notification";

const query = ["suppliers"];

export function useSupplierQuery(props: PaginationQuery<SupplierPresenter>) {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...query, props],
    queryFn: () => list({ params: props }),
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching };
}

const querySearch = ["suppliers/search"];

export function useSupplierQuerySearch(props: SearchQuery<SupplierPresenter>) {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: [...querySearch, props],
    queryFn: () => listSearch({ params: props }),
    enabled: false,
  });

  if (error) extractError(error);

  return { data, isLoading, isFetching, refetch };
}

export function useSupplierMutate() {
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
