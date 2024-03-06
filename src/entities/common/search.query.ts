export interface SearchQuery<DataType> {
  search: string;
  field: keyof DataType;
}
