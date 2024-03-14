import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@components/ui/form";
import { Label } from "@components/ui/label";

interface DatePickerProps {
  label: string;
  name: string;
}

export function DatePicker({ name, label }: DatePickerProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <FormItem>
            <FormControl>
              <DatePickerControlled
                label={label}
                onChange={onChange}
                value={value}
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

interface DatePickerControlledProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  labelComponent?: React.ElementType;
}

export function DatePickerControlled({
  label,
  value,
  onChange,
  labelComponent: LabelComponent = Label,
}: DatePickerControlledProps) {
  return (
    <Popover>
      <PopoverTrigger className="group" asChild>
        <div className="relative">
          <Button
            variant={"outline"}
            className={cn(
              "w-full group-hover:bg-secondary/80",
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "dd/MM/yyyy") : <div />}
          </Button>

          <LabelComponent
            className={cn(
              "absolute start-9 z-10 bg-white px-2 text-sm duration-300 group-hover:cursor-pointer group-hover:bg-secondary/80",
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
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(date) => onChange(date?.toISOString() || "")}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
