import { Filter, Pencil, Trash2 } from "lucide-react";

import { DataTable } from "@components/DataTable";
import { TriggerDialog } from "@components/TriggerDialog";
import { TextFieldSearch } from "@components/TextFieldSearch";
import { IconButton } from "@components/IconButton";
import { TriggerDrawer } from "@components/TriggerDrawer";

import { FormUpdate } from "../Form";
import { FormFilter } from "../FormFilter";

import { useTableSearchParams } from "@hooks/useTableSearchParams";
import { useTableProductSearchParams } from "@hooks/useTableProductSearchParams";
import {
  useProductQuery,
  useProductMutate,
} from "@entities/product/useProduct";

import { confirmDelete } from "@lib/alert";

export function Table() {
  const { pagination, changes } = useTableSearchParams();
  const { pagination: paginationProduct } = useTableProductSearchParams();

  const { data, isLoading, isFetching } = useProductQuery({
    ...pagination,
    ...paginationProduct,
  });

  const { mutateAsyncDelete } = useProductMutate();

  const { changeSearch } = changes;

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-2">
        <TextFieldSearch
          value={pagination.search || null}
          onChange={(search) => changeSearch(search, "name")}
        />
        <TriggerDrawer
          title="Filtros"
          trigger={
            <IconButton>
              <Filter className="size-6" />
            </IconButton>
          }
        >
          {FormFilter}
        </TriggerDrawer>
      </div>
      <div className="flex-1">
        <DataTable
          data={data?.data || []}
          pagination={data?.pagination}
          isLoading={isLoading}
          isFetching={isFetching}
          options={{
            onExpandRow: (d) => <>{JSON.stringify(d)}</>,
          }}
          columns={[
            {
              label: "Status",
              name: "status",
              options: {
                customBodyRender: (row) => {
                  return row.statusName;
                },
              },
            },
            {
              label: "Nome",
              name: "name",
            },
            {
              label: "Fornecedor",
              name: "supplierId",
              options: {
                customBodyRender: (row) => {
                  return row.supplierName;
                },
              },
            },
            {
              label: "Categoria",
              name: "categoryId",
              options: {
                customBodyRender: (row) => {
                  return row.categoryName;
                },
              },
            },
            {
              label: "Cliente",
              name: "nrClient",
            },
            {
              label: "Ações",
              name: "id",
              options: {
                sort: false,
                classNameHeader: "w-[100px]",
                customBodyRender: (row) => {
                  return (
                    <div className="flex items-center justify-center gap-2">
                      <TriggerDialog
                        title="Atualizar Produto"
                        trigger={
                          <IconButton>
                            <Pencil className="size-5" />
                          </IconButton>
                        }
                      >
                        {({ close }) => <FormUpdate close={close} data={row} />}
                      </TriggerDialog>

                      <IconButton
                        onClick={() =>
                          confirmDelete(() => mutateAsyncDelete(row.id))
                        }
                        severity="error"
                      >
                        <Trash2 className="size-5" />
                      </IconButton>
                    </div>
                  );
                },
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
