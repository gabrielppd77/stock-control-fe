import { useEffect, useState } from "react";

import { TextFieldControlled } from "@components/TextField";
import { IconButton } from "@components/IconButton";

import { Search, X } from "lucide-react";

interface TextFieldSearchProps {
  onChange: (value: string) => void;
}

export function TextFieldSearch({ onChange }: TextFieldSearchProps) {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (typeof query !== "string") return;
    const timeoutId = setTimeout(() => onChange(query), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
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
  );
}
