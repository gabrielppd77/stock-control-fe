import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

interface TextFieldProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange: (value: string) => void;
}

export function TextField(props: TextFieldProps) {
  const { label, name, placeholder, type, value, onChange } = props;
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
