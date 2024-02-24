import { z } from "zod";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";

import { useCategoryMutate } from "@entities/category/useCategory";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Informe o nome" }),
});

type FormType = z.infer<typeof FormSchema>;

interface FormProps {
  close: () => void;
  data: FormType | null;
}

export function Form(props: FormProps) {
  const { close, data: _data } = props;

  const defaultValues: FormType = _data || { name: "" };

  const {
    mutateAsyncCreate,
    isLoadingCreate,
    mutateAsyncUpdate,
    isLoadingUpdate,
  } = useCategoryMutate();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  async function onSubmit(data: FormType) {
    if (data.id) {
      await mutateAsyncUpdate({ id: data.id, name: data.name });
    } else {
      await mutateAsyncCreate(data);
    }
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
    </ActionForm>
  );
}
