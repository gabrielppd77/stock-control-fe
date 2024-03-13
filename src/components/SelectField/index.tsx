import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Label } from "@radix-ui/react-label";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@components/ui/form";
import { cn } from "@lib/utils";

interface SelectFieldOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: SelectFieldOption[];
}

export function SelectField({ label, name, options }: SelectFieldProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value: _value, onChange } = field;
        const value = _value.toString();
        return (
          <FormItem>
            <FormControl>
              <SelectFieldControlled
                label={label}
                options={options}
                value={value}
                onChange={(changedValue) => onChange(parseInt(changedValue))}
                labelComponent={FormLabel}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

interface SelectFieldControlledProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  labelComponent?: React.ElementType;
}

export function SelectFieldControlled({
  label,
  value,
  onChange,
  options,
  labelComponent: LabelComponent = Label,
}: SelectFieldControlledProps) {
  return (
    <Select value={value.toString()} onValueChange={(value) => onChange(value)}>
      <div className="relative w-full">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <LabelComponent
          className={cn(
            "absolute start-2 z-10 bg-white px-2 text-sm duration-300 group-hover:cursor-pointer group-hover:bg-secondary/80",
            "top-1/2 -translate-y-1/2 scale-100 focus:top-1 focus:-translate-y-4 focus:scale-75 focus:px-2 rtl:focus:left-auto rtl:focus:translate-x-1/4",
            {
              ["start-2 top-2.5 origin-[0] -translate-y-5 scale-75 transform group-hover:bg-transparent"]:
                value,
            },
          )}
        >
          {label}
        </LabelComponent>
      </div>
      <SelectContent>
        {options.map((d) => (
          <SelectItem key={d.value} value={d.value.toString()}>
            {d.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
