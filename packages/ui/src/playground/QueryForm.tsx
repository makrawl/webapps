"use client";

import { useState } from "react";
import { FiSettings, FiGrid, FiFileText } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { InputGroup } from "../components/ui/input-group";
import { cn } from "../lib/utils";

interface QueryFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onGetCode?: () => void;
  placeholder?: string;
  className?: string;
  segments?: { value: string; label: string; badge?: string }[];
  defaultSegment?: string;
  onSegmentChange?: (value: string) => void;
  showSubmitButton?: boolean;
}

export const QueryForm = ({
  value,
  onChange,
  onSubmit,
  onGetCode,
  placeholder = "example.com",
  className = "",
  segments = [
    { value: "scrape", label: "Scrape" },
    { value: "search", label: "Search" },
    { value: "agent", label: "Agent", badge: "New" },
    { value: "map", label: "Map" },
    { value: "crawl", label: "Crawl" },
  ],
  defaultSegment = "scrape",
  onSegmentChange,
  showSubmitButton = false,
}: QueryFormProps) => {
  const [activeSegment, setActiveSegment] = useState(defaultSegment);

  const handleSegmentChange = (value: string) => {
    setActiveSegment(value);
    onSegmentChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && value.trim()) {
      const url = value.startsWith("http") ? value : `https://${value}`;
      onSubmit(url);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && onSubmit && value.trim()) {
      e.preventDefault();
      const url = value.startsWith("http") ? value : `https://${value}`;
      onSubmit?.(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // Remove https:// prefix for editing
    if (newValue.startsWith("https://")) {
      newValue = newValue.slice(8);
    }
    onChange(newValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full flex flex-col gap-4", className)}
    >
      {/* Segment Tabs */}
      <Tabs value={activeSegment} onValueChange={handleSegmentChange}>
        <TabsList
          className={cn(
            "bg-transparent p-0 h-auto gap-1 w-full justify-start",
            "border-b border-border"
          )}
        >
          {segments.map((segment) => (
            <TabsTrigger
              key={segment.value}
              value={segment.value}
              className={cn(
                "px-4 py-2 rounded-none text-sm font-medium transition-all",
                "border-b-2 border-transparent data-[state=active]:border-primary",
                "data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground",
                "data-[state=inactive]:hover:text-foreground",
                "data-[state=active]:bg-transparent"
              )}
              style={{
                fontFamily: "var(--font-open-sans)",
                borderBottomColor:
                  activeSegment === segment.value
                    ? "var(--makra-primary-green)"
                    : "transparent",
                color:
                  activeSegment === segment.value
                    ? "var(--makra-primary-green)"
                    : "var(--makra-foreground-dark-100)",
              }}
            >
              {segment.label}
              {segment.badge && (
                <span
                  className="ml-2 px-1.5 py-0.5 text-xs rounded"
                  style={{
                    backgroundColor: "var(--makra-background-light-200)",
                    color: "var(--makra-foreground-dark-100)",
                  }}
                >
                  {segment.badge}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* URL Input with InputGroup */}
      <InputGroup
        prefix="https://"
        inputProps={{
          type: "text",
          value: value,
          onChange: handleInputChange,
          onKeyDown: handleKeyDown,
          placeholder: placeholder,
          className: cn(
            "flex-1 pl-20 pr-4 py-3 rounded-lg border transition-all",
            "focus:outline-none focus:ring-2"
          ),
          style: {
            fontFamily: "var(--font-open-sans)",
            backgroundColor: "var(--makra-background-light)",
            borderColor: "var(--makra-background-light-200)",
            color: "var(--makra-foreground-dark)",
          },
        }}
      />

      {/* Controls Row */}
      <div className="flex items-center justify-between">
        {/* Left: Icon buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-lg transition-all hover:opacity-70"
            style={{
              backgroundColor: "var(--makra-background-light-200)",
              color: "var(--makra-foreground-dark-100)",
            }}
            aria-label="Settings"
          >
            <FiSettings size={18} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg transition-all hover:opacity-70"
            style={{
              backgroundColor: "var(--makra-background-light-200)",
              color: "var(--makra-foreground-dark-100)",
            }}
            aria-label="Grid view"
          >
            <FiGrid size={18} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg transition-all hover:opacity-70"
            style={{
              backgroundColor: "var(--makra-background-light-200)",
              color: "var(--makra-foreground-dark-100)",
            }}
            aria-label="Document view"
          >
            <FiFileText size={18} />
          </button>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-3">
          {onGetCode && (
            <button
              type="button"
              onClick={onGetCode}
              className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-80 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-open-sans)",
                backgroundColor: "var(--makra-background-light-200)",
                color: "var(--makra-foreground-dark)",
              }}
            >
              <HiCode size={18} />
              Get code
            </button>
          )}
          {showSubmitButton && (
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 makra-web-btn-green"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "white",
              }}
            >
              Start scraping
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
