"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, placeholder as cmPlaceholder } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { defaultKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { cn } from "@/lib/utils";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  height?: string;
  helperLink?: {
    text: string;
    href: string;
  };
}

// Syntax highlighting colors for JSON
const jsonHighlightStyle = HighlightStyle.define([
  { tag: tags.string, color: "#a63d40" },
  { tag: tags.number, color: "#41743a" },
  { tag: tags.bool, color: "#b8860b" },
  { tag: tags.null, color: "#b8860b" },
  { tag: tags.propertyName, color: "#2b5da8" },
  { tag: tags.punctuation, color: "#434343" },
  { tag: tags.bracket, color: "#434343" },
]);

// Custom theme to match Makra design
const makraTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
    backgroundColor: "var(--makra-background-light)",
    border: "1px solid var(--makra-background-light-200)",
    borderRadius: "8px",
  },
  "&.cm-focused": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(65, 116, 58, 0.2)",
  },
  ".cm-scroller": {
    overflow: "auto",
  },
  ".cm-content": {
    padding: "12px",
    minHeight: "120px",
    caretColor: "var(--makra-primary-green)",
  },
  ".cm-line": {
    padding: "0 4px",
  },
  ".cm-placeholder": {
    color: "var(--makra-foreground-dark-100)",
    opacity: "0.5",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(65, 116, 58, 0.05)",
  },
  ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
    backgroundColor: "rgba(65, 116, 58, 0.15)",
  },
  ".cm-cursor": {
    borderLeftColor: "var(--makra-primary-green)",
  },
});

export function CodeMirrorEditor({
  value,
  onChange,
  placeholder = "Enter JSON schema...",
  disabled = false,
  className,
  height = "150px",
  helperLink,
}: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Clear any existing editor
    if (viewRef.current) {
      viewRef.current.destroy();
    }

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        keymap.of(defaultKeymap),
        json(),
        syntaxHighlighting(jsonHighlightStyle),
        makraTheme,
        cmPlaceholder(placeholder),
        updateListener,
        EditorView.editable.of(!disabled),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  // Update editor content when value changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        ref={editorRef}
        className={cn(
          "overflow-hidden rounded-lg",
          disabled && "opacity-50 pointer-events-none"
        )}
        style={{ minHeight: height }}
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
