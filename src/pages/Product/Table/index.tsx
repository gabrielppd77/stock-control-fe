import { useState } from "react";

import { Filter, Pencil, Trash2 } from "lucide-react";

import { DataTable } from "@components/DataTable";
import { TriggerDialog } from "@components/TriggerDialog";
import { TextFieldSearch } from "@components/TextFieldSearch";
import { SelectFieldControlled } from "@components/SelectField";
import { IconButton } from "@components/IconButton";
import { TriggerDrawer } from "@components/TriggerDrawer";

import { FormUpdate } from "../Form";
import { FormFilter } from "../FormFilter";

import { useTableSearchParams } from "@hooks/useTableSearchParams";
import {
  useProductQuery,
  useProductMutate,
} from "@entities/product/useProduct";

import { confirmDelete } from "@lib/alert";

const searchOptions = [
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
];

export function Table() {
  const [field, setField] = useState<string>(searchOptions[0].value);

  const { pagination, changes } = useTableSearchParams();
  const { data, isLoading, isFetching } = useProductQuery(pagination);

  const { mutateAsyncDelete } = useProductMutate();

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
        <TriggerDrawer
          title="Filtros"
          trigger={
            <IconButton>
              <Filter />
            </IconButton>
          }
        >
          {FormFilter}
        </TriggerDrawer>
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
                      {({ close }) => <FormUpdate close={close} data={data} />}
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
