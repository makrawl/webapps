import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-cormorant)", color: "var(--makra-foreground-dark)" }}>
        Welcome to Makra Labs Documentation
      </h1>
      <p className="text-lg mb-8" style={{ fontFamily: "var(--font-open-sans)", color: "var(--makra-foreground-dark-100)" }}>
        Explore our libraries and APIs to get started building with Makra Labs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/library/v1/introduction"
          className="p-6 rounded-lg border transition-colors hover:bg-opacity-50"
          style={{
            backgroundColor: "var(--makra-background-light-100)",
            borderColor: "var(--makra-background-light-200)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--makra-primary-green)" }}>
            Library v1
          </h2>
          <p style={{ fontFamily: "var(--font-open-sans)", color: "var(--makra-foreground-dark-100)" }}>
            Get started with version 1 of our library
          </p>
        </Link>
        <Link
          href="/library/v2/introduction"
          className="p-6 rounded-lg border transition-colors hover:bg-opacity-50"
          style={{
            backgroundColor: "var(--makra-background-light-100)",
            borderColor: "var(--makra-background-light-200)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "var(--font-cormorant)", color: "var(--makra-primary-green)" }}>
            Library v2
          </h2>
          <p style={{ fontFamily: "var(--font-open-sans)", color: "var(--makra-foreground-dark-100)" }}>
            Explore the latest version of our library
          </p>
        </Link>
      </div>
    </div>
  );
}

