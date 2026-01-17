"use client";

import { useState, useCallback, memo } from "react";
import { FiSettings, FiGrid, FiFileText } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { TextInput } from "@/components/ui";
import { ExtractDataForm, QueryChunksForm, PageMapForm } from "./forms";
import { usePlaygroundStore } from "@/stores/playground";
import { OperationType } from "@/types/playground";

interface QueryFormProps {
  onSubmit?: () => void;
  onGetCode?: () => void;
  placeholder?: string;
  className?: string;
  showSubmitButton?: boolean;
}

// Segment definitions
const SEGMENTS: { value: OperationType; label: string }[] = [
  { value: "data", label: "Extract Data" },
  { value: "chunks", label: "Query Chunks" },
  { value: "map", label: "Page-Map" },
];

// Tabs implementation
const SegmentedTabs = memo(function SegmentedTabs({
  value,
  segments,
  onTabChange,
}: {
  value: OperationType;
  segments: { value: OperationType; label: string }[];
  onTabChange: (value: OperationType) => void;
}) {
  return (
    <div
      className={cn(
        "bg-transparent p-0 h-auto gap-1 w-full justify-start border-b border-border flex"
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
      {segments.map((segment) => {
        const isActive = value === segment.value;
        return (
          <button
            key={segment.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`segment-tabpanel-${segment.value}`}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              "px-4 py-2 rounded-none text-sm font-medium transition-all border-b-2 border-transparent",
              isActive
                ? "border-primary data-[state=active]:border-primary data-[state=active]:text-primary"
                : "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground",
              "focus:outline-none"
            )}
            style={{
              fontFamily: "var(--font-open-sans)",
              borderBottomColor: isActive
                ? "var(--makra-primary-green)"
                : "transparent",
              color: isActive
                ? "var(--makra-primary-green)"
                : "var(--makra-foreground-dark-100)",
              background: "transparent",
            }}
            onClick={() => onTabChange(segment.value)}
          >
            {segment.label}
          </button>
        );
      })}
    </div>
  );
});

function QueryFormComponent({
  onSubmit,
  onGetCode,
  placeholder = "example.com",
  className = "",
  showSubmitButton = false,
}: QueryFormProps) {
  // Get state and actions from Zustand store
  const {
    url,
    setUrl,
    operationType,
    setOperationType,
    extractData,
    setExtractData,
    queryChunks,
    setQueryChunks,
    submitForm,
  } = usePlaygroundStore();

  // Component-level state for active segment (for rendering)
  const [activeSegment, setActiveSegment] = useState<OperationType>(operationType);

  const handleSegmentChange = (value: OperationType) => {
    setActiveSegment(value);
    setOperationType(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      const formData = submitForm();
      console.log("Form submitted:", formData);
      onSubmit?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url.trim()) {
      e.preventDefault();
      const formData = submitForm();
      console.log("Form submitted:", formData);
      onSubmit?.();
    }
  };

  // Memoize callbacks to prevent unnecessary re-renders
  const handleExtractDataChange = useCallback(
    (data: Parameters<typeof setExtractData>[0]) => {
      setExtractData(data);
    },
    [setExtractData]
  );

  const handleQueryChunksChange = useCallback(
    (data: Parameters<typeof setQueryChunks>[0]) => {
      setQueryChunks(data);
    },
    [setQueryChunks]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full flex flex-col gap-4", className)}
    >
      {/* Segment Tabs */}
      <SegmentedTabs
        value={activeSegment}
        segments={SEGMENTS}
        onTabChange={handleSegmentChange}
      />

      {/* URL Input - Common across all modes */}
      <div>
        <TextInput
          value={url}
          onChange={setUrl}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          prefix="https://"
        />
      </div>

      {/* Operation-specific forms */}
      <div className="py-2">
        {activeSegment === "data" && (
          <ExtractDataForm
            onFormChange={handleExtractDataChange}
            initialState={extractData}
          />
        )}
        {activeSegment === "chunks" && (
          <QueryChunksForm
            onFormChange={handleQueryChunksChange}
            initialState={queryChunks}
          />
        )}
        {activeSegment === "map" && <PageMapForm />}
      </div>

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
              disabled={!url.trim()}
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
}

export const QueryForm = memo(QueryFormComponent);
