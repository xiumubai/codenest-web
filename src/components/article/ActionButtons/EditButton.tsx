'use client';
import { useRouter } from "next/navigation";

export default function ShareButton({id}: {id: string}) {
  const router = useRouter();

  return (
    <button
    onClick={() => {
      router.push(`/article/edit?id=${id}`);
    }}
    className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-colors"
  >
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
      className="text-foreground hover:text-primary transition-colors"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  </button>
  );
}