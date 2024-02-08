import { DataTable } from "@components/DataTable";

import { useQuery } from "@tanstack/react-query";
import { list } from "@entities/suppllier";

export function Table() {
  const {
    data: _d,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["/supplier"],
    queryFn: async () =>
      await list({
        params: {
          page: 0,
          size: 10,
        },
      }),
  });

  return (
    <DataTable
      data={_d?.data || []}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={[
        {
          header: "Nome",
          accessorKey: "name",
        },
      ]}
    />
  );
}
