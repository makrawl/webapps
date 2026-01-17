"use client";

import { cn } from "@/lib/utils";

interface TextAreaProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  textareaClassName?: string;
  rows?: number;
  helperLink?: {
    text: string;
    href: string;
  };
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  textareaClassName,
  rows = 6,
  helperLink,
}: TextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
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
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={cn(
          "px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 resize-none",
          disabled && "opacity-50 cursor-not-allowed",
          textareaClassName
        )}
        style={{
          fontFamily: "var(--font-open-sans)",
          backgroundColor: "var(--makra-background-light)",
          borderColor: "var(--makra-background-light-200)",
          color: "var(--makra-foreground-dark)",
        }}
      />
      {helperLink && (
        <a
          href={helperLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-primary-green)",
          }}
        >
          {helperLink.text}
        </a>
      )}
    </div>
  );
}
