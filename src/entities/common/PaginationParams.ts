export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  field?: string;
}
