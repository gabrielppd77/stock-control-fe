import { ReactNode, ElementType } from "react";

import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from "@components/ui/button";

interface ButtonProps extends ButtonPropsUI {
  children: ReactNode;
  icon: ElementType;
}

export function Button(props: ButtonProps) {
  const { children, icon: Icon, ...rest } = props;

  return (
    <ButtonUI {...rest}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </ButtonUI>
  );
}
