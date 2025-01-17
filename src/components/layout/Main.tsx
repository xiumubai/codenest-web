"use client";
import { motion } from "framer-motion";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-auto bg-background"
      id="main"
    >
      <div className="w-full mx-auto px-4 py-8">
        {children}
      </div>
    </motion.main>
  );
} 