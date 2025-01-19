export default function Footer() {
  return (
    <footer className="glass border-t py-6 px-6">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © 2024 CodeNest. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            关于我们
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            使用条款
          </a>
          <a 
            href="#" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            隐私政策
          </a>
        </div>
      </div>
    </footer>
  );
} 