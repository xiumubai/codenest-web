"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Flame, Clock, CheckCircle } from "lucide-react"

export function QuestionsFilter() {
  const [filter, setFilter] = useState("newest")
  const [status, setStatus] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setStatus}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-1">
            全部
          </TabsTrigger>
          <TabsTrigger value="unsolved" className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            未解决
          </TabsTrigger>
          <TabsTrigger value="solved" className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />
            已解决
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">排序：</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="排序方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>最新</span>
              </div>
            </SelectItem>
            <SelectItem value="popular">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                <span>热门</span>
              </div>
            </SelectItem>
            <SelectItem value="votes">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>投票数</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

