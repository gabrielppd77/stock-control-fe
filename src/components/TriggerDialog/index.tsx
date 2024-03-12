import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TriggerDialogProps {
  title: string;
  children: (close: () => void) => JSX.Element;
  trigger: ReactNode;
}

export function TriggerDialog(props: TriggerDialogProps) {
  const { title, children, trigger } = props;

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="flex max-h-screen flex-col gap-2 p-5"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto p-1.5">{children(close)}</div>
      </DialogContent>
    </Dialog>
  );
}
