import { forwardRef } from "react";
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

interface TextFieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelComponent: React.ElementType;
  placeholder?: string;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  (props, ref) => {
    const {
      label,
      labelComponent: LabelComponent,
      placeholder = " ",
      renderLeft,
      renderRight,
      ...rest
    } = props;

    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-2.5">
          {renderLeft}
        </div>
        <div className="relative">
          <Input
            ref={ref}
            placeholder={placeholder}
            className={cn("peer", { ["pe-10 ps-10"]: renderLeft })}
            {...rest}
          />
          <LabelComponent className="absolute start-2 top-3 z-10 origin-[0] -translate-y-5 scale-75 transform bg-white px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
            {label}
          </LabelComponent>
        </div>
        <div className="absolute inset-y-0 end-0 z-10 flex items-center pe-2.5">
          {renderRight}
        </div>
      </div>
    );
  },
);

interface TextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

export function TextField(props: TextFieldProps) {
  const { label, name, placeholder, value, onChange, renderLeft, renderRight } =
    props;

  const isControlled =
    typeof value !== "undefined" && typeof onChange !== "undefined";

  if (isControlled) {
    return (
      <TextFieldInput
        value={value}
        onChange={onChange}
        label={label}
        name={name}
        placeholder={placeholder}
        labelComponent={Label}
        renderLeft={renderLeft}
        renderRight={renderRight}
      />
    );
  }

  return (
    <FormField
      name={name}
      render={({ field }) => {
        const { value, onChange, ...rest } = field;

        return (
          <FormItem>
            <FormControl>
              <TextFieldInput
                label={label}
                placeholder={placeholder}
                labelComponent={FormLabel}
                renderLeft={renderLeft}
                renderRight={renderRight}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
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
