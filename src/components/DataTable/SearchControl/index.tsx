import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { TextFieldControlled } from "@components/TextField";
import { SelectFieldControlled } from "@components/SelectField";

import { useTableSearchParams } from "../../../hooks/useTableSearchParams";
import { IconButton } from "@components/IconButton";

export interface SearchOption<TData> {
  label: string;
  value: keyof TData extends string ? keyof TData : never;
}
interface SearchControlProps<TData> {
  searchOptions: SearchOption<TData>[];
}

export function SearchControl<TData>(props: SearchControlProps<TData>) {
  const { searchOptions } = props;

  const { changes } = useTableSearchParams();

  const { changeSearch } = changes;

  const [query, setQuery] = useState<string | null>(null);
  const [field, setField] = useState<string | null>(null);

  useEffect(() => {
    if (typeof query !== "string") return;
    if (typeof field !== "string") return;
    const timeoutId = setTimeout(() => changeSearch(query, field), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, field]);

  useEffect(() => {
    setField(searchOptions[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2">
      <TextFieldControlled
        placeholder="Faça a sua pesquisa..."
        value={query || ""}
        onChange={setQuery}
        renderLeft={<Search />}
        renderRight={
          <IconButton onClick={() => setQuery("")}>
            <X className="h-4 w-4" />
          </IconButton>
        }
      />
      <SelectFieldControlled
        options={searchOptions}
        value={field || ""}
        onChange={(value) => setField(value)}
      />
    </div>
  );
}
