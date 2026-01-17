"use client";

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
    <>
      <section className="relative min-h-screen flex items-center justify-center px-6 border border-red-500">
          <div className="h-full w-full flex flex-col items-center justify-center">
              <p>Home Page Section 1</p>
          </div>
        {/*<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 w-full">
          <div className="flex-shrink-0 w-full md:w-1/2 order-1 md:order-2">
            <Image
              src="/images/Makrawl-App-Flow.svg"
              alt="Makrawl App Flow Diagram"
              width={522}
              height={201}
              className="w-full"
              priority
            />
          </div>
          <div className="flex-1 md:w-1/2 text-center md:text-left relative z-10 order-2 md:order-1">
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
                We&apos;re on it!
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
              className="text-xs md:text-base mb-4 md:mb-8 leading-relaxed flex flex-col"
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
              className="text-xs md:text-base mb-4 md:mb-8 leading-relaxed flex flex-row items-center justify-center md:justify-start gap-1"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-200)",
                lineHeight: "1.4",
              }}
            >
              <span>You can reach out to us at </span>
              <span>
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
              </span>
            </p>
          </div>
        </div>*/}
      </section>


      <section className="relative min-h-screen flex items-center justify-center px-6 border border-red-500">
          <div className="h-full w-full flex flex-col items-center justify-center">
              <p>Home Page Section 1</p>
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
            &copy; 2025 Makra Labs
          </p>
        </div>
      </footer>
    </>
  );
}
