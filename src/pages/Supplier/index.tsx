import { PageHeader } from "@components/PageHeader";
import { ActionDialog } from "@components/ActionDialog";
import { Button } from "@components/Button";

import { PlusCircle } from "lucide-react";

import { Table } from "./Table";

export function Supplier() {
  return (
    <div className="flex h-full flex-col gap-4">
      <PageHeader
        title="Fornecedores"
        renderRight={
          <ActionDialog
            title="Cadastro de Fornecedor"
            onSubmit={async () => undefined}
            trigger={
              <Button icon={PlusCircle} onClick={() => undefined}>
                Adicionar
              </Button>
            }
          >
            content
          </ActionDialog>
        }
      />

      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}
