import { useEffect, useState } from "react";

import { TextField } from "@components/TextField";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import { Search, X } from "lucide-react";
import { Button } from "@components/Button";

interface SearchFieldProps {
  onChange: (value?: string) => void;
}

export function SearchField(props: SearchFieldProps) {
  const { onChange } = props;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => onChange(query || undefined), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
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
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
