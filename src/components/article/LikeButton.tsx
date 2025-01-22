import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LikeButtonProps {
  initialCount?: number;
  initialLiked?: boolean;
  onLike?: (liked: boolean) => void;
}

export function LikeButton({ initialCount = 0, initialLiked = false, onLike }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(!isLiked);
  };

  return (
    <button 
      className="group flex flex-col items-center gap-2"
      onClick={handleLike}
    >
      <motion.div 
        className={`w-12 h-12 rounded-full flex items-center justify-center relative border-2 transition-colors ${
          isLiked 
            ? 'bg-primary/15 border-primary/50' 
            : 'border-border group-hover:border-primary/30 group-hover:bg-primary/5'
        }`}
        whileHover={{ 
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={isLiked ? {
            scale: [1, 1.3, 1],
            transition: { duration: 0.3 }
          } : {
            scale: 1
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`transition-colors ${isLiked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </motion.div>
        <AnimatePresence>
          {isLiked && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full rounded-full bg-primary/10" />
            </motion.div>
          )}
          {isLiked && (
            <motion.div
              className="absolute -top-2 -right-1 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{ duration: 0.8, times: [0, 0.2, 1] }}
            >
              <div className="text-sm text-primary font-semibold bg-primary/10 px-1.5 rounded-full">
                +1
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.span 
        className={`text-sm font-medium ${
          isLiked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
        }`}
        animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {likeCount}
      </motion.span>
    </button>
  );
} 