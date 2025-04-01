import React from "react";
import { cn } from "../lib/cn";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
};

const Button = ({ className, children, onClick, tooltip }: Props) => {
  return (
    <button
      className={cn(
        "px-[0.5rem] text-md cursor-pointer border-[1.4px] py-[0.15rem] rounded-md border-blue-600 bg-blue-700 hover:bg-blue-600 text-white",
        className
      )}
      onClick={onClick}
      title={tooltip}
    >
      {children}
    </button>
  );
};

export default Button;
