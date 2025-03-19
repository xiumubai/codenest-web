"use client"

import { clientFetch } from '@/lib/fetch/clientFetch';
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
}
interface CategorySidebarProps {
  onTagSelect?: (id: number[] | null) => void;
}

export function CategoryFilter({ onTagSelect }: CategorySidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [tagList, setTagList] = useState<Tag[]>([]);

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
      onTagSelect?.([...selectedCategories, categoryId])
    } else {
      const newSelectedCategories = selectedCategories.filter((id) => id !== categoryId)
      setSelectedCategories(newSelectedCategories)
      onTagSelect?.(newSelectedCategories)
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchTerm("")
    onTagSelect?.([])
  }

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

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">分类筛选</h3>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索分类..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {tagList.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
            />
            <Label htmlFor={`category-${category.id}`} className="flex w-full cursor-pointer justify-between text-sm">
              <span>{category.name}</span>
              <span className="text-muted-foreground">({category.articleCount})</span>
            </Label>
          </div>
        ))}
      </div>
      {(selectedCategories.length > 0 || searchTerm) && (
        <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
          清除筛选
        </Button>
      )}
    </div>
  )
}
