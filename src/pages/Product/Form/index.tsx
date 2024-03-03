import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";

import { useProductMutate } from "@entities/product/useProduct";
import { AutoComplete } from "@components/AutoComplete";

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
    supplierId: "",
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

      <AutoComplete
        label="Fornecedor"
        name="supplierId"
        data={[
          { value: "1", label: "1 label" },
          { value: "2", label: "2 label" },
          { value: "3", label: "3 label" },
          { value: "4", label: "4 label" },
          { value: "5", label: "5 label" },
        ]}
      />
    </ActionForm>
  );
}
