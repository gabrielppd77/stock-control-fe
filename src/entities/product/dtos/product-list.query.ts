import { PaginationQuery } from "@entities/common/pagination.query";
import { ProductPresenter } from "./product.presenter";

export interface ProductListQuery extends PaginationQuery<ProductPresenter> {
  supplierId?: string;
  categoryId?: string;
  dtEntryInitial?: string;
  dtEntryEnd?: string;
  dtDepartureInitial?: string;
  dtDepartureEnd?: string;
  onlyUnavaibles?: boolean;
}
