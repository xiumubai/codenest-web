"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useScroll } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/types/comment";
import { clientFetch } from "@/lib/fetch/clientFetch";
import { useUserStore } from "@/store/user";
import {ArticleViewer} from "@/components/editor/article-viewer";
import {CommentList} from "@/components/article/comment/comment-list";
import WithAuth from "@/components/auth/with-auth";
import Outline from "@/components/article/outline";
import LikeButton from "@/components/article/ActionButtons/LikeButton";
import EditButton from "@/components/article/ActionButtons/EditButton";
import CommentButton from "@/components/article/ActionButtons/CommentButton";
import ShareButton from "@/components/article/ActionButtons/ShareButton";

export default function ArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { userInfo } = useUserStore();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const [activeHeading, setActiveHeading] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentPage, setCommentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // 加载评论数据
  const fetchComments = async (page: number) => {
    try {
      setIsLoadingComments(true);
      const res = await clientFetch(`/comments/${id}?page=${page}&pageSize=10`, {
        method: 'GET'
      });
      
      const newComments = res.data.items;
      setHasMoreComments(newComments.length === 10);
      
      if (page === 1) {
        setComments(newComments);
      } else {
        setComments(prev => [...prev, ...newComments]);
      }
    } catch (error) {
      console.error('加载评论失败:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments(1);
    }
  }, [id]);

  const handleLoadMoreComments = () => {
    if (!isLoadingComments && hasMoreComments) {
      const nextPage = commentPage + 1;
      setCommentPage(nextPage);
      fetchComments(nextPage);
    }
  };

  const handleAddComment = async (content: string, replyTo?: { id: string; username: string }) => {
    if (!userInfo) return;

    try {
      const response = await clientFetch('/comments', {
        method: 'POST',
        body: JSON.stringify({
          articleId: id,
          content,
          parentId: replyTo?.id
        })
      });

      if (response.data) {
        const newComment = response.data;
        
        if (!replyTo) {
          // 普通评论，添加到列表最前面
          setComments(prev => [newComment, ...prev]);
        } else {
          // 回复评论，找到父评论并添加到其replies数组最前面
          setComments(prev => {
            const updateComments = (comments: Comment[]): Comment[] => {
              return comments.map(comment => {
                if (comment.id === replyTo.id) {
                  return {
                    ...comment,
                    replies: [newComment, ...(comment.replies || [])]
                  };
                }
                if (comment.replies) {
                  return {
                    ...comment,
                    replies: updateComments(comment.replies)
                  };
                }
                return comment;
              });
            };
            
            return updateComments(prev);
          });
        }
      }
    } catch (error) {
      console.error('发表评论失败:', error);
    }
  };

  // 提取文章大纲
  const [outline, setOutline] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const headingRefs = useRef<{ [key: string]: HTMLElement }>({});

  // 处理大纲点击事件
  const handleOutlineClick = (id: string) => {
    const element = headingRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 使用 Intersection Observer 监测标题的可见性
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    // 找到最大交叉比例的标题
    let maxRatio = 0;
    let maxId = "";

    entries.forEach((entry) => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        maxId = entry.target.id;
      }
    });

    if (maxId) {
      setActiveHeading(maxId);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await clientFetch(`/article/${id}`);
        setArticle(res.data);
        setLikeCount(res.data.likeCount || 0);
        setIsLiked(res.data.liked || false);

        // 解析文章内容中的标题生成大纲
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.data?.content, "text/html");
        const headings = Array.from(doc.querySelectorAll("h1, h2, h3"));
        // 为每个标题添加 id
        headings.forEach((heading, index) => {
          const id = `heading-${index}`;
          heading.id = id;
        });

        const outlineData = headings.map((heading, index) => ({
          id: `heading-${index}`,
          text: heading.textContent || "",
          level: parseInt(heading.tagName[1]),
        }));
        setOutline(outlineData);

        // 设置标题元素的引用
        headings.forEach((heading, index) => {
          const id = `heading-${index}`;
          headingRefs.current[id] = heading as HTMLElement;
        });

        // 创建 Intersection Observer
        const observer = new IntersectionObserver(observerCallback, {
          rootMargin: "-10% 0px -70% 0px",
          threshold: [0, 0.5, 1],
        });

        // 观察所有标题元素
        headings.forEach((heading) => {
          observer.observe(heading);
        });

        return () => observer.disconnect();
      } catch (error) {
        console.error("获取文章失败:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-[250px_1fr_300px] gap-8">
          <Skeleton className="h-[calc(100vh-2rem)] w-full bg-muted" />
          <div className="space-y-8">
            <Skeleton className="h-8 w-3/4 bg-muted" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-muted" />
                <Skeleton className="h-3 w-32 bg-muted" />
              </div>
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl bg-muted" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-5/6 bg-muted" />
              <Skeleton className="h-4 w-4/6 bg-muted" />
            </div>
          </div>
          <Skeleton className="h-[calc(100vh-2rem)] w-full bg-muted" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center text-muted-foreground">
          文章不存在或已被删除
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-[250px_1fr_250px] gap-8">
          {/* 左侧操作区 */}
          <div className="sticky top-4 space-y-6">
            {/* 操作按钮组 */}
            <div className="flex flex-col items-center gap-4">
              <LikeButton
                articleId={id as string}
                initialCount={likeCount}
                initialLiked={isLiked}
              />
              {userInfo && userInfo.id === article.author.id && (
                <EditButton id={id} />
              )}
              <CommentButton
                count={article.comments?.length || 0}
                onClick={() => {
                  document
                    .querySelector("#comments")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <ShareButton onClick={() => void 0} />
            </div>
          </div>

          {/* 中间内容区 */}
          <div className="min-h-[calc(100vh-2rem)]">
            {/* 文章标题 */}
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              {article?.title}
            </h1>

            {/* 作者信息和创建时间 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={article?.author?.avatar}
                  alt={article?.author?.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">
                  {article?.author?.name}
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                {formatDate(article?.createdAt)}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {article?.tag?.name}
              </span>
            </div>

            {/* 封面图 */}
            {article?.cover && (
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8 shadow-lg ring-1 ring-border">
                <Image
                  src={article?.cover}
                  alt={article?.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* 文章内容 */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ArticleViewer content={article?.content} />
            </div>

            {/* 评论区 */}
            <CommentList
              comments={comments}
              onAddComment={handleAddComment}
              articleId={id as string}
            />
          </div>

          {/* 右侧大纲 */}
          <div className="sticky top-4 h-[calc(100vh-2rem)]">
            {/* 作者信息卡片 */}
            <div className="bg-card rounded-xl p-6 shadow-sm ring-1 ring-border/5 mb-6">
              <div className="flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-background">
                    <Image
                      src={article?.author?.avatar}
                      alt={article?.author?.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center space-y-1.5">
                  <div className="font-semibold text-lg text-foreground/90">
                    {article.author.username}
                  </div>
                </div>
                <div className="flex gap-2 w-full justify-center">
                  <WithAuth
                    onAuth={() => {
                      // 关注作者的逻辑
                    }}
                  >
                    <button className="flex-1 bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/20 transition-colors rounded-lg py-2.5 px-4 font-medium flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                      </svg>
                      关注作者
                    </button>
                  </WithAuth>
                </div>
              </div>
            </div>
            <Outline outline={outline} />
          </div>
        </div>
      </div>
    </>
  );
}
