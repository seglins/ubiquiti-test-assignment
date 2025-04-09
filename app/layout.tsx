import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import Header from "@/lib/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ubiquiti FE Test Assignment",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <Header />
        <main
          className={cn(
            "overflow-scroll",
            "h-[calc(100vh-var(--header-height))]",
            "h-[calc(100dvh-var(--header-height))]",
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
