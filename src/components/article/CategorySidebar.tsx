'use client';

import { Button } from "@/components/ui/button";
import { clientFetch } from '@/lib/fetch/clientFetch';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
}

interface CategorySidebarProps {
  onTagSelect?: (id: number | null) => void;
}

export default function CategorySidebar({ onTagSelect }: CategorySidebarProps) {
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [activeTagId, setActiveTagId] = useState<number | null>(null);

  // 获取标签列表
  const fetchTags = async () => {
    try {
      const response = await clientFetch('/tag/list');
      setTagList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagSelect = (id: number | null) => {
    setActiveTagId(id);
    onTagSelect?.(id);
  };

  return (
    <div className="col-span-1 space-y-6">
      <div className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 p-5">
        <h3 className="text-lg font-semibold mb-4 text-foreground/90">热门标签</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-base hover:bg-primary/10 transition-colors",
              activeTagId === null && "bg-primary/10 text-primary font-medium"
            )}
            onClick={() => handleTagSelect(null)}
          >
            全部
          </Button>
          {tagList.map((tag) => (
            <Button
              key={tag.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-base hover:bg-primary/10 transition-colors",
                activeTagId === tag.id && "bg-primary/10 text-primary font-medium"
              )}
              onClick={() => handleTagSelect(tag.id)}
            >
              <span className="truncate">{tag.name}</span>
              <span className="ml-auto text-muted-foreground text-sm">({tag.articleCount})</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
