"use client";

import { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Checkbox, NumberInput, TextInput } from "@/components/ui";
import { QueryChunksFormState } from "@/types/playground";
import {
  getContainerVariants,
  elementVariants,
  getConditionalVariants,
  getElementTransition,
} from "../animations";

interface QueryChunksFormProps {
  onFormChange: (data: Partial<QueryChunksFormState>) => void;
  initialState?: QueryChunksFormState;
}

function QueryChunksFormComponent({
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

  // Calculate number of visible elements for animation timing
  // When queryAllText is false: Conditional inputs container (1) + Query All Text checkbox (1) = 2 elements
  // When queryAllText is true: Query All Text checkbox (1) + Info message (1) = 2 elements
  // Always 2 elements total
  const elementCount = useMemo(() => {
    return 2; // Always 2: either (inputs container + checkbox) or (checkbox + info message)
  }, []);

  // Animation variants using constants
  const containerVariants = useMemo(
    () => getContainerVariants(elementCount),
    [elementCount]
  );

  // Conditional inputs container has 2 children: TextInput and NumberInput
  const conditionalInputsVariants = useMemo(
    () => getConditionalVariants(2),
    []
  );

  // Info message is a single element
  const infoMessageVariants = useMemo(
    () => getConditionalVariants(1),
    []
  );

  const elementTransition = getElementTransition();

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Conditional inputs - shown when queryAllText is false */}
      <AnimatePresence>
        {!queryAllText && (
          <motion.div
            key="conditional-inputs"
            className="flex flex-col gap-4"
            variants={conditionalInputsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            style={{ overflow: "hidden" }}
          >
            {/* Matching Query / Similarity Search */}
            <motion.div variants={elementVariants} transition={elementTransition}>
              <TextInput
                label="Matching Query / Similarity Search (Optional)"
                value={matchingQuery}
                onChange={setMatchingQuery}
                placeholder="Enter search query..."
                disabled={queryAllText}
              />
            </motion.div>

            {/* Max Number of Chunks - inline layout */}
            <motion.div variants={elementVariants} transition={elementTransition}>
              <NumberInput
                label="Max number of chunks queried"
                value={maxChunks}
                onChange={setMaxChunks}
                min={1}
                max={1000}
                inline
                disabled={queryAllText}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Query All Text checkbox */}
      <motion.div variants={elementVariants} transition={elementTransition} layout>
        <Checkbox
          label="Query all text"
          checked={queryAllText}
          onChange={setQueryAllText}
        />
      </motion.div>

      {/* Info message when queryAllText is enabled */}
      <AnimatePresence>
        {queryAllText && (
          <motion.p
            key="query-all-text-info"
            className="text-sm"
            variants={infoMessageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-100)",
            }}
            layout
          >
            Pagination and navigation options are disabled when querying all text.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const QueryChunksForm = memo(QueryChunksFormComponent);
