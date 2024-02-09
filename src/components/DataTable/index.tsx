import { useState } from "react";

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

import { Pagination } from "./Pagination";
import { SearchField } from "./SearchField";

import { useQuery } from "@tanstack/react-query";

import {
  PaginationResponse,
  PaginationOptions,
} from "@entities/common/PaginationResponse";
import { PaginationParams } from "@entities/common/PaginationParams";
import { cn } from "@lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  queryKey: string[];
  queryFn: (params: PaginationParams) => Promise<PaginationResponse<TData[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  queryKey,
  queryFn,
}: DataTableProps<TData, TValue>) {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 0,
    size: 10,
  });

  const {
    data: _d,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [...queryKey, paginationParams],
    queryFn: () => queryFn(paginationParams),
  });

  const data = _d?.data || ([] as TData[]);

  const pagination =
    _d?.pagination ||
    ({
      lastPage: 0,
      length: 0,
      page: 0,
      size: 0,
    } as PaginationOptions);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <SearchField
        onChange={(value) =>
          setPaginationParams((prev) => ({
            ...prev,
            search: value,
          }))
        }
      />
      <div className="h-1.5 w-full">{isFetching && <LinearProgress />}</div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      onClick={() =>
                        setPaginationParams((prev) => ({
                          ...prev,
                          sort: header.id,
                          order: prev.order === "asc" ? "desc" : "asc",
                        }))
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
                      {paginationParams.sort === header.id && (
                        <ArrowDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            paginationParams.order === "asc"
                              ? "rotate-0"
                              : "rotate-180",
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

      <Pagination
        page={paginationParams.page}
        visibles={5}
        lastPage={pagination.lastPage}
        onChange={(page) => setPaginationParams((prev) => ({ ...prev, page }))}
      />

      <div>Seleção de itens visiveis</div>
    </div>
  );
}
