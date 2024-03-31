import { DataTableColumnOptions } from "./DataTableColumnOptions";

interface DataTableColumn<TData> {
  name: keyof TData extends string ? keyof TData : never;
  label: string;
  options?: DataTableColumnOptions<TData>;
}
