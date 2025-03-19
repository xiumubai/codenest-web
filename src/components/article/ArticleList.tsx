"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clientFetch } from '@/lib/fetch/clientFetch';
import { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { Pagination } from "../common/Pagination";

// 获取文章列表数据
const fetchArticles = async (page: number) => {
  const res = await clientFetch('/article/list', {
    method: 'POST',
    body: JSON.stringify({
      page,
      pageSize: 10,
    })
  });
  // 保存分页参数

  return res.data;
};

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadArticles = async () => {
      const response = await fetchArticles(page)
      setArticles(response.items)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    }
    loadArticles()
  }, [page])


  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">共 {total} 篇文章</div>
        <div className="flex items-center gap-2">
          <span className="text-sm">排序：</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">最新发布</SelectItem>
              <SelectItem value="oldest">最早发布</SelectItem>
              <SelectItem value="title">标题</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}

