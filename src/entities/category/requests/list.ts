import { api } from "@lib/api";

import { PaginationQuery } from "@entities/common/pagination.query";
import { PaginationPresenter } from "@entities/common/pagination.presenter";
import { CategoryPresenter } from "../dtos/category.presenter";

interface RequestProps {
  params: PaginationQuery<CategoryPresenter>;
}

export async function list({ params }: RequestProps) {
  const response = await api.get<PaginationPresenter<CategoryPresenter[]>>(
    "/categories",
    {
      params,
    },
  );
  return response.data;
}
