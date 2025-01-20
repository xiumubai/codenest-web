'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Eye, ThumbsUp } from "lucide-react";
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      layout
      className="group relative overflow-hidden rounded-xl border border-border bg-card transition-colors hover:bg-accent/50"
    >
      {/* 封面图片 */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {article.category}
          </Badge>
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {article.readingTime}
          </Badge>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="p-6 space-y-4">
        {/* 标题和描述 */}
        <div className="space-y-2">
          <Link href={`/article/${article.id}`}>
            <h2 className="text-xl font-semibold leading-tight text-foreground truncate hover:text-primary transition-colors">
              {article.title}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground truncate">
            {article.description}
          </p>
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
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              <span>{article.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 