import React from "react";

import { Table } from "@/components/ui/table";

import { LinearProgress } from "@components/LinearProgress";

import { Header } from "./Header";
import { Body } from "./Body";
import { Pagination } from "./Pagination";

import { DataTableProps } from "./@types/DataTableProps";

export function DataTable<TData>({
  data,
  columns,
  isLoading,
  isFetching,
  pagination,
  options,
}: DataTableProps<TData>) {
  const [rowsExpanded, setRowsExpanded] = React.useState<number[]>([]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute flex h-full w-full flex-col">
        <div className="h-1.5 w-full">{isFetching && <LinearProgress />}</div>
        <div className="flex-1 overflow-auto rounded-md border">
          <Table>
            <Header
              columns={columns}
              options={options}
              rowsExpanded={rowsExpanded}
              onExpandRow={setRowsExpanded}
              lengthData={data?.length || 0}
            />
            <Body
              data={data}
              columns={columns}
              isLoading={isLoading}
              options={options}
              rowsExpanded={rowsExpanded}
              onExpandRow={setRowsExpanded}
            />
          </Table>
        </div>
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
}
