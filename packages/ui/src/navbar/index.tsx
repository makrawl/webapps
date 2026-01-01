"use client";

import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface NavbarLink {
  href: string;
  label: string;
}

interface NavbarProps {
  logoUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  links?: NavbarLink[];
}

export const Navbar = ({
  logoUrl = "/logo/192x192.png",
  twitterUrl = "https://twitter.com/makralabs",
  githubUrl = "https://github.com/makralabs",
  links = [
    { href: "/playground", label: "Playground" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pricing", label: "Pricing" },
  ],
}: NavbarProps) => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: "var(--makra-background-light)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logoUrl}
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
            <span style={{ color: "var(--makra-foreground-dark)" }}>labs</span>
          </div>
        </div>
        {links.length > 0 && (
          <div
            className="hidden md:flex items-center gap-4 text-sm font-medium w-full justify-center"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-100)",
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:opacity-70 transition-opacity px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "var(--makra-background-light-200)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        <div
          className="hidden md:flex items-center gap-4 text-sm font-medium"
          style={{
            fontFamily: "var(--font-open-sans)",
            color: "var(--makra-foreground-dark-100)",
          }}
        >
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};
