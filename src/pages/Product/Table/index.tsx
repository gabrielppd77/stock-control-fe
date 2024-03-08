import { DataTable } from "@components/DataTable";

import { useTableSearchParams } from "@hooks/useTableSearchParams";
import { Pencil, Trash2 } from "lucide-react";

import {
  useProductQuery,
  useProductMutate,
} from "@entities/product/useProduct";

import { confirmDelete } from "@lib/alert";
import { TriggerDialog } from "@components/TriggerDialog";
import { FormUpdate } from "../Form";
import { IconButton } from "@components/IconButton";

export function Table() {
  const { pagination } = useTableSearchParams();
  const { data, isLoading, isFetching } = useProductQuery(pagination);

  const { mutateAsyncDelete } = useProductMutate();

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
        {
          header: "Fornecedor",
          accessorKey: "supplierId",
          cell: ({ row }) => {
            const data = row.original;
            return data.supplierName;
          },
        },
        {
          header: "Categoria",
          accessorKey: "categoryId",
          cell: ({ row }) => {
            const data = row.original;
            return data.categoryName;
          },
        },
        {
          header: "Cor",
          accessorKey: "color",
        },
        {
          header: "Tecido",
          accessorKey: "fabric",
        },
        {
          header: "Medidas",
          accessorKey: "measure",
        },
        {
          header: "Ações",
          enableSorting: false,
          size: 120,
          cell: ({ row }) => {
            const data = row.original;
            return (
              <div className="flex items-center justify-center gap-2">
                <TriggerDialog
                  title="Atualizar Produto"
                  trigger={
                    <IconButton>
                      <Pencil />
                    </IconButton>
                  }
                >
                  {(close) => <FormUpdate close={close} data={data} />}
                </TriggerDialog>

                <IconButton
                  onClick={() =>
                    confirmDelete(() => mutateAsyncDelete(data.id))
                  }
                >
                  <Trash2 />
                </IconButton>
              </div>
            );
          },
        },
      ]}
      searchOptions={[
        {
          label: "Nome",
          value: "name",
        },
        {
          label: "Cor",
          value: "color",
        },
        {
          label: "Tecido",
          value: "fabric",
        },
        {
          label: "Medidas",
          value: "measure",
        },
      ]}
    />
  );
}
