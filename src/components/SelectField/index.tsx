import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

interface SelectFieldOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  placeholder: string;
  options: SelectFieldOption[];
  value?: string;
  onValueChange: (value: string) => void;
}

export function SelectField(props: SelectFieldProps) {
  const { placeholder, options, value, onValueChange } = props;
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((d) => (
          <SelectItem key={d.value} value={d.value}>
            {d.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
