'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  /** 触发显示的滚动距离，默认 300 */
  threshold?: number;
  /** 自定义容器的选择器，如果不提供则监听 window */
  containerSelector?: string;
  /** 自定义位置样式 */
  position?: {
    bottom?: number | string;
    right?: number | string;
  };
  /** 自定义按钮样式 */
  className?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
}

export default function BackToTop({
  threshold = 300,
  containerSelector,
  position = { bottom: '2rem', right: '2rem' },
  className,
  icon = <ArrowUp className="w-4 h-4" />,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    
    const toggleVisibility = () => {
      
      // 如果指定了容器，则监听容器的滚动
      if (containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        setIsVisible(container.scrollTop > threshold);
        return;
      }

      // 否则监听整个页面的滚动
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    };

    // 初始检查
    toggleVisibility();

    // 如果指定了容器，监听容器的滚动
    if (containerSelector) {
      const container = document.querySelector(containerSelector);
      if (container) {
        container.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => container.removeEventListener('scroll', toggleVisibility);
      }
    }

    // 否则监听 window 的滚动
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    
    if (containerSelector) {
      const container = document.querySelector(containerSelector);
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // 监听滚动结束
        const checkScrollEnd = () => {
          if (container.scrollTop === 0) {
            setIsScrolling(false);
            container.removeEventListener('scroll', checkScrollEnd);
          }
        };
        container.addEventListener('scroll', checkScrollEnd);
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // 监听滚动结束
    const checkScrollEnd = () => {
      if (window.scrollY === 0) {
        setIsScrolling(false);
        window.removeEventListener('scroll', checkScrollEnd);
      }
    };
    window.addEventListener('scroll', checkScrollEnd);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: position.bottom,
            right: position.right,
          }}
          className={cn(
            "z-50 p-3 rounded-full",
            "bg-gradient-to-r from-purple-500 to-pink-500",
            "text-white shadow-lg backdrop-blur-sm",
            "hover:shadow-xl transition-all duration-300",
            "border border-white/10",
            "flex items-center justify-center",
            "group",
            className
          )}
          aria-label="回到顶部"
        >
          <motion.span
            animate={{ 
              y: isScrolling ? -3 : 0,
              transition: { 
                duration: 0.2,
                repeat: isScrolling ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
            className="flex items-center justify-center"
          >
            {icon}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 