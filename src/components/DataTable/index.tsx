import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";

import { LinearProgress } from "@components/LinearProgress";

import { Header } from "./Header";
import { SearchControl, SearchOption } from "./SearchControl";
import { Body } from "./Body";
import { Pagination } from "./Pagination";

import { PageOptionsPresenter } from "@entities/common/pagination.presenter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchOptions: SearchOption<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  data?: TData[];
  pagination?: PageOptionsPresenter;
}

export function DataTable<TData, TValue>({
  columns,
  searchOptions,
  isLoading,
  isFetching,
  data: _data,
  pagination: _pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: _data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative h-full w-full">
      <div className="absolute flex h-full w-full flex-col">
        <SearchControl searchOptions={searchOptions} />
        <div className="h-1.5 w-full">{isFetching && <LinearProgress />}</div>
        <div className="flex-1 overflow-auto rounded-md border">
          <Table>
            <Header table={table} />
            <Body table={table} columns={columns} isLoading={isLoading} />
          </Table>
        </div>
        <Pagination pagination={_pagination} />
      </div>
    </div>
  );
}
