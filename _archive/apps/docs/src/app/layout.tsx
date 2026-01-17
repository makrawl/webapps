import { Cormorant_Garamond, Open_Sans } from "next/font/google";
import "./globals.css";
import { DocsLayout } from "@/components/docs-layout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Makra Labs Documentation",
  description: "Documentation for Makra Labs products and libraries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${openSans.variable} antialiased`}
      >
        <DocsLayout>{children}</DocsLayout>
      </body>
    </html>
  );
}

