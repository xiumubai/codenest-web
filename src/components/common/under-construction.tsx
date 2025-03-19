import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UnderConstructionProps {
  message?: string;
}

const UnderConstruction: FC<UnderConstructionProps> = ({ 
  message = '功能暂未开放，我们正在加紧开发中' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* 建设中图标 */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src="/construction.svg"
            alt="Under Construction"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 标题和描述 */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          {message}
          </h2>
        </div>

        {/* 加载动画 */}
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction; 