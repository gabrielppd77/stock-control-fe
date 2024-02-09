import { useEffect, useState } from "react";

import { TextField } from "@components/TextField";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

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
        placeholder="Faça a sua busca..."
        value={query}
        onChange={setQuery}
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
