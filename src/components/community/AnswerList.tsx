'use client';

import { useState, memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import ArticleViewer from '@/components/editor/ArticleViewer';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import ArticleEditor from '@/components/editor/ArticleEditor';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replyTo?: {
    id: string;
    name: string;
  };
}

interface Answer {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replies?: Reply[];
}

interface AnswerListProps {
  answers: Answer[];
  onReply?: (answerId: string, content: string, replyToUser: { id: string; name: string; }) => void;
}

interface ReplyEditorProps {
  replyToUser: { id: string; name: string; } | null;
  content: string;
  onChange: (content: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ReplyEditor = memo(function ReplyEditor({ 
  replyToUser,
  content,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting 
}: ReplyEditorProps) {
  return (
    <div className="space-y-4">
      {replyToUser && (
        <div className="text-sm text-muted-foreground">
          回复 @{replyToUser.name}
        </div>
      )}
      <div className="border rounded-lg">
        <ArticleEditor
          content={content}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '提交回复'}
        </Button>
      </div>
    </div>
  );
});

export default function AnswerList({ answers, onReply }: AnswerListProps) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToUser, setReplyToUser] = useState<{ id: string; name: string; } | null>(null);
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>(null);

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast.error('请输入回复内容');
      return;
    }

    try {
      setIsSubmitting(true);
      if (replyToUser && onReply && activeAnswerId) {
        await onReply(activeAnswerId, replyContent, replyToUser);
      }
      setReplyContent('');
      setShowReplyEditor(false);
      setReplyToUser(null);
      setActiveAnswerId(null);
    } catch (error) {
      toast.error('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (answerId: string, user: { id: string; name: string }) => {
    setActiveAnswerId(answerId);
    setReplyToUser(user);
    setShowReplyEditor(true);
  };

  const handleCancelReply = () => {
    setShowReplyEditor(false);
    setReplyToUser(null);
    setReplyContent('');
    setActiveAnswerId(null);
  };

  if (answers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        暂无回答，快来抢首评吧！
      </div>
    );
  }

  return (
    <div className="space-y-8 divide-y divide-border">
      {answers.map((answer: Answer) => (
        <div key={answer.id} className="pt-8 first:pt-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={answer.author.avatar} />
                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{answer.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(answer.createdAt), { locale: zhCN, addSuffix: true })}
                  </div>
                </div>
              </div>
              <button className="flex items-center space-x-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className={cn(
                  "h-4 w-4",
                  answer.isLiked && "fill-current text-primary"
                )} />
                <span>{answer.likesCount}</span>
              </button>
            </div>

            <div className="pl-[52px]">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ArticleViewer content={answer.content} />
              </div>
            </div>

            <div className="pl-[52px] flex items-center space-x-4">
              <button
                onClick={() => {
                  if (showReplyEditor && replyToUser?.id === answer.author.id && activeAnswerId === answer.id) {
                    handleCancelReply();
                  } else {
                    handleReply(answer.id, { id: answer.author.id, name: answer.author.name });
                  }
                }}
                className="flex items-center space-x-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>
                  {showReplyEditor && replyToUser?.id === answer.author.id && activeAnswerId === answer.id
                    ? '取消回复'
                    : '回复'
                  }
                </span>
              </button>
            </div>

            {showReplyEditor && replyToUser?.id === answer.author.id && activeAnswerId === answer.id && (
              <div className="pl-[52px]">
                <ReplyEditor
                  replyToUser={replyToUser}
                  content={replyContent}
                  onChange={setReplyContent}
                  onSubmit={handleSubmitReply}
                  onCancel={handleCancelReply}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}

            {answer.replies && answer.replies.length > 0 && (
              <div className="pl-[52px] space-y-3">
                {answer.replies.map((reply: Reply) => (
                  <div key={reply.id} className="relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={reply.author.avatar} />
                            <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm">
                              <span className="font-medium">{reply.author.name}</span>
                              {reply.replyTo && (
                                <span className="text-muted-foreground mx-1">
                                  回复 <span className="text-foreground">@{reply.replyTo.name}</span>
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(reply.createdAt), { locale: zhCN, addSuffix: true })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              if (showReplyEditor && replyToUser?.id === reply.author.id && activeAnswerId === answer.id) {
                                handleCancelReply();
                              } else {
                                handleReply(answer.id, reply.author);
                              }
                            }}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showReplyEditor && replyToUser?.id === reply.author.id && activeAnswerId === answer.id
                              ? '取消回复'
                              : '回复'
                            }
                          </button>
                          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsUp className={cn(
                              "h-3 w-3",
                              reply.isLiked && "fill-current text-primary"
                            )} />
                            <span className="text-xs">{reply.likesCount}</span>
                          </button>
                        </div>
                      </div>
                      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm">
                        <ArticleViewer content={reply.content} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 