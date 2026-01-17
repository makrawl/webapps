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
    // Prepend https:// if not already present
    const url = value.startsWith("http") ? value : `https://${value}`;
    submitQuery(url);
    if (pathname === "/") {
      router.push("/playground");
    }
  };

  const handleGetCode = () => {
    // TODO: Implement get code functionality
    console.log("Get code clicked");
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="max-w-[1000px] w-full">
        <QueryForm
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onGetCode={handleGetCode}
          placeholder="example.com"
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
    <div className="min-h-screen min-w-screen makra-web-page-root border-2">
      <Navbar />
      {showQueryForm && <QueryFormSection />}
      <div className="pt-32">{children}</div>
    </div>
  );
}
