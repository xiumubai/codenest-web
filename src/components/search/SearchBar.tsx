"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDialog from "@/components/search/SearchDialog";

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 处理快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="hidden">
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="w-full flex flex-col items-center text-center">
        <div className="flex">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="px-4 py-1 rounded-3xl border border-border hover:bg-accent hover:text-accent-foreground transition flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            搜索
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}