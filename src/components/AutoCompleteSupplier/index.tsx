import { useState } from "react";

import { AutoComplete, AutoCompleteData } from "@components/AutoComplete";
import { listSearch } from "@entities/supplier/requests/list-search";
import { extractError } from "@lib/alert";

interface AutoCompleteSupplierProps {
  name: string;
  label: string;
}

export function AutoCompleteSupplier({
  name,
  label,
}: AutoCompleteSupplierProps) {
  const [data, setData] = useState<AutoCompleteData[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function onSearch(search: string, event: "search" | "start") {
    setLoading(true);
    try {
      const data = await listSearch({
        params: {
          field: event === "search" ? "name" : "id",
          search,
        },
      });
      setData(data.map((d) => ({ label: d.name, value: d.id })));
    } catch (err) {
      extractError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AutoComplete
      label={label}
      name={name}
      data={data}
      isLoading={isLoading}
      onSearch={onSearch}
    />
  );
}
