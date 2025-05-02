import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "./ThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Platform",
  description: "Advanced AI Platform with Multiple Models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
