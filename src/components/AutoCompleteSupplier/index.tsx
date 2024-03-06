import { AutoComplete, AutoCompleteData } from "@components/AutoComplete";

import { useSupplierQuerySearch } from "@entities/supplier/useSupplier";
import { useEffect, useState } from "react";

export function AutoCompleteSupplier() {
  const [search, setSearch] = useState("");

  const {
    data: _d,
    isLoading,
    isFetching,
    refetch,
  } = useSupplierQuerySearch({ field: "name", search });

  useEffect(() => {
    if (search) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const data: AutoCompleteData[] = _d
    ? _d.map((d) => ({ label: d.name, value: d.id }))
    : [];

  return (
    <AutoComplete
      label="Fornecedor"
      name="supplierId"
      data={data}
      isLoading={isLoading}
      isFetching={isFetching}
      onSearch={setSearch}
    />
  );
}
