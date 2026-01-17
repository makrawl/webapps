"use client";

import { useState, useEffect } from "react";
import { Checkbox, NumberInput, TextInput } from "@/components/ui";
import { QueryChunksFormState } from "@/types/playground";

interface QueryChunksFormProps {
  onFormChange: (data: Partial<QueryChunksFormState>) => void;
  initialState?: QueryChunksFormState;
}

export function QueryChunksForm({
  onFormChange,
  initialState,
}: QueryChunksFormProps) {
  // Component-level state for rendering
  const [matchingQuery, setMatchingQuery] = useState(
    initialState?.matchingQuery ?? ""
  );
  const [maxChunks, setMaxChunks] = useState(initialState?.maxChunks ?? 10);
  const [queryAllText, setQueryAllText] = useState(
    initialState?.queryAllText ?? false
  );

  // Sync state changes to parent via zustand
  useEffect(() => {
    onFormChange({
      matchingQuery,
      maxChunks,
      queryAllText,
    });
  }, [matchingQuery, maxChunks, queryAllText, onFormChange]);

  return (
    <div className="flex flex-col gap-4">
      {/* Matching Query / Similarity Search */}
      <TextInput
        label="Matching Query / Similarity Search (Optional)"
        value={matchingQuery}
        onChange={setMatchingQuery}
        placeholder="Enter search query..."
        disabled={queryAllText}
      />

      {/* Max Number of Chunks - inline layout */}
      <NumberInput
        label="Max number of chunks queried"
        value={maxChunks}
        onChange={setMaxChunks}
        min={1}
        max={1000}
        inline
        disabled={queryAllText}
      />

      {/* Query All Text checkbox */}
      <Checkbox
        label="Query all text"
        checked={queryAllText}
        onChange={setQueryAllText}
      />

      {queryAllText && (
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark-100)",
          }}
        >
          Pagination and navigation options are disabled when querying all text.
        </p>
      )}
    </div>
  );
}
