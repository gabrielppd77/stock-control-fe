export interface PaginationOptions {
  length: number;
  size: number;
  lastPage: number;
  page: number;
}

export interface PaginationResponse<DataType> {
  data: DataType;
  pagination: PaginationOptions;
}