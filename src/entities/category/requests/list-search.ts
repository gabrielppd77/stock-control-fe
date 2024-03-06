import { api } from "@lib/api";

import { SearchQuery } from "@entities/common/search.query";
import { CategoryPresenter } from "../dtos/category.presenter";

interface RequestProps {
  params: SearchQuery<CategoryPresenter>;
}

export async function listSearch({ params }: RequestProps) {
  const response = await api.get<CategoryPresenter[]>("/categories/search", {
    params,
  });
  return response.data;
}
