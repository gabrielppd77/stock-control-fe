import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function IconButton(props: IconButtonProps) {
  const { children, onClick } = props;

  return (
    <div
      className="rounded-full p-2 duration-200 hover:scale-110 hover:cursor-pointer hover:bg-slate-200"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
