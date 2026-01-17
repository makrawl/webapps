"use client";

import { useState } from "react";
import { FiSettings, FiGrid, FiFileText } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
import { Check, Info } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../../lib/utils";

export interface QueryFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    onGetCode?: () => void;
    placeholder?: string;
    placeholder2?: string;
    value2?: string;
    onChange2?: (value: string) => void;
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
    placeholder2,
    value2,
    onChange2,
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

    const [showInfo, setShowInfo] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [showDoc, setShowDoc] = useState(false);
    const [showGetCode, setShowGetCode] = useState(false);

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
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        if (e.key === "Enter" && onSubmit && value.trim()) {
            e.preventDefault();
            const url = value.startsWith("http") ? value : `https://${value}`;
            onSubmit?.(url);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (newValue.startsWith("https://")) {
            newValue = newValue.slice(8);
        }
        onChange(newValue);
    };

    const handleInput2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange2) {
            onChange2(e.target.value);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("w-full flex flex-col gap-4", className)}
        >
            <Tabs value={activeSegment} onValueChange={handleSegmentChange}>
                <TabsList
                    className={cn(
                        "bg-transparent p-0 h-auto gap-1 w-full justify-start",
                        "border-b border-border",
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
                                "data-[state=active]:bg-transparent",
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
                                        backgroundColor:
                                            "var(--makra-background-light-200)",
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

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                {/* First custom input group: prepend text and info icon */}
                <div className="flex-1 relative flex items-center w-full">
                    {/* Prepend https:// */}
                    <span
                        className="absolute left-4 text-sm pointer-events-none select-none z-10"
                        style={{
                            fontFamily: "var(--font-open-sans)",
                            color: "var(--makra-foreground-dark-100)",
                        }}
                    >
                        https://
                    </span>
                    <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        aria-label="Website URL"
                        className={cn(
                            "!pl-20 pr-12",
                            "[&_input]:font-sans",
                            "block w-full rounded-md border outline-none",
                            "transition-all",
                            "py-2",
                            "border",
                            "focus:ring-2 ring-offset-0 focus:ring-primary focus:border-primary",
                            "text-base",
                        )}
                        style={{
                            fontFamily: "var(--font-open-sans)",
                            backgroundColor: "var(--makra-background-light)",
                            borderColor: "var(--makra-background-light-200)",
                            color: "var(--makra-foreground-dark)",
                        }}
                    />
                    {/* Info icon button with native HTML tooltip */}
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 flex items-center justify-center rounded-full bg-transparent border-0 p-0 m-0 h-6 w-6"
                        aria-label="Show info"
                        style={{}}
                        onFocus={() => setShowInfo(true)}
                        onBlur={() => setShowInfo(false)}
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                    >
                        <Info
                            size={16}
                            aria-label="Enter the root URL to scrape. We'll use HTTPS by default."
                        />
                    </button>
                    {/* Native browser tooltip for accessibility (also provided above) */}
                </div>

                {/* Optional extra field */}
                {typeof value2 !== "undefined" || placeholder2 ? (
                    <div className="flex-1 relative flex items-center w-full">
                        <input
                            type="text"
                            value={value2 || ""}
                            onChange={handleInput2Change}
                            placeholder={placeholder2}
                            className={cn(
                                "pr-12",
                                "[&_input]:font-sans",
                                "block w-full rounded-md border outline-none",
                                "transition-all",
                                "py-2",
                                "border",
                                "focus:ring-2 ring-offset-0 focus:ring-primary focus:border-primary",
                                "text-base",
                            )}
                            style={{
                                fontFamily: "var(--font-open-sans)",
                                backgroundColor:
                                    "var(--makra-background-light)",
                                borderColor:
                                    "var(--makra-background-light-200)",
                                color: "var(--makra-foreground-dark)",
                            }}
                            aria-label={placeholder2 || "Extra"}
                        />
                        {/* Check icon at the end */}
                        <span className="absolute right-3 flex items-center justify-center h-6 w-6 bg-primary text-primary-foreground rounded-full">
                            <Check className="size-3" />
                        </span>
                    </div>
                ) : null}
            </div>

            <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                    {/* Settings Button */}
                    <div className="relative flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-lg transition-all hover:opacity-70"
                            style={{
                                backgroundColor:
                                    "var(--makra-background-light-200)",
                                color: "var(--makra-foreground-dark-100)",
                            }}
                            aria-label="Settings"
                            onFocus={() => setShowSettings(true)}
                            onBlur={() => setShowSettings(false)}
                            onMouseEnter={() => setShowSettings(true)}
                            onMouseLeave={() => setShowSettings(false)}
                            tabIndex={0}
                        >
                            <FiSettings size={18} />
                        </button>
                        {showSettings && (
                            <div
                                className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-muted px-2 py-1 rounded shadow text-xs whitespace-nowrap z-20"
                                style={{
                                    fontFamily: "var(--font-open-sans)",
                                    color: "var(--makra-foreground-dark-100)",
                                }}
                                role="tooltip"
                            >
                                Settings
                            </div>
                        )}
                    </div>
                    {/* Grid View Button */}
                    <div className="relative flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-lg transition-all hover:opacity-70"
                            style={{
                                backgroundColor:
                                    "var(--makra-background-light-200)",
                                color: "var(--makra-foreground-dark-100)",
                            }}
                            aria-label="Grid view"
                            onFocus={() => setShowGrid(true)}
                            onBlur={() => setShowGrid(false)}
                            onMouseEnter={() => setShowGrid(true)}
                            onMouseLeave={() => setShowGrid(false)}
                            tabIndex={0}
                        >
                            <FiGrid size={18} />
                        </button>
                        {showGrid && (
                            <div
                                className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-muted px-2 py-1 rounded shadow text-xs whitespace-nowrap z-20"
                                style={{
                                    fontFamily: "var(--font-open-sans)",
                                    color: "var(--makra-foreground-dark-100)",
                                }}
                                role="tooltip"
                            >
                                Grid view
                            </div>
                        )}
                    </div>
                    {/* Document View Button */}
                    <div className="relative flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-lg transition-all hover:opacity-70"
                            style={{
                                backgroundColor:
                                    "var(--makra-background-light-200)",
                                color: "var(--makra-foreground-dark-100)",
                            }}
                            aria-label="Document view"
                            onFocus={() => setShowDoc(true)}
                            onBlur={() => setShowDoc(false)}
                            onMouseEnter={() => setShowDoc(true)}
                            onMouseLeave={() => setShowDoc(false)}
                            tabIndex={0}
                        >
                            <FiFileText size={18} />
                        </button>
                        {showDoc && (
                            <div
                                className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-muted px-2 py-1 rounded shadow text-xs whitespace-nowrap z-20"
                                style={{
                                    fontFamily: "var(--font-open-sans)",
                                    color: "var(--makra-foreground-dark-100)",
                                }}
                                role="tooltip"
                            >
                                Document view
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {onGetCode && (
                        <div className="relative flex items-center">
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
                                aria-label="Get code"
                                onFocus={() => setShowGetCode(true)}
                                onBlur={() => setShowGetCode(false)}
                                onMouseEnter={() => setShowGetCode(true)}
                                onMouseLeave={() => setShowGetCode(false)}
                                tabIndex={0}
                            >
                                <HiCode size={18} />
                                Get code
                            </button>
                            {showGetCode && (
                                <div
                                    className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-muted px-2 py-1 rounded shadow text-xs whitespace-nowrap z-20"
                                    style={{
                                        fontFamily: "var(--font-open-sans)",
                                        color: "var(--makra-foreground-dark-100)",
                                    }}
                                    role="tooltip"
                                >
                                    View scraping code for your input
                                </div>
                            )}
                        </div>
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
