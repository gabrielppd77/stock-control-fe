export interface DataTableColumnOptions<TData> {
  sort?: boolean;
  customBodyRender?: (col: TData) => React.ReactElement | string;
  classNameHeader?: React.ClassAttributes;
}
