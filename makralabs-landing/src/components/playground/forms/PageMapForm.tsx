"use client";

import { memo } from "react";
import { motion } from "motion/react";

function PageMapFormComponent() {
  // Page-Map mode only requires the URL input which is handled by the parent component
  // No additional form fields needed
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <p
        className="text-sm"
        style={{
          fontFamily: "var(--font-open-sans)",
          color: "var(--makra-foreground-dark-100)",
        }}
      >
        Page-Map will analyze the URL structure and return a sitemap of all discovered pages.
      </p>
    </motion.div>
  );
}

export const PageMapForm = memo(PageMapFormComponent);
