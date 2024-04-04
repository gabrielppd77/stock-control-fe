export interface DataTableOptions<TData> {
  onExpandRow: (row: TData) => React.ReactElement;
}
