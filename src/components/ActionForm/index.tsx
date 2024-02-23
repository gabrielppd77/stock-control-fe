import { ReactNode } from "react";

import { Button } from "@components/Button";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

import type { ZodSchema } from "zod";

interface ActionFormProps<
  TSchema extends ZodSchema,
  TFieldValues extends FieldValues,
> {
  onSubmit: (data: TFieldValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  children: ReactNode;
  schema: TSchema;
  defaultValues?: DefaultValues<TFieldValues>;
}

export function ActionForm<
  TSchema extends ZodSchema,
  TFieldValues extends FieldValues = FieldValues,
>(props: ActionFormProps<TSchema, TFieldValues>) {
  const { onCancel, onSubmit, isLoading, children, schema, defaultValues } =
    props;

  const form = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="space-y-4">
      <Form {...form}>{children}</Form>
      <div className="flex gap-4">
        <Button fullWidth variant="outline" onClick={() => onCancel()}>
          Cancelar
        </Button>
        <Button
          fullWidth
          onClick={form.handleSubmit(onSubmit)}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
