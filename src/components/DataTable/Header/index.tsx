import { cn } from "@lib/utils";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ChevronDown } from "lucide-react";

import { IconButton } from "@components/IconButton";

import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { DataTableColumn } from "../@types/DataTableColumn";
import { DataTableOptions } from "../@types/DataTableOptions";

interface HeaderProps<TData> {
  columns: DataTableColumn<TData>[];
  options?: DataTableOptions<TData>;
  rowsExpanded: number[];
  onExpandRow: (rows: number[]) => void;
  lengthData: number;
}

export function Header<TData>({
  columns,
  options,
  rowsExpanded,
  onExpandRow,
  lengthData,
}: HeaderProps<TData>) {
  const { changes, pagination } = useTableSearchParams();

  const { order, sort } = pagination;
  const { changeSort } = changes;

  const isRowExpandable = options?.onExpandRow ? true : false;
  const isExpanded = rowsExpanded.length > 0;

  function onChangeAllExpanded() {
    if (isExpanded) {
      onExpandRow([]);
    } else {
      const rowsToExpand: number[] = [];
      for (let index = 0; index < lengthData; index++) {
        rowsToExpand.push(index);
      }
      onExpandRow(rowsToExpand);
    }
  }

  return (
    <TableHeader>
      <TableRow>
        {isRowExpandable && (
          <TableHead>
            <div className="flex justify-center">
              <IconButton onClick={() => onChangeAllExpanded()}>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded ? "rotate-180" : "rotate-0",
                  )}
                />
              </IconButton>
            </div>
          </TableHead>
        )}
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
