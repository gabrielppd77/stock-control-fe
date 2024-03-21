import * as React from "react";

import { format, isValid, parse } from "date-fns";
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

import { Input as InputShad, InputProps } from "@components/ui/input";
import { SelectSingleEventHandler } from "react-day-picker";

import InputMask from "@mona-health/react-input-mask";

function Input(props: InputProps) {
  return (
    <InputMask mask="99/99/9999" maskPlaceholder="DD/MM/YYYY" {...props}>
      <InputShad />
    </InputMask>
  );
}

interface DatePickerProps {
  label: string;
  name: string;
}

export function DatePicker({ name, label }: DatePickerProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value: date, onChange } = field;
        return (
          <FormItem>
            <FormControl>
              <DatePickerMain
                name={name}
                label={label}
                value={date}
                onChange={onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

interface DatePickerMainProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  name: string;
  label: string;
}

function DatePickerMain({ name, label, value, onChange }: DatePickerMainProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const date = value ? new Date(value) : undefined;

  React.useEffect(() => {
    if (value) {
      setInputValue(format(value, "dd/MM/yyyy"));
    }
  }, [value]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "dd/MM/yyyy", new Date());
    if (isValid(date)) {
      onChange(date?.toISOString() || "");
    } else {
      onChange(undefined);
    }
  };

  const handleSelectDate: SelectSingleEventHandler = (selected) => {
    onChange(selected?.toISOString() || "");
    if (selected) {
      setOpen(false);
      setInputValue(format(selected, "dd/MM/yyyy"));
    } else {
      setInputValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <fieldset className="relative">
        <Input value={inputValue} onChange={handleInputChange} id={name} />
        <PopoverTrigger asChild>
          <Button
            aria-label="Pick a date"
            variant={"secondary"}
            className={cn(
              "absolute right-1.5 top-1/2 h-7 -translate-y-1/2 rounded-sm border px-2 font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <FormLabel
          className={cn(
            "absolute start-2 z-10 bg-white px-2 text-sm duration-300 group-hover:cursor-pointer group-hover:bg-secondary/80",
            "top-1/2 -translate-y-1/2 scale-100 focus:top-1 focus:-translate-y-4 focus:scale-75 focus:px-2 rtl:focus:left-auto rtl:focus:translate-x-1/4",
            {
              ["start-2 top-2.5 origin-[0] -translate-y-5 scale-75 transform group-hover:bg-transparent"]:
                inputValue,
            },
          )}
          htmlFor={name}
        >
          {label}
        </FormLabel>
      </fieldset>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
