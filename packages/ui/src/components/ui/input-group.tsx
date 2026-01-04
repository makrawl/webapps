"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Input } from "./input";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, prefix, suffix, inputProps, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex items-center w-full", className)}
        {...props}
      >
        {prefix && (
          <span
            className="absolute left-4 text-sm pointer-events-none select-none z-10"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-100)",
            }}
          >
            {prefix}
          </span>
        )}
        {children || (
          <Input
            {...inputProps}
            className={cn(
              prefix && "pl-20",
              suffix && "pr-12",
              inputProps?.className
            )}
          />
        )}
        {suffix && (
          <span className="absolute right-3 text-sm text-muted-foreground pointer-events-none select-none z-10">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };

