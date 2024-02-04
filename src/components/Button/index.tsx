import { ReactNode, ElementType } from "react";

import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from "@components/ui/button";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface ButtonProps extends ButtonPropsUI {
  children: ReactNode;
  icon?: ElementType;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const { children, icon: Icon, isLoading, ...rest } = props;

  return (
    <ButtonUI {...rest}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <div className={isLoading ? "text-transparent" : ""}>{children}</div>
      {isLoading && <LoadingSpinner className="absolute" />}
    </ButtonUI>
  );
}
