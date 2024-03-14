import { useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import { DataTable } from "@components/DataTable";
import { TriggerDialog } from "@components/TriggerDialog";
import { IconButton } from "@components/IconButton";
import { TextFieldSearch } from "@components/TextFieldSearch";
import { SelectFieldControlled } from "@components/SelectField";

import { Form } from "../Form";

import {
  useSupplierMutate,
  useSupplierQuery,
} from "@entities/supplier/useSupplier";
import { useTableSearchParams } from "@hooks/useTableSearchParams";

import { confirmDelete } from "@lib/alert";

const searchOptions = [
  {
    label: "Nome",
    value: "name",
  },
];

export function Table() {
  const [field, setField] = useState<string>(searchOptions[0].value);

  const { pagination, changes } = useTableSearchParams();
  const { data, isLoading, isFetching } = useSupplierQuery(pagination);
  const { mutateAsyncDelete } = useSupplierMutate();

  const { changeSearch } = changes;

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2">
        <TextFieldSearch onChange={(search) => changeSearch(search, field)} />
        <SelectFieldControlled
          options={searchOptions}
          value={field}
          onChange={setField}
        />
      </div>
      <div className="flex-1">
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
                      title="Atualizar Fornecedor"
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
                      severity="error"
                    >
                      <Trash2 />
                    </IconButton>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
