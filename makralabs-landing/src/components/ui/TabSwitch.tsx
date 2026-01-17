"use client";

import { cn } from "@/lib/utils";

interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface TabSwitchProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: TabOption<T>[];
  disabled?: boolean;
  className?: string;
}

export function TabSwitch<T extends string>({
  value,
  onChange,
  options,
  disabled = false,
  className,
}: TabSwitchProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg p-1",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      style={{
        backgroundColor: "var(--makra-background-light-200)",
      }}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              isActive ? "shadow-sm" : "hover:opacity-80"
            )}
            style={{
              fontFamily: "var(--font-open-sans)",
              backgroundColor: isActive
                ? "var(--makra-background-light)"
                : "transparent",
              color: isActive
                ? "var(--makra-primary-green)"
                : "var(--makra-foreground-dark-100)",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
