import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";
import { AutoCompleteCategory } from "@components/AutoCompleteCategory";
import { DatePicker } from "@components/DatePicker";

import { useProductMutate } from "@entities/product/useProduct";
import { StatusProductEnum } from "@entities/enums/status-product.enum";
import { SelectNumberField } from "@components/SelectNumberField";

//TODO: size layout form have be fix, find out Grid component seemen with Material UI to fix this problem
//TODO: Dialog will have differents sizes of width
//TODO: add field select status <SelectField /> uncontrolled

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
    .number()
    .min(1, { message: "Informe pelo menos 1 para replicar" })
    .max(100, { message: "Informe no máximo 100 para replicar" }),
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
    replicate: 1,
    supplierId: "",
    categoryId: "",
    name: "",
  };

  const { mutateAsyncCreate, isLoadingCreate: isLoading } = useProductMutate();

  async function onSubmit({ replicate, ...data }: FormTypeCreate) {
    console.log({ data, replicate });
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
      schema={schemaCreate}
      defaultValues={defaultValues}
    >
      <SelectNumberField label="Replicar Cadastro" name="replicate" />
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
    </ActionForm>
  );
}
