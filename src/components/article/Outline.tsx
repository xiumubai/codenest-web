'use client';

import { cn } from '@/lib/utils';

interface OutlineItem {
  id: string;
  level: number;
  text: string;
}

interface OutlineProps {
  outline: OutlineItem[];
  activeHeadingId: string | null;
  onOutlineClick: (id: string) => void;
}

export default function Outline({
  outline,
  activeHeadingId,
  onOutlineClick,
}: OutlineProps) {
  
  return (
    <div className={cn(
      "w-64 flex flex-col h-full rounded-lg shadow-sm",
    )}>
      <div className="h-12 flex items-center justify-between px-4 border-b">
        <h3 className="font-medium text-lg">文章大纲</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {outline.map((item) => (
            <div
              key={item.id}
              className={cn(
                "text-sm cursor-pointer transition-all duration-200 py-2 px-3 rounded-md hover:bg-muted/50 hover:text-primary truncate relative",
                activeHeadingId === item.id
                  ? "text-primary font-medium bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground/90"
              )}
              style={{
                paddingLeft: `${(item.level - 1) * 16 + 12}px`,
              }}
              onClick={() => onOutlineClick(item.id)}
            >
              {activeHeadingId === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5 bg-primary rounded-full" />
              )}
              {item.text}
            </div>
          ))}
          {outline.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              暂无大纲
            </div>
          )}
        </div>
      </div>
    </div>
  );
}