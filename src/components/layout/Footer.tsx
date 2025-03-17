import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-block h-5 w-5 bg-primary rounded-sm"></span>
              <span className="font-semibold">CodeNest</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">分享您的想法和故事，连接志同道合的人。</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">链接</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground transition-colors hover:text-foreground">
                  文章
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
                  分类
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">关于</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">订阅</h3>
            <p className="mt-4 mb-4 text-sm text-muted-foreground">订阅我们的新闻通讯，获取最新文章和更新。</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="您的邮箱"
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button 
                size="sm"
                className="bg-primary/90 text-primary-foreground hover:bg-primary"
              >
                订阅
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CodeNest. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}
