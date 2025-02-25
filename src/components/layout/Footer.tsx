export default function Footer() {
  return (
    <footer className="relative bg-[#1e293b]">
      <div className="relative py-6 px-6 shadow-[0_-1px_12px_rgba(0,0,0,0.08)]">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-white">
            © 2024 CodeNest. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="#"
              className="text-sm text-white hover:text-white transition-colors"
            >
              关于我们
            </a>
            <a 
              href="#" 
              className="text-sm text-white hover:text-white transition-colors"
            >
              使用条款
            </a>
            <a 
              href="#" 
              className="text-sm text-white hover:text-white transition-colors"
            >
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 