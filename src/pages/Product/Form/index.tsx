import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";
import { AutoCompleteSupplier } from "@components/AutoCompleteSupplier";
import { AutoCompleteCategory } from "@components/AutoCompleteCategory";
import { DatePicker } from "@components/DatePicker";

import { useProductMutate } from "@entities/product/useProduct";
import { StatusProductEnum } from "@entities/enums/status-product.enum";
import { SelectNumberField } from "@components/SelectNumberField";
import { Separator } from "@components/ui/separator";

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
      <Separator />
      <TextField label="Cor" name="color" />
      <TextField label="Tecido" name="fabric" />
      <TextField label="Medidas" name="measure" />
      <Separator />
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <DatePicker label="Data de Entrada" name="dtEntry" />
        <DatePicker label="Data de Saída" name="dtDeparture" />
      </div>
      <Separator />
      <TextField label="Número do Cliente" name="nrClient" />
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        <TextField label="NF Entrada" name="fiscalNoteEntry" />
        <TextField label="NF Saída" name="fiscalNoteDeparture" />
      </div>
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
      <div className="flex gap-4">
        <div className="w-40">
          <SelectNumberField label="Replicar Cadastro" name="replicate" />
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <TextField label="Nome" name="name" />
        </div>
      </div>
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
      <TextField label="Nome" name="name" />
      <FormFieldsCommon isUpdate={true} />
    </ActionForm>
  );
}
