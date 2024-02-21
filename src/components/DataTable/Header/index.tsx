import { cn } from "@lib/utils";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown } from "lucide-react";

import { Table, flexRender } from "@tanstack/react-table";

import { useTableSearchParams } from "@hooks/useTableSearchParams";

interface HeaderProps<TData> {
  table: Table<TData>;
}

export function Header<TData>(props: HeaderProps<TData>) {
  const { table } = props;

  const { changes, pagination } = useTableSearchParams();

  const { order, sort } = pagination;
  const { changeSort } = changes;

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const enableSorting =
              typeof header.column.columnDef.enableSorting === "undefined"
                ? true
                : header.column.columnDef.enableSorting;
            return (
              <TableHead
                onClick={() => {
                  if (!enableSorting) return;
                  changeSort(header.id, order === "desc" ? "asc" : "desc");
                }}
                key={header.id}
                style={{
                  width:
                    header.getSize() !== 150 ? header.getSize() : undefined,
                }}
              >
                <div
                  className={cn({
                    ["flex items-center justify-between hover:cursor-pointer"]:
                      enableSorting,
                  })}
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
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
