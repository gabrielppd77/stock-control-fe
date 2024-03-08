import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";
import { AutoCompleteCategory } from "@components/AutoCompleteCategory";
import { DatePicker } from "@components/DatePicker";

import { useProductMutate } from "@entities/product/useProduct";
import { StatusProductEnum } from "@entities/enums/status-product.enum";

const schemaCommon = {
  name: z.string().min(1, { message: "Informe o Nome" }),
  color: z.string().optional(),
  fabric: z.string().optional(),
  measure: z.string().optional(),
  dtEntry: z.date().optional(),
  dtDeparture: z.date().optional(),
  nrClient: z.string().optional(),
  fiscalNoteEntry: z.string().optional(),
  fiscalNoteDeparture: z.string().optional(),
};

interface FormFieldsCommonProps {
  isUpdate: boolean;
}

function FormFieldsCommon({ isUpdate }: FormFieldsCommonProps) {
  return (
    <>
      <TextField label="Nome" name="name" />
      <AutoCompleteSupplier
        label="Fornecedor"
        name="supplierId"
        disabled={isUpdate}
      />
      <AutoCompleteCategory
        label="Categoria"
        name="categoryId"
        disabled={isUpdate}
      />
      <TextField label="Cor" name="color" />
      <TextField label="Tecido" name="fabric" />
      <TextField label="Medidas" name="measure" />
      <DatePicker label="Data de Entrada" name="dtEntry" />
      <DatePicker label="Data de Saída" name="dtDeparture" />
      <TextField label="Número do Cliente" name="nrClient" />
      <TextField label="NF Entrada" name="fiscalNoteEntry" />
      <TextField label="NF Saída" name="fiscalNoteDeparture" />
    </>
  );
}

const schemaCreate = z.object({
  replicate: z
    .string()
    .min(1, { message: "Informe pelo menos 1 para replicar" })
    .max(2, { message: "Informe no máximo 99 para replicar" }),
  supplierId: z.string().min(1, { message: "Informe o Fornecedor" }),
  categoryId: z.string().min(1, { message: "Informe a Categoria" }),
  ...schemaCommon,
});

type FormTypeCreate = z.infer<typeof schemaCreate>;

interface FormCreateProps {
  close: () => void;
}

export function FormCreate(props: FormCreateProps) {
  const { close } = props;

  const defaultValues: FormTypeCreate = {
    replicate: "1",
    supplierId: "",
    categoryId: "",
    name: "",
    color: "",
    fabric: "",
    measure: "",
    nrClient: "",
    fiscalNoteEntry: "",
    fiscalNoteDeparture: "",
  };

  const { mutateAsyncCreate, isLoadingCreate: isLoading } = useProductMutate();

  async function onSubmit({ replicate, ...data }: FormTypeCreate) {
    await mutateAsyncCreate({
      replicate: parseInt(replicate),
      data,
    });
    close();
  }

  return (
    <ActionForm
      onSubmit={onSubmit}
      onCancel={close}
      isLoading={isLoading}
      schema={schemaCreate}
      defaultValues={defaultValues}
    >
      <TextField label="Replicar Cadastro" name="replicate" type="number" />
      <FormFieldsCommon isUpdate={false} />
    </ActionForm>
  );
}

const schemaUpdate = z.object({
  id: z.string(),
  status: z.nativeEnum(StatusProductEnum),
  ...schemaCommon,
});

type FormTypeUpdate = z.infer<typeof schemaUpdate>;

interface FormUpdateProps {
  data: FormTypeUpdate;
  close: () => void;
}

export function FormUpdate(props: FormUpdateProps) {
  const { data, close } = props;

  const defaultValues: FormTypeUpdate = data;

  const { mutateAsyncUpdate, isLoadingUpdate: isLoading } = useProductMutate();

  async function onSubmit({ id, ...data }: FormTypeUpdate) {
    await mutateAsyncUpdate({
      id,
      data,
    });
    close();
  }

  return (
    <ActionForm
      onSubmit={onSubmit}
      onCancel={close}
      isLoading={isLoading}
      schema={schemaUpdate}
      defaultValues={defaultValues}
    >
      <FormFieldsCommon isUpdate={true} />

      {/* <SelectField /> */}
    </ActionForm>
  );
}
