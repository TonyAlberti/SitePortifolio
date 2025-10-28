import { ThemeProvider } from "@/components/theme-provider";
import data from "@/content/site.json";
// import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

// Fonte global amigável e moderna (Inter)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Metadata vinda do JSON
export const metadata: Metadata = {
  title: data.site.title,
  description: data.site.description,
  generator: "v0.app",
};

// Layout raiz do App Router
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={data.site.lang} suppressHydrationWarning>
      {/* 
        Fonte Inter aplicada globalmente.
        Arredondada, legível e idêntica em todos os sistemas.
      */}
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* <Analytics /> */}
      </body>
    </html>
  );
}
