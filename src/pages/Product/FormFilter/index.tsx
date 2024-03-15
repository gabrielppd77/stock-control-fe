import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";
import { AutoCompleteCategory } from "@components/AutoCompleteCategory";
import { DatePicker } from "@components/DatePicker";
import { Separator } from "@components/ui/separator";

import { useSearchParams } from "react-router-dom";
import { z } from "zod";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {
    supplierId: searchParams.get("supplierId") || "",
    categoryId: searchParams.get("categoryId") || "",
    dtEntryInitial: searchParams.get("dtEntryInitial") || "",
    dtEntryEnd: searchParams.get("dtEntryEnd") || "",
    dtDepartureInitial: searchParams.get("dtDepartureInitial") || "",
    dtDepartureEnd: searchParams.get("dtDepartureEnd") || "",
  };

  async function onSubmit(data: FormType) {
    searchParams.set("supplierId", data?.supplierId || "");
    searchParams.set("categoryId", data?.categoryId || "");
    searchParams.set("dtEntryInitial", data?.dtEntryInitial || "");
    searchParams.set("dtEntryEnd", data?.dtEntryEnd || "");
    searchParams.set("dtDepartureInitial", data?.dtDepartureInitial || "");
    searchParams.set("dtDepartureEnd", data?.dtDepartureEnd || "");
    setSearchParams(searchParams);
    close();
  }

  return (
    <ActionForm
      schema={FormSchema}
      defaultValues={defaultValues}
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
