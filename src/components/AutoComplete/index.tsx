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
} from "@components/ui/form";

interface AutoCompleteData {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  label: string;
  name: string;
  data: AutoCompleteData[];
}

export function AutoComplete({ label, name, data }: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <FormItem>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value ? data.find((d) => d.value === value)?.label : label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput className="h-9" />
                    <CommandEmpty>Sem resultados.</CommandEmpty>
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
