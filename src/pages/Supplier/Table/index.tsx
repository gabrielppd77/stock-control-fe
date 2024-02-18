import { DataTable } from "@components/DataTable";

import { useSupplierQuery } from "@entities/supplier/useSupplier";
import { useTableSearchParams } from "@hooks/useTableSearchParams";

export function Table() {
  const { pagination } = useTableSearchParams();
  const { data, isLoading, isFetching } = useSupplierQuery(pagination);

  return (
    <DataTable
      data={data?.data}
      pagination={data?.pagination}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={[
        {
          header: "Nome",
          accessorKey: "name",
        },
      ]}
      searchOptions={[
        {
          label: "Nome",
          value: "name",
        },
      ]}
    />
  );
}
