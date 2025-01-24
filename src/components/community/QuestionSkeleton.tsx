import { Skeleton } from "@/components/ui/skeleton";

export function QuestionSkeleton() {
  return (
    <div className="flex items-start p-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-5 w-2/3" />
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          <div className="flex items-center ml-auto space-x-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
} 