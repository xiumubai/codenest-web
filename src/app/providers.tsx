'use client';

import { useEffect, useState, Suspense } from 'react';
import Loading from '@/components/ui/loading';
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isFirstMount, setIsFirstMount] = useState(true);
  
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

  useEffect(() => {
    // 只在组件首次加载时显示加载动画
    if (isFirstMount) {
      const timer = setTimeout(() => {
        setLoading(false);
        setIsFirstMount(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [isFirstMount]);

  if (loading) {
    return <Loading />;
  }

  return (
    <TanstackQueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
      <Toaster />
    </TanstackQueryClientProvider>
  );
}
