import { cn } from "@lib/utils";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown } from "lucide-react";

import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { DataTableColumn } from "../@types/DataTableColumn";

interface HeaderProps<TData> {
  columns: DataTableColumn<TData>[];
}

export function Header<TData>(props: HeaderProps<TData>) {
  const { columns } = props;

  const { changes, pagination } = useTableSearchParams();

  const { order, sort } = pagination;
  const { changeSort } = changes;

  return (
    <TableHeader>
      <TableRow>
        {columns.map((col) => {
          const isSort =
            typeof col.options?.sort === "boolean" ? col.options?.sort : true;
          return (
            <TableHead
              key={col.name}
              onClick={
                isSort
                  ? () =>
                      changeSort(col.name, order === "desc" ? "asc" : "desc")
                  : undefined
              }
              className={cn(col.options?.classNameHeader, {
                ["hover:cursor-pointer"]: isSort,
              })}
            >
              <div className="flex items-center justify-between gap-4">
                {col.label}
                {sort === col.name && (
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
    </TableHeader>
  );
}
