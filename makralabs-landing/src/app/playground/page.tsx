"use client";

import { useEffect } from "react";
import { usePlaygroundStore } from "@/stores/playground";

export default function Playground() {
  const { query, result, isProcessing, setResult } = usePlaygroundStore();

  useEffect(() => {
    if (query && query.trim() && isProcessing) {
      // Simulate query processing (replace with actual API call)
      const timer = setTimeout(() => {
        setResult(
          `Query: "${query}"\n\nThis is where the query results would appear. You can integrate with your API here.`
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [query, isProcessing, setResult]);

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
          <span style={{ color: "var(--makra-primary-green)" }}>Playground</span>
        </h1>

        {!query || !query.trim() ? (
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
            ) : result ? (
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
                  {result}
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
                {query}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
