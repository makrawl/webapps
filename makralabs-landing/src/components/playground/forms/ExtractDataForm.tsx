"use client";

import { useState, useEffect, memo, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Checkbox,
  Select,
  TabSwitch,
  TextArea,
  CodeMirrorEditor,
} from "@/components/ui";
import {
  SchemaInputMode,
  ModelType,
  MODEL_OPTIONS,
  ExtractDataFormState,
} from "@/types/playground";
import {
  elementVariants,
  getElementTransition,
  getElementExitTransition,
  TOTAL_TRANSITION_TIME,
} from "../animations";
import {
  VisibilityState,
  calculateAverageTimePerElement,
  updateVisibilityWithStagger,
  createInitialVisibilityState,
} from "../visibilityManager";

interface ExtractDataFormProps {
  onFormChange: (data: Partial<ExtractDataFormState>) => void;
  initialState?: ExtractDataFormState;
}

const SCHEMA_INPUT_OPTIONS: { value: SchemaInputMode; label: string }[] = [
  { value: "schema", label: "Schema" },
  { value: "prompt", label: "Prompt" },
];

function ExtractDataFormComponent({
  onFormChange,
  initialState,
}: ExtractDataFormProps) {
  // Component-level state for rendering
  const [autoSchema, setAutoSchema] = useState(initialState?.autoSchema ?? true);
  const [schemaInputMode, setSchemaInputMode] = useState<SchemaInputMode>(
    initialState?.schemaInputMode ?? "schema"
  );
  const [schema, setSchema] = useState(initialState?.schema ?? "");
  const [prompt, setPrompt] = useState(initialState?.prompt ?? "");
  const [enablePagination, setEnablePagination] = useState(
    initialState?.enablePagination ?? false
  );
  const [enableNavigation, setEnableNavigation] = useState(
    initialState?.enableNavigation ?? false
  );
  const [selectedModel, setSelectedModel] = useState<ModelType>(
    initialState?.selectedModel ?? "gpt-4o"
  );

  // Visibility state for all form elements
  const elementKeys = useMemo(() => [
    "schema_auto",
    "schema_selector",
    "schema_code",
    "schema_prompt",
    "pagination_nav",
    "model_selection",
  ], []);

  const [visibilityState, setVisibilityState] = useState<VisibilityState>(() => {
    // Always visible: schema_auto, pagination_nav, model_selection
    // Conditionally visible: schema_selector, schema_code, schema_prompt
    return {
      schema_auto: true,
      schema_selector: !autoSchema,
      schema_code: !autoSchema && schemaInputMode === "schema",
      schema_prompt: !autoSchema && schemaInputMode === "prompt",
      pagination_nav: true,
      model_selection: true,
    };
  });

  const cleanupRef = useRef<(() => void) | null>(null);

  // Sync state changes to parent via zustand
  useEffect(() => {
    onFormChange({
      autoSchema,
      schemaInputMode,
      schema,
      prompt,
      enablePagination,
      enableNavigation,
      selectedModel,
    });
  }, [
    autoSchema,
    schemaInputMode,
    schema,
    prompt,
    enablePagination,
    enableNavigation,
    selectedModel,
    onFormChange,
  ]);

  // Update visibility state when autoSchema changes
  useEffect(() => {
    // Cleanup previous animations
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const keysToUpdate: string[] = [];
    let targetVisibility = false;

    if (autoSchema) {
      // Hiding schema inputs - forward order (top to bottom)
      if (schemaInputMode === "schema") {
        keysToUpdate.push("schema_code", "schema_selector");
      } else {
        keysToUpdate.push("schema_prompt", "schema_selector");
      }
      targetVisibility = false;
    } else {
      // Showing schema inputs - forward order (top to bottom): selector first, then code/prompt
      keysToUpdate.push("schema_selector");
      if (schemaInputMode === "schema") {
        keysToUpdate.push("schema_code");
      } else {
        keysToUpdate.push("schema_prompt");
      }
      targetVisibility = true;
    }

    if (keysToUpdate.length > 0) {
      cleanupRef.current = updateVisibilityWithStagger(
        keysToUpdate,
        targetVisibility,
        (key, visible) => {
          setVisibilityState(prev => ({ ...prev, [key]: visible }));
        }
      );
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [autoSchema, schemaInputMode]);

  // Update visibility when schemaInputMode changes (only if autoSchema is false)
  useEffect(() => {
    if (!autoSchema) {
      // Cleanup previous animations
      if (cleanupRef.current) {
        cleanupRef.current();
      }

      const hideKey = schemaInputMode === "schema" ? "schema_prompt" : "schema_code";
      const showKey = schemaInputMode === "schema" ? "schema_code" : "schema_prompt";

      // First hide the one that's not selected, then show the selected one
      cleanupRef.current = updateVisibilityWithStagger(
        [hideKey],
        false,
        (key, visible) => {
          setVisibilityState(prev => ({ ...prev, [key]: visible }));
        },
        () => {
          // After hiding, show the selected one
          setVisibilityState(prev => ({ ...prev, [showKey]: true }));
        }
      );
    }
  }, [schemaInputMode, autoSchema]);

  const elementTransition = getElementTransition();
  const elementExitTransition = getElementExitTransition();

  return (
    <div className="flex flex-col gap-4">
      {/* Auto Schema Checkbox */}
      <AnimatePresence>
        {visibilityState.schema_auto && (
          <motion.div
            key="schema_auto"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
          >
            <Checkbox
              label="Auto schema"
              checked={autoSchema}
              onChange={setAutoSchema}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab switch for Schema/Prompt */}
      <AnimatePresence>
        {visibilityState.schema_selector && (
          <motion.div
            key="schema_selector"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
          >
            <TabSwitch
              value={schemaInputMode}
              onChange={setSchemaInputMode}
              options={SCHEMA_INPUT_OPTIONS}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schema Code Editor */}
      <AnimatePresence>
        {visibilityState.schema_code && (
          <motion.div
            key="schema_code"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
          >
            <CodeMirrorEditor
              value={schema}
              onChange={setSchema}
              placeholder='{"type": "object", "properties": {...}}'
              helperLink={{
                text: "Learn more about Makra Query Schema",
                href: "#", // TODO: Add actual link
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schema Prompt TextArea */}
      <AnimatePresence>
        {visibilityState.schema_prompt && (
          <motion.div
            key="schema_prompt"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
          >
            <TextArea
              value={prompt}
              onChange={setPrompt}
              placeholder="Enter your extraction prompt..."
              rows={6}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination and Navigation checkboxes */}
      <AnimatePresence>
        {visibilityState.pagination_nav && (
          <motion.div
            key="pagination_nav"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
            className="flex flex-col gap-2"
          >
            <Checkbox
              label="Enable Pagination"
              checked={enablePagination}
              onChange={setEnablePagination}
            />
            <Checkbox
              label="Enable Navigation"
              checked={enableNavigation}
              onChange={setEnableNavigation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model Selection */}
      <AnimatePresence>
        {visibilityState.model_selection && (
          <motion.div
            key="model_selection"
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={elementTransition}
          >
            <Select
              label="Select Model"
              value={selectedModel}
              onChange={setSelectedModel}
              options={MODEL_OPTIONS}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ExtractDataForm = memo(ExtractDataFormComponent);
