import { PaginationItem } from "@components/ui/pagination";
import { Button } from "@components/Button";

import { cn } from "@lib/utils";

interface PaginationButtonProps {
  children: React.ReactNode;
  isSelected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function PaginationButton(props: PaginationButtonProps) {
  const { children, isSelected, disabled, onClick } = props;
  return (
    <PaginationItem>
      <Button
        size="sm"
        variant="outline"
        onClick={onClick}
        className={cn(
          "text-primary",
          isSelected && "bg-primary text-primary-foreground",
        )}
        disabled={disabled}
      >
        {children}
      </Button>
    </PaginationItem>
  );
}
