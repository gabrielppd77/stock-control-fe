import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";

import { useProductMutate } from "@entities/product/useProduct";

const FormSchema = z.object({
  replicate: z.number(),
  supplierId: z.string().min(1, { message: "Informe o Fornecedor" }),
  categoryId: z.string().min(1, { message: "Informe a Categoria" }),
  name: z.string().min(1, { message: "Informe o Nome" }),
  color: z.string().optional(),
  fabric: z.string().optional(),
  measure: z.string().optional(),
  dtEntry: z.string().optional(),
  dtDeparture: z.string().optional(),
  nrClient: z.string().optional(),
  fiscalNoteEntry: z.string().optional(),
  fiscalNoteDeparture: z.string().optional(),
});

type FormType = z.infer<typeof FormSchema>;

interface FormProps {
  close: () => void;
  data: FormType | null;
}

export function Form(props: FormProps) {
  const { close, data: _data } = props;

  const defaultValues: FormType = _data || {
    replicate: 1,
    supplierId: "2433237e-63d2-4863-85af-fb7f0af9e3e7",
    categoryId: "",
    name: "",
    color: "",
    fabric: "",
    measure: "",
    dtEntry: "",
    dtDeparture: "",
    nrClient: "",
    fiscalNoteEntry: "",
    fiscalNoteDeparture: "",
  };

  const { mutateAsyncCreate, isLoadingCreate: isLoading } = useProductMutate();

  async function onSubmit({ replicate, ...data }: FormType) {
    await mutateAsyncCreate({
      replicate,
      data,
    });
    close();
  }
  return (
    <ActionForm
      onSubmit={onSubmit}
      onCancel={close}
      isLoading={isLoading}
      schema={FormSchema}
      defaultValues={defaultValues}
    >
      <TextField label="Nome" name="name" />
      <AutoCompleteSupplier />
    </ActionForm>
  );
}
