import React, { ReactNode, ElementType } from "react";

import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from "@components/ui/button";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface ButtonProps extends ButtonPropsUI {
  children: ReactNode;
  icon?: ElementType;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { children, icon: Icon, isLoading, disabled, ...rest } = props;

    return (
      <ButtonUI
        className={isLoading ? "group" : ""}
        ref={ref}
        disabled={disabled || isLoading}
        {...rest}
      >
        {Icon && <Icon className="mr-2 h-4 w-4 group-[]:opacity-0" />}
        <div className="group-[]:opacity-0">{children}</div>
        <LoadingSpinner className="absolute opacity-0 group-[]:opacity-100" />
      </ButtonUI>
    );
  },
);

export { Button };
