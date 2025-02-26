import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({
  isCollapsed = false,
}: {
  isCollapsed?: boolean;
}) {
  return (
    <div className="flex h-16 items-center gap-2 px-4">
      <Link href="/" className="flex items-center gap-2" prefetch>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-9 h-9"
        >
          <Image
            src="/codenest-logo.svg"
            alt="CodeNest Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <span
          className={cn(
            "text-2xl font-bold bg-gradient-to-r from-primary/80 to-primary text-transparent bg-clip-text whitespace-nowrap transition-all duration-300",
            isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
          )}
        >
          CodeNest
        </span>
      </Link>
    </div>
  );
}
