import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDown } from "lucide-react";

import { LoadingSpinner } from "@components/LoadingSpinner";
import { LinearProgress } from "@components/LinearProgress";
import { SelectField } from "@components/SelectField";

import { Pagination } from "./Pagination";
import { SearchField, SearchOption } from "./SearchField";
import { PaginationOptions } from "@entities/common/PaginationResponse";

import { cn } from "@lib/utils";

import { useTableSearchParams } from "../../hooks/useTableSearchParams";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchOptions: SearchOption<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  data?: TData[];
  pagination?: PaginationOptions;
}

export function DataTable<TData, TValue>({
  columns,
  searchOptions,
  isLoading,
  isFetching,
  data: _data,
  pagination: _pagination,
}: DataTableProps<TData, TValue>) {
  const { changes, pagination } = useTableSearchParams();

  const { order, sort, size } = pagination;
  const { changeSize, changeSort } = changes;

  const table = useReactTable({
    data: _data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative h-full w-full">
      <div className="absolute flex h-full w-full flex-col">
        <SearchField searchOptions={searchOptions} />
        <div className="h-1.5 w-full">{isFetching && <LinearProgress />}</div>
        <div className="flex-1 overflow-auto rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        onClick={() =>
                          changeSort(
                            header.id,
                            order === "desc" ? "asc" : "desc",
                          )
                        }
                        className="flex items-center justify-between hover:cursor-pointer"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {sort === header.id && (
                          <ArrowDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              order === "asc" ? "rotate-0" : "rotate-180",
                            )}
                          />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex w-full justify-center">
                      <LoadingSpinner />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sem resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-center">
          <div className="-mr-20 flex-1 justify-center">
            <Pagination pagination={_pagination} />
          </div>
          <div className="flex h-full w-20 items-center">
            <SelectField
              placeholder=""
              value={size.toString()}
              onValueChange={(value) => changeSize(parseInt(value))}
              options={[
                {
                  label: "10",
                  value: "10",
                },
                {
                  label: "15",
                  value: "15",
                },
                {
                  label: "20",
                  value: "20",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
