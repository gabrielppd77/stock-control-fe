import React, { forwardRef } from "react";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps>(
  (props, ref) => {
    const { children, onClick } = props;

    return (
      <div
        ref={ref}
        className="rounded-full p-2 duration-200 hover:scale-110 hover:cursor-pointer hover:bg-slate-200"
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
);
