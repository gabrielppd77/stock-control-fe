import { DataTable } from "@components/DataTable";

import { list } from "@entities/suppllier";

export function Table() {
  return (
    <DataTable
      columns={[
        {
          header: "Nome",
          accessorKey: "name",
        },
      ]}
      queryKey={["supplier"]}
      queryFn={async (params) => await list({ params })}
      searchOptions={[
        {
          label: "Nome",
          value: "name",
        },
      ]}
    />
  );
}
