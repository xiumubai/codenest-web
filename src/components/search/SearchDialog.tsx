import { useEffect, useState, useRef } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { Article } from '@/types/article';
import { generateMockArticles } from '@/lib/mock/articles';
import ArticleCard from '../article/ArticleCard';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Article[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理搜索
  useEffect(() => {
    const searchArticles = async () => {
      if (!debouncedSearchTerm) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockResults = generateMockArticles(5).filter(article =>
          article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          article.subtitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setResults(mockResults);
      } catch (error) {
        console.error('搜索失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchArticles();
  }, [debouncedSearchTerm]);

  // 处理快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
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
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 