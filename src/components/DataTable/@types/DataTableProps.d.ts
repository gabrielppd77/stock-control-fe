import { PageOptionsPresenter } from "@entities/common/pagination.presenter";
import { DataTableColumn } from "./DataTableColumn";

interface DataTableProps<TData> {
  data?: TData[];
  columns: DataTableColumn<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  pagination?: PageOptionsPresenter;
  options?: DataTableOptions;
}
