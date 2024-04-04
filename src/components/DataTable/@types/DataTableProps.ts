import { PageOptionsPresenter } from "@entities/common/pagination.presenter";
import { DataTableColumn } from "./DataTableColumn";
import { DataTableOptions } from "./DataTableOptions";

export interface DataTableProps<TData> {
  data?: TData[];
  columns: DataTableColumn<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  pagination?: PageOptionsPresenter;
  options?: DataTableOptions<TData>;
}
