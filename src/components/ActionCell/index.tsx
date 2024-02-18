import { Pencil, Trash2 } from "lucide-react";

interface ActionCellProps<DataType> {
  data: DataType;
  onEdit: (data: DataType) => void;
  onDelete: (data: DataType) => void;
}

export function ActionCell<DataType>(props: ActionCellProps<DataType>) {
  const { data, onEdit, onDelete } = props;
  return (
    <div className="flex items-center justify-center gap-4">
      <Pencil className="hover:cursor-pointer" onClick={() => onEdit(data)} />
      <Trash2 className="hover:cursor-pointer" onClick={() => onDelete(data)} />
    </div>
  );
}
