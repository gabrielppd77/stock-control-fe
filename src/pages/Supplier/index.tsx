import { PageHeader } from "@components/PageHeader";
import { TriggerDialog } from "@components/TriggerDialog";
import { Button } from "@components/Button";

import { PlusCircle } from "lucide-react";

import { Form } from "./Form";
import { Table } from "./Table";

export function Supplier() {
  return (
    <div className="flex h-full flex-col gap-4">
      <PageHeader
        title="Fornecedores"
        renderRight={
          <TriggerDialog
            title="Cadastro de Fornecedor"
            trigger={<Button icon={PlusCircle}>Adicionar</Button>}
          >
            {(close) => <Form close={close} data={null} />}
          </TriggerDialog>
        }
      />

      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}
