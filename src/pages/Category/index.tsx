import { Container } from "@components/Container";
import { PageHeader } from "@components/PageHeader";
import { TriggerDialog } from "@components/TriggerDialog";
import { Button } from "@components/Button";

import { PlusCircle } from "lucide-react";

import { Form } from "./Form";
import { Table } from "./Table";

export function Category() {
  return (
    <Container>
      <PageHeader
        title="Categorias"
        renderRight={
          <TriggerDialog
            title="Cadastro de Categoria"
            trigger={<Button icon={PlusCircle}>Adicionar</Button>}
          >
            {(close) => <Form close={close} data={null} />}
          </TriggerDialog>
        }
      />

      <div className="flex-1">
        <Table />
      </div>
    </Container>
  );
}
