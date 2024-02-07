import { PageHeader } from "@components/PageHeader";

import { Table } from "./Table";

export function Supplier() {
  // const [data, setData] = useState(null);

  // function onClickAdd() {
  //   setData(null);
  // }

  return (
    <div className="flex h-full flex-col gap-4">
      <PageHeader
        title="Fornecedores"
        // renderRight={
        //   <ActionDialog
        //     title="Cadastro de Fornecedor"
        //     onSubmit={async () => undefined}
        //     trigger={
        //       <Button icon={PlusCircle} onClick={() => undefined}>
        //         Adicionar
        //       </Button>
        //     }
        //   >
        //     {/* <Form data={data} onAfterSubmit={() => undefined} /> */}
        //   </ActionDialog>
        // }
      />

      <div className="flex-1">
        <Table />
      </div>
    </div>
  );
}
