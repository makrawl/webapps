"use client";

import { useState, useCallback, memo, useRef, useEffect } from "react";
import {
    FiSettings,
    FiGrid,
    FiFileText,
    FiDatabase,
    FiLayers,
    FiMap,
} from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TextInput } from "@/components/ui";
import { ExtractDataForm, QueryChunksForm, PageMapForm } from "./forms";
import { usePlaygroundStore } from "@/stores/playground";
import { OperationType } from "@/types/playground";
import { AppHeader } from "@/app/page";

interface QueryFormProps {
    onSubmit?: () => void;
    onGetCode?: () => void;
    placeholder?: string;
    className?: string;
    showSubmitButton?: boolean;
}

// Segment definitions with icons
const SEGMENTS: {
    value: OperationType;
    label: string;
    icon: React.ReactNode;
}[] = [
    { value: "data", label: "Data", icon: <FiDatabase size={14} /> },
    { value: "chunks", label: "Chunks", icon: <FiLayers size={14} /> },
    { value: "map", label: "Schema", icon: <FiMap size={14} /> },
];

// Tabs implementation - Pill style with sliding indicator
const SegmentedTabs = memo(function SegmentedTabs({
    value,
    segments,
    onTabChange,
}: {
    value: OperationType;
    segments: { value: OperationType; label: string; icon: React.ReactNode }[];
    onTabChange: (value: OperationType) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    // Calculate indicator position when value changes
    useEffect(() => {
        if (!containerRef.current) return;

        const activeIndex = segments.findIndex((s) => s.value === value);
        const buttons = containerRef.current.querySelectorAll('[role="tab"]');
        const activeButton = buttons[activeIndex] as HTMLElement;

        if (activeButton) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            setIndicatorStyle({
                left: buttonRect.left - containerRect.left,
                width: buttonRect.width,
            });
        }
    }, [value, segments]);

    return (
        <div
            ref={containerRef}
            className="inline-flex items-center gap-1 p-1 rounded-lg relative"
            style={{
                backgroundColor: "var(--makra-background-light-200)",
                border: "1px solid var(--makra-border-light)",
            }}
            role="tablist"
            aria-orientation="horizontal"
        >
            {/* Sliding indicator */}
            <motion.div
                className="absolute rounded-md"
                style={{
                    backgroundColor: "var(--makra-background-light)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    height: "calc(100% - 8px)",
                    top: "4px",
                }}
                initial={false}
                animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
            />

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
                            "relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                            !isActive && "hover:opacity-80",
                        )}
                        style={{
                            fontFamily: "var(--font-open-sans)",
                            backgroundColor: "transparent",
                            transition: "color 0.2s ease",
                        }}
                        onClick={() => onTabChange(segment.value)}
                    >
                        <motion.span
                            initial={false}
                            animate={{
                                color: isActive
                                    ? "var(--makra-primary-green)"
                                    : "var(--makra-foreground-dark-100)",
                                opacity: isActive ? 1 : 0.7,
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {segment.icon}
                        </motion.span>
                        <motion.span
                            initial={false}
                            animate={{
                                color: isActive
                                    ? "var(--makra-primary-green)"
                                    : "var(--makra-foreground-dark-100)",
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {segment.label}
                        </motion.span>
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
    const [activeSegment, setActiveSegment] =
        useState<OperationType>(operationType);

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
        [setExtractData],
    );

    const handleQueryChunksChange = useCallback(
        (data: Parameters<typeof setQueryChunks>[0]) => {
            setQueryChunks(data);
        },
        [setQueryChunks],
    );

    return (
        <div>
            <AppHeader />

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

                {/* URL Input - Common acro1ss all modes */}
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
                                backgroundColor:
                                    "var(--makra-background-light-200)",
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
                                backgroundColor:
                                    "var(--makra-background-light-200)",
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
                                backgroundColor:
                                    "var(--makra-background-light-200)",
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
                                    backgroundColor:
                                        "var(--makra-background-light-200)",
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
        </div>
    );
}

export const QueryForm = memo(QueryFormComponent);
