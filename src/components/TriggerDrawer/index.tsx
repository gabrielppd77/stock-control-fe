import { useState, ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TriggerDrawerProps {
  title: string;
  children: ({ close }: { close: () => void }) => JSX.Element;
  trigger: ReactNode;
}

export function TriggerDrawer({
  title,
  children,
  trigger,
}: TriggerDrawerProps) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        className="flex max-h-screen flex-col gap-2 p-5"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="text-xl">{title}</SheetTitle>
        </SheetHeader>
        <div className="h-full overflow-y-auto p-1.5">
          {children({ close })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
