'use client';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5分钟
            gcTime: 10 * 60 * 1000,   // 10分钟
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </TanstackQueryClientProvider>
  );
} 