import { api } from "@lib/api";

import { SearchQuery } from "@entities/common/search.query";
import { SupplierPresenter } from "../dtos/supplier.presenter";

interface RequestProps {
  params: SearchQuery<SupplierPresenter>;
}

export async function listSearch({ params }: RequestProps) {
  const response = await api.get<SupplierPresenter[]>("/suppliers/search", {
    params,
  });
  return response.data;
}
