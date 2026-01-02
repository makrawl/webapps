"use client";

import { useRouter, usePathname } from "next/navigation";
import { QueryForm } from "@repo/ui/playground/QueryForm";
import { Navbar } from "@repo/ui/navbar";
import { usePlaygroundStore } from "../stores/playground";

/** QueryForm section - only rendered on home/playground */
function QueryFormSection() {
  const router = useRouter();
  const pathname = usePathname();
  const { inputValue, setInputValue, submitQuery } = usePlaygroundStore();

  const handleSubmit = (value: string) => {
    submitQuery(value);
    if (pathname === "/") {
      router.push("/playground");
    }
  };

  return (
    <div className="px-6 py-4 border-b">
      <div className="max-w-7xl mx-auto">
        <QueryForm
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          placeholder="Enter your query or URL..."
          className="w-full"
          showSubmitButton
        />
      </div>
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showQueryForm = pathname === "/" || pathname === "/playground";

  return (
    <div className="min-h-screen min-w-screen makra-web-page-root">
      <Navbar />
      {showQueryForm && <QueryFormSection />}
      <div className="pt-32">{children}</div>
    </div>
  );
}
