import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="inline-flex h-6 w-6 bg-primary rounded-sm text-sm items-center justify-center text-primary-foreground">CN</span>
      <span className="font-semibold">CodeNest</span>
    </Link>
  );
}
