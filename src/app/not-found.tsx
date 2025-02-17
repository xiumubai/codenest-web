"use client";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* 404 图标 */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src="/404.svg"
            alt="404 Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 标题和描述 */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            页面未找到
          </h1>
          <p className="text-muted-foreground">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>

        {/* 返回首页按钮 */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </motion.div>
    </div>
  );
} 