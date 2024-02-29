export interface PageOptionsPresenter {
  length: number;
  size: number;
  lastPage: number;
  page: number;
  startIndex: number;
  endIndex: number;
}

export interface PaginationPresenter<DataType> {
  data: DataType;
  pagination: PageOptionsPresenter;
}
