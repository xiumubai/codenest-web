import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface EmptyProps {
  title?: string;
  description?: string;
}

const Empty: FC<EmptyProps> = ({ 
  title = '暂无数据',
  description = '这里空空如也，什么都没有~' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* 空状态图标 */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src="/empty.svg"
            alt="Empty State"
            fill
            className="w-full h-full"
            priority
          />
        </div>

        {/* 标题和描述 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Empty; 