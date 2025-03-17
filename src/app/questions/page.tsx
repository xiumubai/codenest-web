// import Image from "next/image";
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { QuestionList } from "@/components/community/QuestionList";
import { Question } from "@/types/question";
import { useCallback, useState } from "react";
import Link from "next/link";

// 模拟数据
const mockQuestions: Question[] = Array.from({ length: 50 }).map((_, index) => ({
  id: `q-${index}`,
  title: `这是一个示例问题 ${index + 1}，描述了一个常见的编程问题`,
  author: {
    id: `u-${index}`,
    name: `用户${index + 1}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
  },
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  tags: [
    { id: "t1", name: "React" },
    { id: "t2", name: "TypeScript" },
    { id: "t3", name: "Next.js" },
  ].slice(0, Math.floor(Math.random() * 3) + 1),
  answersCount: Math.floor(Math.random() * 10),
  likesCount: Math.floor(Math.random() * 50),
  isLiked: Math.random() > 0.5,
}));

const ITEMS_PER_PAGE = 10;

export default function CommunityPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = mockQuestions.filter(question => 
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

  const handlePageChange = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      // 模拟加载延迟
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCurrentPage(page);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 重置到第一页
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col space-y-4">
          {/* 搜索和操作栏 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索问题..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <Link href="/community/ask">
              <Button className="gap-2 shrink-0">
                <PlusCircle className="h-4 w-4" />
                提问
              </Button>
            </Link>
          </div>

          {/* 问题列表 */}
          <QuestionList
            questions={currentQuestions}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
