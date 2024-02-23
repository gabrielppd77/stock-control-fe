import React, { ReactNode, ElementType } from "react";

import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from "@components/ui/button";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { cn } from "@lib/utils";

interface ButtonProps extends ButtonPropsUI {
  children: ReactNode;
  icon?: ElementType;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      children,
      icon: Icon,
      isLoading,
      disabled,
      fullWidth,
      ...rest
    } = props;

    return (
      <ButtonUI
        className={cn("transition duration-200 hover:scale-105", {
          ["group"]: isLoading,
          ["w-full"]: fullWidth,
        })}
        disabled={disabled || isLoading}
        ref={ref}
        {...rest}
      >
        {Icon && <Icon className="mr-2 h-4 w-4 group-[]:opacity-0" />}
        <div className="group-[]:opacity-0">{children}</div>
        {isLoading && <LoadingSpinner className="absolute" />}
      </ButtonUI>
    );
  },
);

export { Button };
