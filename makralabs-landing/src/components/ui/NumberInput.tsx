"use client";

import { cn } from "@/lib/utils";

interface NumberInputProps {
  id?: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  inline?: boolean;
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
  className,
  inputClassName,
  inline = false,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      if (min !== undefined && newValue < min) {
        onChange(min);
      } else if (max !== undefined && newValue > max) {
        onChange(max);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <div
      className={cn(
        inline ? "flex items-center gap-2" : "flex flex-col gap-1",
        className
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-sm whitespace-nowrap"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className={cn(
          "px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 w-20",
          disabled && "opacity-50 cursor-not-allowed",
          inputClassName
        )}
        style={{
          fontFamily: "var(--font-open-sans)",
          backgroundColor: "var(--makra-background-light)",
          borderColor: "var(--makra-background-light-200)",
          color: "var(--makra-foreground-dark)",
        }}
      />
    </div>
  );
}
