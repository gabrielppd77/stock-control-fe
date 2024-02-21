import { ColumnDef, Table, flexRender } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { LoadingSpinner } from "@components/LoadingSpinner";

interface BodyProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
}

export function Body<TData, TValue>(props: BodyProps<TData, TValue>) {
  const { table, columns, isLoading } = props;
  return (
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
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Sem resultados
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
