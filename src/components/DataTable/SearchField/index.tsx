import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

import { TextField } from "@components/TextField";
import { Button } from "@components/Button";
import { SelectField } from "@components/SelectField";

import { useTableStore } from "../TableStore";

export interface SearchOption<TData> {
  label: string;
  value: keyof TData extends string ? keyof TData : never;
}
interface SearchFieldProps<TData> {
  searchOptions: SearchOption<TData>[];
}

export function SearchField<TData>(props: SearchFieldProps<TData>) {
  const { searchOptions } = props;

  const { paginationParams, paginationsChange } = useTableStore();
  const { field } = paginationParams;
  const { changeSearch, changeField } = paginationsChange;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => changeSearch(query), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    changeField(searchOptions[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOptions]);

  return (
    <div className="flex gap-2">
      <TextField
        placeholder="Faça a sua pesquisa..."
        value={query}
        onChange={setQuery}
        renderLeft={<Search />}
        renderRight={
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        }
      />
      <SelectField
        options={searchOptions}
        placeholder="Escolha uma coluna para pesquisar"
        value={field}
        onValueChange={(value) => changeField(value)}
      />
    </div>
  );
}
