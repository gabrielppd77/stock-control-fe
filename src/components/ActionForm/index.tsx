import { ReactNode } from "react";
import { Button } from "@components/Button";

interface ActionFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  children: ReactNode;
}

export function ActionForm(props: ActionFormProps) {
  const { onCancel, onSubmit, isLoading, children } = props;
  return (
    <div>
      <div>{children}</div>
      <div>
        <Button variant="outline" onClick={() => onCancel()}>
          Cancelar
        </Button>
        <Button onClick={() => onSubmit()} isLoading={isLoading}>
          Salvar
        </Button>
      </div>
    </div>
  );
}
