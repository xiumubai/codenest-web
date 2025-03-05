'use client';

export default function ShareButton() {
  const handleShare = () => {
    // 分享功能的具体实现
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch((error) => {
        console.error('分享失败:', error);
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板');
      }).catch((error) => {
        console.error('复制失败:', error);
      });
    }
  };

  return (
    <button
      className="group flex flex-col items-center gap-2"
      onClick={handleShare}
    >
      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground group-hover:text-primary transition-colors"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
        分享
      </span>
    </button>
  );
}