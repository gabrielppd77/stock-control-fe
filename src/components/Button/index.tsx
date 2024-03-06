import React, { ReactNode, ElementType } from "react";

import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from "@components/ui/button";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            restDelta: 0.001,
          },
        }}
        whileHover={{ scale: 1.05 }}
        className={cn({ ["w-full"]: fullWidth })}
      >
        <ButtonUI
          className={cn({
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
      </motion.div>
    );
  },
);

export { Button };
