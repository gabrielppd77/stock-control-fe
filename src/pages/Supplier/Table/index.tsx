import { Pencil, Trash2 } from "lucide-react";

import { DataTable } from "@components/DataTable";
import { TriggerDialog } from "@components/TriggerDialog";
import { IconButton } from "@components/IconButton";
import { TextFieldSearch } from "@components/TextFieldSearch";

import { Form } from "../Form";

import {
  useSupplierMutate,
  useSupplierQuery,
} from "@entities/supplier/useSupplier";
import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { confirmDelete } from "@lib/alert";

export function Table() {
  const { pagination, changes } = useTableSearchParams();
  const { data, isLoading, isFetching } = useSupplierQuery(pagination);
  const { mutateAsyncDelete } = useSupplierMutate();

  const { changeSearch } = changes;

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2">
        <TextFieldSearch
          value={pagination.search || null}
          onChange={(search) => changeSearch(search, "name")}
        />
      </div>
      <div className="flex-1">
        <DataTable
          data={data?.data}
          columns={[
            {
              name: "name",
              label: "Nome",
            },
            {
              name: "id",
              label: "Ações",
              options: {
                sort: false,
                classNameHeader: "w-[120px]",
                customBodyRender: (row) => {
                  return (
                    <div className="flex items-center justify-center gap-2">
                      <TriggerDialog
                        title="Atualizar Fornecedor"
                        trigger={
                          <IconButton>
                            <Pencil />
                          </IconButton>
                        }
                      >
                        {({ close }) => <Form close={close} data={row} />}
                      </TriggerDialog>

                      <IconButton
                        onClick={() =>
                          confirmDelete(() => mutateAsyncDelete(row.id))
                        }
                        severity="error"
                      >
                        <Trash2 />
                      </IconButton>
                    </div>
                  );
                },
              },
            },
          ]}
          isLoading={isLoading}
          isFetching={isFetching}
          pagination={data?.pagination}
        />
      </div>
    </div>
  );
}
