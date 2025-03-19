"use client";

import { useEffect } from "react";
import { useLayout } from "@/contexts/layout-context";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setConfig } = useLayout();

  useEffect(() => {
    setConfig({
      showHeader: false,
      showSidebar: false,
      showFooter: false
    });

    // 组件卸载时恢复默认布局
    return () => {
      setConfig({
        showHeader: true,
        showSidebar: true,
        showFooter: true
      });
    };
  }, [setConfig]);

  return children;
}