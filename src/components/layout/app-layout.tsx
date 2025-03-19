"use client";

import { ReactNode } from "react";
import { useLayout } from "@/contexts/layout-context";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
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
    <div className="flex min-h-screen flex-col">
        {config.showHeader && <Header />}
        <Main >{children}</Main>
        {config.showFooter && <Footer />}
        {/* 回到顶部按钮 */}
        <BackToTop containerSelector="#main"/>
    </div>
  );
}