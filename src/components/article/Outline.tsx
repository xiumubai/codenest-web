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
      "w-64 flex flex-col h-full",
    )}>
      <div className="h-12 flex items-center justify-between px-4 border-b">
        <h3 className="font-medium">大纲</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {outline.map((item) => (
            <div
              key={item.id}
              className={cn(
                "text-sm cursor-pointer transition-colors py-2 rounded hover:bg-muted/50 hover:text-primary truncate",
                activeHeadingId === item.id
                  ? "text-primary font-medium bg-muted/80"
                  : "hover:text-muted-foreground/90"
              )}
              style={{
                paddingLeft: `${(item.level - 1) * 20}px`,
              }}
              onClick={() => onOutlineClick(item.id)}
            >
              {item.text}
            </div>
          ))}
          {outline.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-4">
              暂无大纲
            </div>
          )}
        </div>
      </div>
    </div>
  );
}