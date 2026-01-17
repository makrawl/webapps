import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1
        className="text-4xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "var(--makra-foreground-dark)",
        }}
      >
        404 - Page Not Found
      </h1>
      <p
        className="text-lg mb-8"
        style={{
          fontFamily: "var(--font-open-sans)",
          color: "var(--makra-foreground-dark-100)",
        }}
      >
        The documentation page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
        style={{
          backgroundColor: "var(--makra-primary-green)",
          color: "var(--makra-foreground-light)",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

