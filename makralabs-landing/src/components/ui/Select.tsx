"use client";

import { cn } from "@/lib/utils";

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  id?: string;
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  className?: string;
}

export function Select<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  className,
}: SelectProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark)",
          }}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          "px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          fontFamily: "var(--font-open-sans)",
          backgroundColor: "var(--makra-background-light)",
          borderColor: "var(--makra-background-light-200)",
          color: "var(--makra-foreground-dark)",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
