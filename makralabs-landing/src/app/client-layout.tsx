"use client";

import { useRouter, usePathname } from "next/navigation";
import { QueryForm } from "@/components/playground/QueryForm";
import { Navbar } from "@/components/navbar";

/** QueryForm section - only rendered on home/playground */
function QueryFormSection({ isCompact }: { isCompact: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = () => {
    if (pathname === "/") {
      router.push("/playground");
    }
  };

  const handleGetCode = () => {
    // TODO: Implement get code functionality
    console.log("Get code clicked");
  };

  return (
    <div
      className="w-full flex items-center justify-center transition-all duration-500 ease-in-out"
      style={{
        height: isCompact ? "auto" : "calc(100vh - 66px)",
        minHeight: isCompact ? "400px" : undefined,
        paddingTop: isCompact ? "24px" : undefined,
        paddingBottom: isCompact ? "24px" : undefined,
      }}
    >
      <div className="max-w-[1000px] w-full px-4">
        <QueryForm
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
  const isPlayground = pathname === "/playground";

  return (
    <div className="min-h-screen min-w-screen makra-web-page-root">
      <Navbar />
      <div className="flex flex-col">
        {showQueryForm && <QueryFormSection isCompact={isPlayground} />}
        {children}
      </div>
    </div>
  );
}
