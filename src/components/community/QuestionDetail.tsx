'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import ArticleViewer from '@/components/editor/article-viewer';
import AnswerEditor from '@/components/community/AnswerEditor';
import AnswerList from '@/components/community/AnswerList';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// 模拟数据
const mockQuestion = {
  id: '1',
  title: '如何在 React 中实现无限滚动？',
  description: '<p>我正在开发一个列表页面，需要实现无限滚动功能。我尝试使用了 Intersection Observer API，但是遇到了一些问题：</p><pre><code class="language-javascript">useEffect(() => {\n  const observer = new IntersectionObserver((entries) => {\n    // ...\n  });\n}, []);</code></pre>',
  expectation: '<p>希望能够：</p><ol><li>平滑地加载更多数据</li><li>避免重复请求</li><li>处理加载状态和错误状态</li></ol>',
  author: {
    id: 'u1',
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  },
  createdAt: '2024-03-20T10:00:00.000Z',
  tags: [
    { id: 't1', name: 'React' },
    { id: 't2', name: 'JavaScript' },
    { id: 't3', name: '前端开发' },
  ],
  answersCount: 2,
  likesCount: 5,
  isLiked: false,
};

// 模拟回答数据
const mockAnswers = [
  {
    id: 'a1',
    content: '<p>对于实现无限滚动，我建议使用 <code>react-intersection-observer</code> 库，它提供了更简单的 API。以下是一个基本的实现示例：</p><pre><code class="language-typescript">import { useInView } from \'react-intersection-observer\';\n\nfunction InfiniteList() {\n  const { ref, inView } = useInView();\n\n  useEffect(() => {\n    if (inView) {\n      loadMore();\n    }\n  }, [inView]);\n\n  return (\n    <div>\n      {items.map(item => (\n        <div key={item.id}>{item.content}</div>\n      ))}\n      <div ref={ref}>Loading...</div>\n    </div>\n  );\n}</code></pre>',
    author: {
      id: 'u2',
      name: '李四',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    createdAt: '2024-03-20T10:30:00.000Z',
    likesCount: 3,
    isLiked: true,
    replies: [
      {
        id: 'r1',
        content: '<p>这个方案不错！我补充一下，使用这个库时要注意设置合适的 <code>threshold</code> 值，比如：</p><pre><code class="language-typescript">const { ref, inView } = useInView({\n  threshold: 0.5\n});</code></pre>',
        author: {
          id: 'u3',
          name: '王五',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
        },
        createdAt: '2024-03-20T11:00:00.000Z',
        likesCount: 1,
        isLiked: false,
        replyTo: {
          id: 'u2',
          name: '李四'
        }
      },
      {
        id: 'r2',
        content: '<p>还可以考虑添加一个 <code>rootMargin</code> 参数，提前触发加载：</p><pre><code class="language-typescript">const { ref, inView } = useInView({\n  rootMargin: \'100px\'\n});</code></pre>',
        author: {
          id: 'u4',
          name: '赵六',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4'
        },
        createdAt: '2024-03-20T11:30:00.000Z',
        likesCount: 2,
        isLiked: true,
        replyTo: {
          id: 'u3',
          name: '王五'
        }
      }
    ]
  },
  {
    id: 'a2',
    content: '<p>我分享一个更完整的实现，包含了错误处理和加载状态：</p><pre><code class="language-typescript">function InfiniteList() {\n  const [items, setItems] = useState([]);\n  const [error, setError] = useState(null);\n  const [isLoading, setIsLoading] = useState(false);\n\n  const loadMore = async () => {\n    try {\n      setIsLoading(true);\n      const newItems = await fetchItems();\n      setItems(prev => [...prev, ...newItems]);\n    } catch (err) {\n      setError(err);\n    } finally {\n      setIsLoading(false);\n    }\n  };\n\n  // ... 其他实现\n}</code></pre>',
    author: {
      id: 'u5',
      name: '小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5'
    },
    createdAt: '2024-03-20T12:00:00.000Z',
    likesCount: 2,
    isLiked: false,
    replies: []
  }
];

interface QuestionDetailProps {
  questionId: string;
}

export default function QuestionDetail({ questionId }: QuestionDetailProps) {
  const [answers, setAnswers] = useState(mockAnswers);

  const handleAnswerSubmitted = () => {
    // TODO: 实现刷新回答列表的逻辑
  };

  const handleReply = async (answerId: string, content: string, replyToUser: { id: string; name: string }) => {
    // 模拟API调用
    const newReply = {
      id: `r${Date.now()}`,
      content,
      author: {
        id: 'current-user',
        name: '当前用户',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=current-user`
      },
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false,
      replyTo: replyToUser
    };

    // 更新状态
    setAnswers(prevAnswers => 
      prevAnswers.map(answer => {
        if (answer.id === answerId) {
          return {
            ...answer,
            replies: [...(answer.replies || []), newReply]
          };
        }
        return answer;
      })
    );

    toast.success('回复已提交');
  };

  return (
    <main className="flex-1">
      <div className="py-6 px-4 lg:px-8">
        <div className="mx-auto space-y-8">
          {/* 问题详情 */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight">{mockQuestion.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockQuestion.author.avatar} />
                    <AvatarFallback>{mockQuestion.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{mockQuestion.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(mockQuestion.createdAt), { locale: zhCN, addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-1.5">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm">{mockQuestion.answersCount}</span>
                  </div>
                  <button className="flex items-center space-x-1.5 hover:text-foreground transition-colors">
                    <ThumbsUp className={cn(
                      "h-5 w-5",
                      mockQuestion.isLiked && "fill-current text-primary"
                    )} />
                    <span className="text-sm">{mockQuestion.likesCount}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockQuestion.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className="px-3">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-8 pt-4 border-t">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">问题描述</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <ArticleViewer content={mockQuestion.description} />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">期望结果</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <ArticleViewer content={mockQuestion.expectation} />
                </div>
              </div>
            </div>
          </div>

          {/* 回答编辑器 */}
          <div className="space-y-4 pt-8 border-t">
            <h2 className="text-xl font-semibold">你的回答</h2>
            <AnswerEditor
              questionId={questionId}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>

          {/* 回答列表 */}
          <div className="space-y-4 pt-8 border-t">
            <h2 className="text-xl font-semibold">
              {answers.length} 个回答
            </h2>
            <AnswerList 
              answers={answers}
              onReply={handleReply}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 