import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/Main";
import BackToTop from "@/components/ui/back-to-top";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Providers } from "./providers";

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
            <div className="flex h-screen bg-background">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-screen">
                <Header />
                <Main>{children}</Main>
                <Footer />
              </div>
              {/* 回到顶部按钮 */}
              <BackToTop containerSelector="#main"/>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
