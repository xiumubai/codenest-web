"use client";

import { ReactNode } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "./Main";
import BackToTop from "../ui/back-to-top";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { config } = useLayout();

  if (!config.showHeader && !config.showSidebar && !config.showFooter) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {config.showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {config.showHeader && <Header />}
        <Main>{children}</Main>
        {config.showFooter && <Footer />}
      </div>
      {/* 回到顶部按钮 */}
      <BackToTop containerSelector="#main"/>
    </div>
  );
} 