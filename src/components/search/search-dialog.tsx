import { useEffect, useState, useRef } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { Article } from "@/types/article";
import { ArticleCard } from "../article/article-card";
import { Portal } from "../ui/portal";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useRouter } from "next/navigation";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState("article");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理跳转
  const handleNavigate = (type: string, id: number) => {
    onClose();
    switch (type) {
      case "article":
        router.push(`/article/${id}`);
        break;
      case "question":
        router.push(`/community/question/${id}`);
        break;
      case "interview":
        router.push(`/interview/${id}`);
        break;
      default:
        break;
    }
  };

  // 处理搜索
  useEffect(() => {
    const searchArticles = async () => {
      if (!debouncedSearchTerm) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await clientFetch("/search", {
          method: "POST",
          body: JSON.stringify({
            keyword: searchTerm,
            type: activeTab,
            page: 1,
            pageSize: 10,
          }),
        });

        setResults(res.data.items);
      } catch (error) {
        console.error("搜索失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    searchArticles();
  }, [debouncedSearchTerm]);

  // 处理快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 自动聚焦
  useEffect(() => {
    if (isOpen) {
      // 使用 setTimeout 确保在弹窗动画开始后聚焦
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={onClose}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* 搜索弹窗 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed left-4 right-4 top-[10%] z-50 mx-auto max-w-3xl md:left-20 md:right-20"
            >
              <Command
                className="border border-border rounded-xl shadow-2xl overflow-hidden bg-background"
                loop
              >
                {/* 标签栏 */}
                <div className="flex items-center border-b border-border px-4 py-2 bg-muted/50">
                  {[
                    { id: "article", label: "文章" },
                    { id: "question", label: "问题" },
                    { id: "interview", label: "面试题" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* 搜索输入框 */}
                <div className="flex items-center border-b border-border px-4">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Command.Input
                    ref={inputRef}
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    placeholder="搜索文章..."
                    className="flex-1 h-12 bg-transparent outline-none placeholder:text-muted-foreground text-foreground px-2"
                  />
                  {isLoading && (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </div>

                {/* 搜索结果 */}
                <Command.List className="max-h-[60vh] overflow-y-auto p-4">
                  {searchTerm && !isLoading && results.length === 0 && (
                    <div className="py-6 text-center text-muted-foreground">
                      未找到相关文章
                    </div>
                  )}

                  <div className="grid gap-4">
                    {results.map((article) => (
                      <div
                        className="relative transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5"
                        key={article.id}
                        onClick={() => handleNavigate(activeTab, article.id)}
                      >
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </Command.List>
              </Command>
            </motion.div>
          </>
        </Portal>
      )}
    </AnimatePresence>
  );
}
