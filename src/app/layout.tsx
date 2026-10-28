import type { Metadata } from "next";
import { Fraunces, Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "KathaAI",
  description: "Interactive Hindi stories for children",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hi"
      className={`${display.variable} ${sans.variable} ${hindi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6ead7] text-[#3f2a20]">{children}</body>
    </html>
  );
}
