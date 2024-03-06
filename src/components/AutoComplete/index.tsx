import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ChevronsUpDown, Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@components/ui/form";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { useFormContext } from "react-hook-form";

export interface AutoCompleteData {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  label: string;
  name: string;
  data: AutoCompleteData[];
  isLoading?: boolean;
  onSearch: (search: string, event: "search" | "start") => void;
}

export function AutoComplete({
  label,
  name,
  data,
  isLoading,
  onSearch,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof search !== "string") return;
    const timeoutId = setTimeout(() => onSearch(search, "search"), 300);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const { formState } = useFormContext();
  const defaultValues = formState.defaultValues;

  React.useEffect(() => {
    if (defaultValues && defaultValues[name]) {
      onSearch(defaultValues[name], "start");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <FormItem>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="group" asChild>
                  <div className="relative">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between group-hover:bg-secondary/80"
                    >
                      {value ? (
                        data.find((d) => d.value === value)?.label || <div />
                      ) : (
                        <div />
                      )}
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      )}
                    </Button>
                    <FormLabel
                      className={cn(
                        "absolute start-2 z-10 bg-white px-2 text-sm duration-300 group-hover:cursor-pointer group-hover:bg-secondary/80",
                        "top-1/2 -translate-y-1/2 scale-100 focus:top-1 focus:-translate-y-4 focus:scale-75 focus:px-2 rtl:focus:left-auto rtl:focus:translate-x-1/4",
                        {
                          ["top-2.5  origin-[0] -translate-y-5 scale-75 transform group-hover:bg-transparent"]:
                            value,
                        },
                      )}
                    >
                      {label}
                    </FormLabel>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="popover-content-width-same-as-its-trigger p-1">
                  <Command shouldFilter={false}>
                    <CommandInput
                      className="h-9"
                      onValueChange={(searchQuery) => {
                        setSearch(searchQuery);
                        onChange("");
                      }}
                    />
                    <CommandEmpty>Sem resultados</CommandEmpty>
                    <CommandGroup>
                      {data.map((d) => (
                        <CommandItem
                          key={d.value}
                          value={d.value}
                          onSelect={(currentValue) => {
                            onChange(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          {d.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === d.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
