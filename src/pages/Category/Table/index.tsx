import { DataTable } from "@components/DataTable";

import { useTableSearchParams } from "@hooks/useTableSearchParams";
import { Pencil, Trash2 } from "lucide-react";

import { confirmDelete } from "@lib/alert";
import { TriggerDialog } from "@components/TriggerDialog";
import { Form } from "../Form";
import { IconButton } from "@components/IconButton";

import {
  useCategoryMutate,
  useCategoryQuery,
} from "@entities/category/useCategory";

export function Table() {
  const { pagination } = useTableSearchParams();
  const { data, isLoading, isFetching } = useCategoryQuery(pagination);

  const { mutateAsyncDelete } = useCategoryMutate();

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
          header: "Ações",
          enableSorting: false,
          size: 120,
          cell: ({ row }) => {
            const data = row.original;
            return (
              <div className="flex items-center justify-center gap-2">
                <TriggerDialog
                  title="Atualizar Categoria"
                  trigger={
                    <IconButton>
                      <Pencil />
                    </IconButton>
                  }
                >
                  {(close) => <Form close={close} data={data} />}
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
      ]}
    />
  );
}