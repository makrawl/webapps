"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav
      className="w-screen sticky top-0 z-50 border border-red-500"
      style={{
        backgroundColor: "var(--makra-background-light)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/192x192.png"
              alt="Makra Labs Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-primary-green)",
              }}
            >
              Makra
              <span style={{ color: "var(--makra-foreground-dark)" }}>
                {" "}Docs
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-opacity-50 transition-colors"
              style={{
                backgroundColor: "var(--makra-background-light-200)",
              }}
              aria-label="Toggle menu"
            >
              <Menu size={20} style={{ color: "var(--makra-foreground-dark)" }} />
            </button>
            <div className="relative hidden md:block">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                  searchOpen && "ring-2"
                )}
                style={{
                  backgroundColor: searchOpen
                    ? "var(--makra-background-light-100)"
                    : "transparent",
                  borderColor: "var(--makra-background-light-200)",
                }}
              >
                <Search
                  size={18}
                  style={{ color: "var(--makra-foreground-dark-200)" }}
                />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="outline-none bg-transparent"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    color: "var(--makra-foreground-dark)",
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                />
                <kbd
                  className="hidden lg:inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: "var(--makra-background-light-200)",
                    color: "var(--makra-foreground-dark-100)",
                  }}
                >
                  ⌘K
                </kbd>
              </div>
            </div>

            <Link
              href="https://github.com/makralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
              style={{
                backgroundColor: "var(--makra-background-light-200)",
              }}
              aria-label="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "var(--makra-foreground-dark)" }}
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

