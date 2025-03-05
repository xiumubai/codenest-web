'use client';

import Link from "next/link";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, ThumbsUp, MessageCircle } from "lucide-react";
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface ArticleCardProps {
  article: Article;
  onClose?: () => void;
}

export default function ArticleCard({ article, onClose }: ArticleCardProps) {
  return (
    <motion.div
      layout
      className="cursor-pointer group relative overflow-hidden rounded-xl border border-border bg-card transition-colors hover:bg-accent/50 flex"
    >
      {/* 文章内容 */}
      <div className="flex-1 p-6 space-y-4">
        {/* 标题和描述 */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold leading-tight text-foreground hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        </div>

        {/* 标签 */}
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-background/80">
            {article.category}
          </Badge>
          <Badge variant="secondary" className="bg-background/80">
            {article.readingTime}
          </Badge>
        </div>

        {/* 作者信息和统计 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-medium text-foreground">
                {article.author.name}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(new Date(article.createdAt), "MM月dd日", { locale: zhCN })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1" title="阅读数">
              <Eye className="w-3 h-3" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center gap-1" title="点赞数">
              <ThumbsUp className="w-3 h-3" />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center gap-1" title="评论数">
              <MessageCircle className="w-3 h-3" />
              <span>{article.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 封面图片 */}
      <div className="relative w-[240px] shrink-0">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}