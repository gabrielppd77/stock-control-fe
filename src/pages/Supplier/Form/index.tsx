import { useState, useEffect } from "react";

import { TextField } from "@components/TextField";
import { ActionForm } from "@components/ActionForm";

import { useSupplierMutate } from "@entities/supplier/useSupplier";

interface DataForm {
  id: string;
  name: string;
}

interface FormProps {
  close: () => void;
  data: DataForm | null;
}

export function Form(props: FormProps) {
  const { close, data: _data } = props;
  const [data, setData] = useState<Partial<DataForm>>({});

  const {
    mutateAsyncCreate,
    isLoadingCreate,
    mutateAsyncUpdate,
    isLoadingUpdate,
  } = useSupplierMutate();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  useEffect(() => {
    if (_data) {
      setData(_data);
    }
  }, [_data]);

  async function handleSubmit() {
    if (data.id) {
      await mutateAsyncUpdate(data as DataForm);
    } else {
      await mutateAsyncCreate(data as DataForm);
    }
    close();
  }

  return (
    <ActionForm onSubmit={handleSubmit} onCancel={close} isLoading={isLoading}>
      <TextField
        label="Nome"
        onChange={(value) => setData((prev) => ({ ...prev, name: value }))}
        value={data.name || ""}
      />
    </ActionForm>
  );
}
