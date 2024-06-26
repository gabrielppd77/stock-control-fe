import { useEffect, useState } from "react";

import { TextFieldControlled } from "@components/TextField";
import { IconButton } from "@components/IconButton";

import { Search, X } from "lucide-react";

interface TextFieldSearchProps {
  value: string | null;
  onChange: (value: string) => void;
}

export function TextFieldSearch({ value, onChange }: TextFieldSearchProps) {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (typeof query !== "string") return;
    const timeoutId = setTimeout(() => onChange(query), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <TextFieldControlled
      name="search-field"
      placeholder="Faça a sua pesquisa..."
      value={query || ""}
      onChange={setQuery}
      renderLeft={<Search />}
      renderRight={
        <IconButton onClick={() => setQuery("")}>
          <X className="size-4" />
        </IconButton>
      }
    />
  );
}
