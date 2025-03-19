import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card key={article.id} className="overflow-hidden">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row">
        <div className="relative h-48 w-full shrink-0 md:h-40 md:w-60">
          <Image
            src={article.cover || "/placeholder.svg"}
            alt={article.title}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary">{article.tag?.name}</Badge>
            <span className="text-xs text-muted-foreground">{article.readingTime}</span>
          </div>
          <Link href={`/articles/${article.id}`}>
            <h3 className="mb-2 line-clamp-2 text-xl font-semibold hover:text-primary">{article.title}</h3>
          </Link>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{article.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{article.author?.username}</span>
              <span className="text-muted-foreground"> · {format(new Date(article.createdAt), "yyyy年MM月dd日", { locale: zhCN })}</span>
            </div>
            <Link href={`/articles/${article.id}`} className="text-sm font-medium text-primary hover:underline">
              阅读更多
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 