"use client";

import { useState, useEffect, useRef } from "react";
import { useInput } from "@repo/ui/input-context";

export default function Playground() {
  const { submittedQuery } = useInput();
  const [queryResult, setQueryResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastProcessedQueryRef = useRef("");

  useEffect(() => {
    // Process query only when it's submitted (not on every input change)
    if (submittedQuery && submittedQuery.trim()) {
      const trimmedQuery = submittedQuery.trim();
      if (trimmedQuery !== lastProcessedQueryRef.current) {
        processQuery(trimmedQuery);
        lastProcessedQueryRef.current = trimmedQuery;
      }
    } else {
      // Reset when query is cleared
      lastProcessedQueryRef.current = "";
      setQueryResult(null);
      setIsProcessing(false);
    }
  }, [submittedQuery]);

  const processQuery = async (query) => {
    setIsProcessing(true);
    setQueryResult(null);

    // Simulate query processing (replace with actual API call)
    setTimeout(() => {
      setQueryResult(`Query: "${query}"\n\nThis is where the query results would appear. You can integrate with your API here.`);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--makra-foreground-dark)",
          }}
        >
          <span style={{ color: "var(--makra-primary-green)" }}>
            Playground
          </span>
        </h1>

        {!submittedQuery || !submittedQuery.trim() ? (
          <div
            className="bg-white rounded-lg p-6 mb-6"
            style={{
              backgroundColor: "var(--makra-background-light-100)",
              border: "1px solid var(--makra-background-light-200)",
            }}
          >
            <p
              className="text-base text-center"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-100)",
              }}
            >
              Enter a query in the input above to get started.
            </p>
          </div>
        ) : (
          <>
            {isProcessing ? (
              <div
                className="bg-white rounded-lg p-6 mb-6"
                style={{
                  backgroundColor: "var(--makra-background-light-100)",
                  border: "1px solid var(--makra-background-light-200)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "var(--makra-primary-green)",
                      borderTopColor: "transparent",
                    }}
                  />
                  <p
                    className="text-base"
                    style={{
                      fontFamily: "var(--font-open-sans)",
                      color: "var(--makra-foreground-dark-100)",
                    }}
                  >
                    Processing your query...
                  </p>
                </div>
              </div>
            ) : queryResult ? (
              <div
                className="bg-white rounded-lg p-6 mb-6"
                style={{
                  backgroundColor: "var(--makra-background-light-100)",
                  border: "1px solid var(--makra-background-light-200)",
                }}
              >
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    color: "var(--makra-foreground-dark)",
                  }}
                >
                  Query Results
                </h2>
                <div
                  className="text-base whitespace-pre-wrap"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    color: "var(--makra-foreground-dark-100)",
                  }}
                >
                  {queryResult}
                </div>
              </div>
            ) : null}

            <div
              className="bg-white rounded-lg p-6"
              style={{
                backgroundColor: "var(--makra-background-light-100)",
                border: "1px solid var(--makra-background-light-200)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-open-sans)",
                  color: "var(--makra-foreground-dark)",
                }}
              >
                Current Query
              </h2>
              <p
                className="text-base font-mono p-3 rounded"
                style={{
                  fontFamily: "var(--font-open-sans)",
                  color: "var(--makra-foreground-dark-100)",
                  backgroundColor: "var(--makra-background-light-200)",
                }}
              >
                {submittedQuery}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

