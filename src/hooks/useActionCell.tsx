import { ActionCell } from "@components/ActionCell";

import { ColumnDef } from "@tanstack/react-table";

interface useActionCellProps<TData> {
  onEdit: (data: TData) => void;
  onDelete: (data: TData) => void;
}

export function useActionCell<TData, TValue>(
  props: useActionCellProps<TData>,
): ColumnDef<TData, TValue> {
  const { onEdit, onDelete } = props;
  return {
    header: "Ações",
    enableSorting: false,
    size: 120,
    cell: ({ row }) => {
      const data = row.original;
      return <ActionCell data={data} onEdit={onEdit} onDelete={onDelete} />;
    },
  };
}
