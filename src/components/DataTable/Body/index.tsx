import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { LoadingSpinner } from "@components/LoadingSpinner";

import { DataTableColumn } from "../@types/DataTableColumn";

interface BodyProps<TData> {
  data?: TData[];
  columns: DataTableColumn<TData>[];
  isLoading: boolean;
}

export function Body<TData>({
  data: _data,
  columns,
  isLoading,
}: BodyProps<TData>) {
  const data = _data || [];

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className="flex w-full justify-center">
              <LoadingSpinner />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Sem resultados
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          {columns.map((col) => {
            const customBodyRender = col.options?.customBodyRender;

            return (
              <TableCell key={col.name}>
                {customBodyRender ? (
                  customBodyRender(row)
                ) : (
                  <>{row[col.name]}</>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
