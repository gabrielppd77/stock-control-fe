import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TriggerDialogProps {
  title: string;
  description?: string;
  children: (close: () => void) => JSX.Element;
  trigger: ReactNode;
}

export function TriggerDialog(props: TriggerDialogProps) {
  const { title, description, children, trigger } = props;

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="gap-3"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children(close)}
      </DialogContent>
    </Dialog>
  );
}
