import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
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
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen bg-zinc-900">
          {/* 侧边栏 */}
          <Sidebar />
          
          {/* 主内容区 */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* 顶部导航 */}
            <Header />
            
            {/* 主要内容 */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>

            {/* 底部 */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
