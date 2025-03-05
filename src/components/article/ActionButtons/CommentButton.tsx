'use client';

interface CommentButtonProps {
  count: number;
}

export default function CommentButton({ count }: CommentButtonProps) {
  const handleClick = () => {
    document
      .querySelector("#comments")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      className="group flex flex-col items-center gap-2"
      onClick={handleClick}
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
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
        {count}
      </span>
    </button>
  );
}