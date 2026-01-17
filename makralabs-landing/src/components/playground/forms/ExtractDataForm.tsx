"use client";

import { useState, useEffect } from "react";
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

interface ExtractDataFormProps {
  onFormChange: (data: Partial<ExtractDataFormState>) => void;
  initialState?: ExtractDataFormState;
}

const SCHEMA_INPUT_OPTIONS: { value: SchemaInputMode; label: string }[] = [
  { value: "schema", label: "Schema" },
  { value: "prompt", label: "Prompt" },
];

export function ExtractDataForm({
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

  return (
    <div className="flex flex-col gap-4">
      {/* Auto Schema Checkbox */}
      <Checkbox
        label="Auto schema"
        checked={autoSchema}
        onChange={setAutoSchema}
      />

      {/* Schema/Prompt inputs - only show when auto schema is disabled */}
      {!autoSchema && (
        <div className="flex flex-col gap-3">
          {/* Tab switch for Schema/Prompt */}
          <TabSwitch
            value={schemaInputMode}
            onChange={setSchemaInputMode}
            options={SCHEMA_INPUT_OPTIONS}
          />

          {/* Schema input with CodeMirror */}
          {schemaInputMode === "schema" && (
            <CodeMirrorEditor
              value={schema}
              onChange={setSchema}
              placeholder='{"type": "object", "properties": {...}}'
              helperLink={{
                text: "Learn more about Makra Query Schema",
                href: "#", // TODO: Add actual link
              }}
            />
          )}

          {/* Prompt input as plain textarea */}
          {schemaInputMode === "prompt" && (
            <TextArea
              value={prompt}
              onChange={setPrompt}
              placeholder="Enter your extraction prompt..."
              rows={6}
            />
          )}
        </div>
      )}

      {/* Pagination and Navigation checkboxes */}
      <div className="flex flex-col gap-2">
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
      </div>

      {/* Model Selection */}
      <Select
        label="Select Model"
        value={selectedModel}
        onChange={setSelectedModel}
        options={MODEL_OPTIONS}
      />
    </div>
  );
}
