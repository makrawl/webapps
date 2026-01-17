"use client";

export function PageMapForm() {
  // Page-Map mode only requires the URL input which is handled by the parent component
  // No additional form fields needed
  return (
    <div className="flex flex-col gap-2">
      <p
        className="text-sm"
        style={{
          fontFamily: "var(--font-open-sans)",
          color: "var(--makra-foreground-dark-100)",
        }}
      >
        Page-Map will analyze the URL structure and return a sitemap of all discovered pages.
      </p>
    </div>
  );
}
