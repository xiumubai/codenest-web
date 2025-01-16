// import Image from "next/image";
'use client'
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-full bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="flex flex-col items-center text-center gap-8">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          >
            CodeNest
          </motion.h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            打造属于你的代码乐园，让编程更简单
          </p>
          
          <div className="flex gap-4 mt-8">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition">
              立即开始
            </button>
            <button className="px-8 py-3 rounded-full border border-zinc-700 hover:bg-zinc-800 transition">
              了解更多
            </button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature cards here */}
        </div>
      </section>
    </div>
  );
}
