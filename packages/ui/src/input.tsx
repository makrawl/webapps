"use client";

import { ReactNode } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: ReactNode;
  onIconClick?: () => void;
  showSubmitButton?: boolean;
}

export const Input = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter text...",
  className = "",
  label,
  icon,
  onIconClick,
  showSubmitButton = false,
}: InputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit && value.trim()) {
      e.preventDefault();
      onSubmit(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark-100)",
          }}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
          style={{
            fontFamily: "var(--font-open-sans)",
            backgroundColor: "var(--makra-background-light)",
            borderColor: "var(--makra-background-light-200)",
            color: "var(--makra-foreground-dark)",
          }}
        />
        {showSubmitButton && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="px-6 py-3 rounded-lg font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            style={{
              fontFamily: "var(--font-open-sans)",
              backgroundColor: "var(--makra-primary-green)",
              color: "var(--makra-foreground-light)",
            }}
          >
            Submit
          </button>
        )}
        {icon && !showSubmitButton && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-3 hover:opacity-70 transition-opacity flex items-center cursor-pointer"
            aria-label="Input action"
          >
            {icon}
          </button>
        )}
      </div>
    </form>
  );
};

