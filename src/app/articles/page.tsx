'use client';

import { ArticleList } from "@/components/article/article-list"
import { CategoryFilter } from "@/components/article/category-filter"
import { SearchBar } from "@/components/common/search-bar"

export default function ArticlesPage() {

  const onTagSelect = (id: number[] | null) => {
    console.log(id);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">文章列表</h1>
        <p className="text-muted-foreground">浏览我们的文章库，发现有趣的内容</p>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <CategoryFilter onTagSelect={onTagSelect} />
        </div>
        <div className="md:col-span-3">
          <ArticleList />
        </div>
      </div>
    </div>
  )
}

