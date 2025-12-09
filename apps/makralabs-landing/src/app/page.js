"use client";

import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEmail("ping@makralabs.org");
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--makra-background-light)" }}
    >
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ backgroundColor: "var(--makra-background-light)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/192x192.png"
              alt="Makra Labs Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div
              className="text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-primary-green)",
              }}
            >
              Makra
              <span style={{ color: "var(--makra-foreground-dark)" }}>
                labs
              </span>
            </div>
          </div>
          <div
            className="hidden md:flex items-center gap-4 text-sm font-medium w-full justify-end"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-100)",
            }}
          >
            <a
              href="https://twitter.com/makralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://github.com/makralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center relative z-10 mt-[-20]">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 md:mb-8"
            style={{
              backgroundColor: "var(--makra-background-light-100)",
              border: "1px solid var(--makra-background-light-200)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--makra-foreground-success)" }}
            />
            <span
              className="text-sm font-medium"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-100)",
              }}
            >
              We're on it!
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 md:mb-8 flex flex-col"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--makra-foreground-dark)",
            }}
          >
            <span style={{ color: "var(--makra-primary-green)" }}>
              Navigate the web faster
            </span>
            <span
              className="text-3xl md:text-5xl"
              style={{ color: "var(--makra-foreground-dark-200)" }}
            >
              at a cost that is justified
            </span>
          </h1>

          <p
            className="text-xs md:text-xl mb-4 md:mb-8 leading-relaxed flex flex-col"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-200)",
              lineHeight: "1.4",
            }}
          >
            <span>
              Our mission is to{" "}
              <strong>minimize the cost of AI knowledge retrieval</strong>,
            </span>
            <span>
              and ultimately build an agentic browser that is affordable.
            </span>
          </p>

          <p
            className="text-xs md:text-xl mb-4 md:mb-8 leading-relaxed flex flex-row items-center justify-center gap-1"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-200)",
              lineHeight: "1.4",
            }}
          >
            <span>You can reach out to us at </span>
            <snap>
              {email && (
                <span
                  className="inline-flex items-center gap-2"
                  style={{ position: "relative" }}
                >
                  <span className="underline">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="hover:opacity-70 transition-opacity inline-flex items-center cursor-pointer"
                    aria-label="Copy email to clipboard"
                  >
                    <FaCopy size={16} />
                  </button>
                  {copied && (
                    <span
                      className="text-sm"
                      style={{
                        color: "var(--makra-foreground-success)",
                        position: "absolute",
                        left: "100%",
                        marginLeft: "0.5rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Copied!
                    </span>
                  )}
                </span>
              )}
            </snap>
          </p>
        </div>
      </section>

      <footer
        className="py-12 px-6"
        style={{ backgroundColor: "var(--makra-background-dark-200)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/192x192.png"
              alt="Makra Labs Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <div
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-foreground-light)",
              }}
            >
              Makra
              <span style={{ color: "var(--makra-primary-green-100)" }}>
                labs
              </span>
            </div>
          </div>
          <p
            className="text-sm"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-light-200)",
            }}
          >
            ⓒ 2025 Makra Labs
          </p>
        </div>
      </footer>
    </div>
  );
}
