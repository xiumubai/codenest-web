"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserArticles } from "@/components/profile/user-articles"
import { UserDrafts } from "@/components/profile/user-drafts"
import { UserBookmarks } from "@/components/profile/user-bookmarks"
import { UserSettings } from "@/components/profile/user-settings"
import { UserQuestions } from "@/components/questions/user-questions"
import { UserAnswers } from "@/components/questions/user-answers"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("articles")

  return (
    <Tabs defaultValue="articles" className="mt-8" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-6 md:w-auto">
        <TabsTrigger value="articles">我的文章</TabsTrigger>
        <TabsTrigger value="drafts">草稿箱</TabsTrigger>
        <TabsTrigger value="questions">我的问题</TabsTrigger>
        <TabsTrigger value="answers">我的回答</TabsTrigger>
        <TabsTrigger value="bookmarks">收藏</TabsTrigger>
        <TabsTrigger value="settings">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="articles" className="mt-6">
        <UserArticles />
      </TabsContent>
      <TabsContent value="drafts" className="mt-6">
        <UserDrafts />
      </TabsContent>
      <TabsContent value="questions" className="mt-6">
        <UserQuestions />
      </TabsContent>
      <TabsContent value="answers" className="mt-6">
        <UserAnswers />
      </TabsContent>
      <TabsContent value="bookmarks" className="mt-6">
        <UserBookmarks />
      </TabsContent>
      <TabsContent value="settings" className="mt-6">
        <UserSettings />
      </TabsContent>
    </Tabs>
  )
}

