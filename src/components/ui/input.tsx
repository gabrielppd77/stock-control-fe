import * as React from "react";

import { cn } from "@lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, renderLeft, renderRight, ...props }, ref) => {
    return (
      <div className="relative">
        <label className="absolute inset-y-0 start-0 flex items-center ps-2.5">
          {renderLeft}
        </label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            renderLeft && "pe-10 ps-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-2.5">
          {renderRight}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
