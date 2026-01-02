"use client";

import { useRouter, usePathname } from "next/navigation";
import { Navbar } from "@repo/ui/components/navbar/index";
import { PlaygroundInput } from "@repo/ui/components/playground/PlaygroundInput";
import { usePlaygroundStore } from "../../stores/playground";

// Routes that show the playground input
const PLAYGROUND_ROUTES = ["/", "/playground"];

export default function AppLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { inputValue, setInputValue, submitQuery } = usePlaygroundStore();

  const showPlaygroundInput = PLAYGROUND_ROUTES.includes(pathname);

  const handleSubmit = (value) => {
    submitQuery(value);
    router.push("/playground");
  };

  return (
    <>
      <Navbar />

      {showPlaygroundInput && (
        <PlaygroundInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />
      )}

      <main>{children}</main>
    </>
  );
}

