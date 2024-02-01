import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

interface TextFieldProps {
  label: string;
  name?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function TextField(props: TextFieldProps) {
  const { label, name, placeholder, type } = props;
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} id={name} placeholder={placeholder} />
    </div>
  );
}
