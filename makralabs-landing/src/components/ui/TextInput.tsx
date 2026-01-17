"use client";

import { cn } from "@/lib/utils";

interface TextInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  prefix,
  disabled = false,
  className,
  inputClassName,
  onKeyDown,
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // If there's a prefix and user pastes value with prefix, remove it
    if (prefix && newValue.startsWith(prefix)) {
      newValue = newValue.slice(prefix.length);
    }
    onChange(newValue);
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
      <div className="relative flex items-center w-full">
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
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2",
            prefix ? "pl-20" : "pl-4",
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
    </div>
  );
}
