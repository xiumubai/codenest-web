import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Inter } from "next/font/google";
import ClientLayout from "@/components/layout/client-layout";
import { ThemeProvider } from "./theme-provider"
import { UserProvider } from "@/contexts/user-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})


export const metadata: Metadata = {
  title: "CodeNest - 打造属于你的代码乐园",
  description: "让编程更简单，让学习更有趣",
  icons: {
    icon: [
      {
        url: "/codenest-logo.svg",
        type: "image/svg+xml",
      },
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
    <html lang="zh" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        className="font-sans antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <ClientLayout>{children}</ClientLayout>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
