import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@components/Button";

interface ActionDialogProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  trigger: ReactNode;
  children: ReactNode;
  onSubmit: () => void;
}

export function ActionDialog(props: ActionDialogProps) {
  const { title, description, isLoading, trigger, children, onSubmit } = props;

  const [open, setOpen] = useState(false);

  async function handelSubmit() {
    await onSubmit();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={handelSubmit} isLoading={isLoading}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
