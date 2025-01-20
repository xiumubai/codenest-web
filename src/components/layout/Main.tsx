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
      className="flex-1 overflow-auto pt-16"
      id="main"
    >
      <div className="w-full mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.main>
  );
} 