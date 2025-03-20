'use client';

import { useEffect, useState, Suspense } from 'react';
import Loading from '@/components/ui/loading';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isFirstMount, setIsFirstMount] = useState(true);

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
    <Suspense fallback={<Loading />}>
      {children}
      <Toaster />
    </Suspense>
  );
}
