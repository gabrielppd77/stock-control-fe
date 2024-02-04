import { useState } from "react";

import { ActionDialog } from "@components/ActionDialog";
import { Button } from "@components/Button";
import { PageHeader } from "@components/PageHeader";

import { PlusCircle } from "lucide-react";

import { Form } from "./Form";

export function Supplier() {
  const [data, setData] = useState(null);

  function onClickAdd() {
    setData(null);
  }

  return (
    <div>
      <PageHeader
        title="Fornecedores"
        renderRight={
          <ActionDialog
            title="Cadastro de Fornecedor"
            onSubmit={async () => undefined}
            trigger={
              <Button icon={PlusCircle} onClick={onClickAdd}>
                Adicionar
              </Button>
            }
          >
            <Form data={data} onAfterSubmit={() => undefined} />
          </ActionDialog>
        }
      />
    </div>
  );
}
