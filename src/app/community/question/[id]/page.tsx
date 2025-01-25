import QuestionDetail from '@/components/community/QuestionDetail';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  params: {
    id: string;
  };
}

// 加载状态组件
function QuestionDetailSkeleton() {
  return (
    <div className="flex-1">
      <div className="py-6 px-4 lg:px-8">
        <div className="mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionPage({ params }: PageProps) {
  return (
    <Suspense fallback={<QuestionDetailSkeleton />}>
      <QuestionDetail questionId={params.id} />
    </Suspense>
  );
} 