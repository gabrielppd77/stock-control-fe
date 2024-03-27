import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";
import { AutoCompleteCategory } from "@components/AutoCompleteCategory";
import { DatePicker } from "@components/DatePicker";
import { Separator } from "@components/ui/separator";

import { z } from "zod";

import { useTableProductSearchParams } from "@hooks/useTableProductSearchParams";

const FormSchema = z.object({
  supplierId: z.string().optional(),
  categoryId: z.string().optional(),
  dtEntryInitial: z.string().optional(),
  dtEntryEnd: z.string().optional(),
  dtDepartureInitial: z.string().optional(),
  dtDepartureEnd: z.string().optional(),
});

type FormType = z.infer<typeof FormSchema>;

interface FormFilterProps {
  close: () => void;
}

export function FormFilter({ close }: FormFilterProps) {
  const { pagination, changePagination } = useTableProductSearchParams();

  async function onSubmit(data: FormType) {
    changePagination({
      supplierId: data?.supplierId || "",
      categoryId: data?.categoryId || "",
      dtEntryInitial: data?.dtEntryInitial || "",
      dtEntryEnd: data?.dtEntryEnd || "",
      dtDepartureInitial: data?.dtDepartureInitial || "",
      dtDepartureEnd: data?.dtDepartureEnd || "",
    });
    close();
  }

  return (
    <ActionForm
      schema={FormSchema}
      defaultValues={pagination}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <AutoCompleteSupplier name="supplierId" label="Fornecedor" />
      <AutoCompleteCategory name="categoryId" label="Categoria" />
      <Separator />
      <DatePicker name="dtEntryInitial" label="Data de Entrada Início" />
      <DatePicker name="dtEntryEnd" label="Data de Entrada Fim" />
      <Separator />
      <DatePicker name="dtDepartureInitial" label="Data de Saída Início" />
      <DatePicker name="dtDepartureEnd" label="Data de Saída Fim" />
    </ActionForm>
  );
}
