"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  Code,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Get Started",
    href: "/",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Library",
    href: "/library",
    icon: <FileText size={18} />,
    children: [
      {
        title: "v1",
        href: "/library/v1",
        children: [
          {
            title: "Introduction",
            href: "/library/v1/introduction",
          },
          {
            title: "Examples",
            href: "/library/v1/examples",
          },
          {
            title: "API Docs",
            href: "/library/v1/api_docs",
          },
        ],
      },
      {
        title: "v2",
        href: "/library/v2",
        children: [
          {
            title: "Introduction",
            href: "/library/v2/introduction",
          },
          {
            title: "Examples",
            href: "/library/v2/examples",
          },
          {
            title: "API Docs",
            href: "/library/v2/api_docs",
          },
        ],
      },
    ],
  },
];

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(
    item.children
      ? pathname.startsWith(item.href) || item.children.some((child) => pathname.startsWith(child.href))
      : false
  );

  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left",
            isActive && "font-medium"
          )}
          style={{
            fontFamily: "var(--font-open-sans)",
            color: isActive
              ? "var(--makra-primary-green)"
              : "var(--makra-foreground-dark-100)",
            backgroundColor: isActive
              ? "var(--makra-background-light-200)"
              : "transparent",
            paddingLeft: `${0.75 + level * 0.75}rem`,
          }}
        >
          {item.icon}
          <span className="flex-1">{item.title}</span>
          {isOpen ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
        {isOpen && (
          <div className="mt-1">
            {item.children.map((child) => (
              <NavItemComponent key={child.href} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
        isActive && "font-medium"
      )}
      style={{
        fontFamily: "var(--font-open-sans)",
        color: isActive
          ? "var(--makra-primary-green)"
          : "var(--makra-foreground-dark-100)",
        backgroundColor: isActive
          ? "var(--makra-background-light-200)"
          : "transparent",
        paddingLeft: `${0.75 + level * 0.75}rem`,
      }}
    >
      {item.icon}
      <span>{item.title}</span>
    </Link>
  );
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-[73px] left-0 z-50 w-64 border-r overflow-y-auto transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{
          backgroundColor: "var(--makra-background-light-100)",
          borderColor: "var(--makra-background-light-200)",
          minHeight: "calc(100vh - 73px)",
          maxHeight: "calc(100vh - 73px)",
        }}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b" style={{ borderColor: "var(--makra-background-light-200)" }}>
          <span
            className="font-semibold"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark)",
            }}
          >
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-opacity-50 transition-colors"
            style={{
              backgroundColor: "var(--makra-background-light-200)",
            }}
          >
            <X size={20} style={{ color: "var(--makra-foreground-dark)" }} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
}

