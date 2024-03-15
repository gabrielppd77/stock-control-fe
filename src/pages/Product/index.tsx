import { Container } from "@components/Container";
import { PageHeader } from "@components/PageHeader";
import { TriggerDialog } from "@components/TriggerDialog";
import { Button } from "@components/Button";

import { PlusCircle } from "lucide-react";

import { FormCreate } from "./Form";
import { Table } from "./Table";

export function Product() {
  return (
    <Container>
      <PageHeader
        title="Produtos"
        renderRight={
          <TriggerDialog
            title="Cadastro de Produto"
            trigger={<Button icon={PlusCircle}>Adicionar</Button>}
          >
            {FormCreate}
          </TriggerDialog>
        }
      />

      <div className="flex-1">
        <Table />
      </div>
    </Container>
  );
}
