import React, { forwardRef } from "react";

import { cn } from "@lib/utils";

type SeverityOptions = "default" | "error";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  severity?: SeverityOptions;
}

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps>(
  (props, ref) => {
    const { children, onClick, severity = "default" } = props;

    const hoverStyle = {
      ["default"]: "hover:bg-slate-200",
      ["error"]: "hover:bg-red-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full p-2 duration-200 hover:scale-110 hover:cursor-pointer",
          hoverStyle[severity],
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
);
