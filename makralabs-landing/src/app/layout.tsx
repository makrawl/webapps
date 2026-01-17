import type { Metadata } from "next";
import { Cormorant_Garamond, Open_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Makra Labs",
  description: "Building sustainable solutions for tomorrow",
  icons: {
    icon: "/logo/192x192.png",
    apple: "/logo/192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${openSans.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
