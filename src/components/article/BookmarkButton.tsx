import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkButtonProps {
  initialCount?: number;
  initialBookmarked?: boolean;
  onBookmark?: (bookmarked: boolean) => void;
}

export function BookmarkButton({ initialCount = 0, initialBookmarked = false, onBookmark }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(initialCount);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);
    onBookmark?.(!isBookmarked);
  };

  return (
    <button 
      className="group flex flex-col items-center gap-2"
      onClick={handleBookmark}
    >
      <motion.div 
        className={`w-12 h-12 rounded-full flex items-center justify-center relative border-2 transition-colors ${
          isBookmarked 
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
          animate={isBookmarked ? {
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, -8, 8, 0],
            transition: { duration: 0.4 }
          } : {
            scale: 1,
            rotate: 0
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={isBookmarked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`transition-colors ${isBookmarked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </motion.div>
        <AnimatePresence>
          {isBookmarked && (
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
          {isBookmarked && (
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
          isBookmarked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
        }`}
        animate={{ 
          scale: isBookmarked ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {bookmarkCount}
      </motion.span>
    </button>
  );
} 