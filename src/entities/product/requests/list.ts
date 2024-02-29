import { api } from "@lib/api";

import { PaginationQuery } from "@entities/common/pagination.query";
import { PaginationPresenter } from "@entities/common/pagination.presenter";
import { ProductPresenter } from "../dtos/product.presenter";

interface RequestProps {
  params: PaginationQuery<ProductPresenter>;
}

export async function list({ params }: RequestProps) {
  const response = await api.get<PaginationPresenter<ProductPresenter[]>>(
    "/products",
    {
      params,
    },
  );
  return response.data;
}
