"use client";

import { Providers } from "@/app/providers";
import { LayoutProvider } from "@/contexts/layout-context";
import AppLayout from "@/components/layout/AppLayout";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Providers>
      <LayoutProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </LayoutProvider>
      <ProgressBar
        height="2px"
        color="#00cf79"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Providers>
  );
} 