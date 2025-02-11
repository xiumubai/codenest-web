'use client';

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div 
      className="fixed inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 背景遮罩 - 调整渐变透明度 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background/90" />
      
      {/* 额外的背景装饰 */}
      <div className="absolute inset-0 bg-grid-primary/[0.02]" />
      
      <div className="relative text-center space-y-6">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Logo 区域 */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            {/* Logo 文字 */}
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              CodeNest
            </motion.div>

            {/* Logo 下的装饰线 */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </motion.div>
        
        {/* 加载动画区域 */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* 自定义加载动画 */}
          <div className="relative">
            {/* 外圈动画 */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/80 to-primary rounded-full blur-sm"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                clipPath: "polygon(50% 0%, 50% 25%, 75% 50%, 50% 75%, 50% 100%, 0% 100%, 0% 0%)",
              }}
            />
            
            {/* 主要加载圆环 */}
            <div className="relative w-12 h-12">
              <motion.div
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 border-2 border-t-primary border-r-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>
          
          {/* 加载文字 */}
          <div className="flex items-center gap-1">
            {['加', '载', '中', '.', '.', '.'].map((char, index) => (
              <motion.span
                key={index}
                className="text-sm text-muted-foreground"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 