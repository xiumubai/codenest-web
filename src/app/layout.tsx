import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Providers } from "./providers";
import { LayoutProvider } from "@/contexts/LayoutContext";
import AppLayout from "@/components/layout/AppLayout";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeNest - 打造属于你的代码乐园",
  description: "让编程更简单，让学习更有趣",
  icons: {
    icon: [
      {
        url: "/codenest-logo.svg",
        type: "image/svg+xml",
      }
    ],
    shortcut: "/codenest-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </LayoutProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
