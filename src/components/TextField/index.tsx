import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

interface TextFieldProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange: (value: string) => void;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

export function TextField(props: TextFieldProps) {
  const {
    label,
    name,
    placeholder,
    type,
    value,
    onChange,
    renderLeft,
    renderRight,
  } = props;
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        renderLeft={renderLeft}
        renderRight={renderRight}
      />
    </div>
  );
}
