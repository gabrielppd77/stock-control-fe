import { api } from "@lib/api";

import { PaginationQuery } from "@entities/common/pagination.query";
import { PaginationPresenter } from "@entities/common/pagination.presenter";
import { SupplierPresenter } from "../dtos/supplier.presenter";

interface RequestProps {
  params: PaginationQuery<SupplierPresenter>;
}

export async function list({ params }: RequestProps) {
  const response = await api.get<PaginationPresenter<SupplierPresenter[]>>(
    "/suppliers",
    {
      params,
    },
  );
  return response.data;
}
