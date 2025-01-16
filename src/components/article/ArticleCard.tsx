'use client';
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div 
      className="h-[420px] max-w-3xl mx-auto"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-full p-4 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="h-[230px] relative w-full overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>

        <div className="flex-1 flex flex-col mt-3">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className={`px-2 py-0.5 text-xs rounded-full ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div>
            <Link href={`/article/${article.id}`}>
              <h2 className="text-lg font-bold hover:text-primary transition-colors truncate mb-2" title={article.title}>
                {article.title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground truncate" title={article.subtitle}>
              {article.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t mt-auto">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{article.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 