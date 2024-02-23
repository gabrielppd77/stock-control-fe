import { Input } from "@components/ui/input";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@components/ui/form";

interface TextFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
}

export function TextField(props: TextFieldProps) {
  const { label, name, placeholder = " " } = props;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                className="peer"
              />
              <FormLabel className="absolute start-2 top-3 z-10 origin-[0] -translate-y-5 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary dark:text-slate-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4">
                {label}
              </FormLabel>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
