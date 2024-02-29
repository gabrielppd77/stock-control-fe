export interface PaginationQuery<DataType> {
  page: number;
  size: number;
  sort?: keyof DataType;
  order?: "asc" | "desc";
  search?: string;
  field?: keyof DataType;
}
