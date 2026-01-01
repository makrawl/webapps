"use client";

import { useRouter, usePathname } from "next/navigation";
import { Input } from "@repo/ui/input";
import { InputProvider, useInput } from "@repo/ui/input-context";
import { Navbar } from "@repo/ui/navbar";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { inputValue, setInputValue, submitQuery } = useInput();

  const handleSubmit = (value: string) => {
    // Submit the query (this will trigger processing on playground)
    submitQuery(value);
    
    // If on homepage, navigate to playground
    if (pathname === "/") {
      router.push("/playground");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--makra-background-light)" }}
    >
      <Navbar />
      
      {/* Persistent Input UI - stays mounted across route changes */}
      <div className="fixed top-20 left-0 right-0 z-40 px-6 py-4 border-b" style={{ 
        backgroundColor: "var(--makra-background-light)",
        borderColor: "var(--makra-background-light-200)"
      }}>
        <div className="max-w-7xl mx-auto">
          <Input
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            placeholder="Enter your query or URL..."
            className="w-full"
            showSubmitButton={true}
          />
        </div>
      </div>

      {/* Page content - changes based on route */}
      <div className="pt-32">
        {children}
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <InputProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </InputProvider>
  );
}

