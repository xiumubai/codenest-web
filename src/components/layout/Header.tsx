'use client'
import { motion } from "motion/react";
import Link from "next/link";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-zinc-800 bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/75"
    >
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6">
          <Link href="/courses" className="text-sm text-zinc-400 hover:text-white transition">
            课程
          </Link>
          <Link href="/projects" className="text-sm text-zinc-400 hover:text-white transition">
            项目
          </Link>
          <Link href="/community" className="text-sm text-zinc-400 hover:text-white transition">
            社区
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition">
            登录
          </button>
        </div>
      </div>
    </motion.header>
  );
} 