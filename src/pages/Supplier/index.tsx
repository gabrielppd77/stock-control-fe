import { ActionDialog } from "@components/ActionDialog";
import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";

import { PlusCircle } from "lucide-react";

import { Form } from "./Form";

export function Supplier() {
  return (
    <div>
      <PageHeader
        title="Fornecedores"
        renderRight={
          <ActionDialog
            title="Cadastro de Fornecedor"
            onSubmit={async () => undefined}
            trigger={<Button icon={PlusCircle}>Adicionar</Button>}
          >
            <Form />
          </ActionDialog>
        }
      />
    </div>
  );
}
