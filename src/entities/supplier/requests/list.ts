import { api } from "@lib/api";

import { PaginationParams } from "@entities/common/PaginationParams";
import { PaginationResponse } from "@entities/common/PaginationResponse";
import { SupplierPresenter } from "../dtos/SupplierPresenter";

interface RequestProps {
  params: PaginationParams;
}

export async function list(props: RequestProps) {
  const { params } = props;
  const response = await api.get<PaginationResponse<SupplierPresenter[]>>(
    "/suppliers",
    {
      params,
    },
  );
  return response.data;
}
