import { Minus, Plus } from "lucide-react";

import { Input } from "@components/ui/input";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@components/ui/form";
import { Button } from "@components/Button";

interface SelectNumberFieldProps {
  label: string;
  name: string;
}

export function SelectNumberField({ label, name }: SelectNumberFieldProps) {
  function convertInt(value: string) {
    const valueTryParsed = parseInt(value);
    return isNaN(valueTryParsed) ? 0 : valueTryParsed;
  }
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { name, value: _value, onChange, ...rest } = field;
        const value = convertInt(_value);
        return (
          <FormItem>
            <FormControl>
              <div className="space-y-2">
                <FormLabel htmlFor="quantity-input">{label}</FormLabel>
                <div className="flex w-full items-center">
                  <Button
                    id="decrement-button"
                    onClick={() => onChange(value - 1)}
                  >
                    <Minus />
                  </Button>
                  <Input
                    name={name}
                    id="quantity-input"
                    className="text-center"
                    value={value}
                    onChange={(e) => onChange(convertInt(e.target.value))}
                    {...rest}
                  />
                  <Button
                    id="increment-button"
                    onClick={() => onChange(value + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
