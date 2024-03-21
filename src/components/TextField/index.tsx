import { cn } from "@lib/utils";

import { Input } from "@components/ui/input";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";
import { Label } from "@radix-ui/react-label";
import { forwardRef } from "react";

interface TextFieldProps {
  label?: string;
  name: string;
}

export function TextField(props: TextFieldProps) {
  const { label, name } = props;
  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value, onChange, ...rest } = field;
        return (
          <FormItem>
            <FormControl>
              <TextFieldControlled
                label={label}
                labelComponent={FormLabel}
                value={value || ""}
                onChange={onChange}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

interface TextFieldControlledProps {
  name: string;
  label?: string;
  labelComponent?: React.ElementType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

export const TextFieldControlled = forwardRef<
  HTMLInputElement,
  TextFieldControlledProps
>((props, ref) => {
  const {
    name,
    label,
    labelComponent: LabelComponent = Label,
    placeholder = " ",
    value,
    onChange,
    renderLeft,
    renderRight,
  } = props;

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-2.5">
        {renderLeft}
      </div>
      <div className="relative">
        <Input
          id={name}
          ref={ref}
          placeholder={placeholder}
          className={cn("peer", { ["pe-10 ps-10"]: renderLeft })}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <LabelComponent
          htmlFor={name}
          className="absolute start-2 top-3 z-10 origin-[0] -translate-y-5 scale-75 transform bg-white px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {label}
        </LabelComponent>
      </div>
      <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-2.5">
        {renderRight}
      </div>
    </div>
  );
});
