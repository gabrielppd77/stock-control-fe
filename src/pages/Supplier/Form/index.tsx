import { TextField } from "@components/TextField";

interface FormData {
  name: string;
}

interface FormProps {
  data: FormData | null;
  onAfterSubmit: () => void;
}

export function Form(props: FormProps) {
  return (
    <div>
      <TextField label="Nome" />
    </div>
  );
}
