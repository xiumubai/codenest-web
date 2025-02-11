import { Question } from "@/types/question";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <Link href={`/community/question/${question.id}`} prefetch>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group"
      >
        <div className={cn(
          "flex items-start p-4 transition-all duration-300 cursor-pointer",
          "border-b border-border/40 bg-background/60 hover:bg-accent/50",
          "dark:bg-card/40 dark:hover:bg-card/60",
        )}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "text-base font-medium truncate flex-1",
                "text-foreground/90 group-hover:text-primary",
                "transition-colors dark:text-foreground/80"
              )}>
                {question.title}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                {question.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className={cn(
                      "transition-colors text-xs",
                      "hover:bg-secondary/80 dark:hover:bg-secondary/50",
                      tag.color ? 
                        `bg-${tag.color}-100 dark:bg-${tag.color}-900/30 
                         hover:bg-${tag.color}-200 dark:hover:bg-${tag.color}-900/50 
                         text-${tag.color}-700 dark:text-${tag.color}-300` : 
                        "dark:bg-secondary/30"
                    )}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={question.author.avatar} />
                  <AvatarFallback>{question.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="hover:text-foreground transition-colors">
                  {question.author.name}
                </span>
                <span>·</span>
                <span>{formatDistanceToNow(new Date(question.createdAt), { locale: zhCN, addSuffix: true })}</span>
              </div>
              
              <div className="flex items-center ml-auto space-x-4">
                <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.answersCount}</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <ThumbsUp className={cn(
                    "h-4 w-4",
                    question.isLiked && "fill-current text-primary"
                  )} />
                  <span>{question.likesCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 