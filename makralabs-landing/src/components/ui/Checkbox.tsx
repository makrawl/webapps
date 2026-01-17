"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className,
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="w-4 h-4 rounded border cursor-pointer accent-[var(--makra-primary-green)] focus:ring-2 focus:ring-[var(--makra-primary-green)] focus:ring-offset-1"
        style={{
          borderColor: "var(--makra-background-light-200)",
        }}
      />
      <span
        className="text-sm"
        style={{
          fontFamily: "var(--font-open-sans)",
          color: "var(--makra-foreground-dark)",
        }}
      >
        {label}
      </span>
    </label>
  );
}
