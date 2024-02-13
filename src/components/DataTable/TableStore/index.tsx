import { create } from "zustand";

type TableStore = {
  paginationParams: {
    page: number;
    size: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
    field?: string;
  };
  paginationsChange: {
    changePage: (page: number) => void;
    changeSize: (size: number) => void;
    changeSortHeader: (sort: string, order: "asc" | "desc") => void;
    changeSearch: (search?: string) => void;
    changeField: (field: string) => void;
  };
  paginationResponse: {
    lastPage: number;
    length: number;
    page: number;
    size: number;
  };
  changePaginationResponse: (paginationResponse: {
    lastPage: number;
    length: number;
    page: number;
    size: number;
  }) => void;
};

export const useTableStore = create<TableStore>()((set) => ({
  paginationParams: {
    page: 0,
    size: 10,
    sort: undefined,
    order: undefined,
    search: undefined,
    field: undefined,
  },
  paginationsChange: {
    changePage: (page) =>
      set((state) => ({
        ...state,
        paginationParams: {
          ...state.paginationParams,
          page,
        },
      })),
    changeSize: (size) =>
      set((state) => ({
        ...state,
        paginationParams: {
          ...state.paginationParams,
          size,
          page: 0,
        },
      })),
    changeSortHeader: (sort, order) =>
      set((state) => ({
        ...state,
        paginationParams: {
          ...state.paginationParams,
          sort,
          order,
        },
      })),
    changeSearch: (search) =>
      set((state) => ({
        ...state,
        paginationParams: {
          ...state.paginationParams,
          search,
        },
      })),
    changeField: (field) =>
      set((state) => ({
        ...state,
        paginationParams: {
          ...state.paginationParams,
          field,
        },
      })),
  },
  paginationResponse: {
    page: 0,
    size: 0,
    lastPage: 0,
    length: 0,
  },
  changePaginationResponse: (paginationResponse) =>
    set((state) => ({
      ...state,
      paginationResponse,
    })),
}));
