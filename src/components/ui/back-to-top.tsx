'use client';

import { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
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
}

export default function BackToTop({
  threshold = 300,
  containerSelector,
  position = { bottom: '5rem', right: '2rem' },
  className,
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: position.bottom,
            right: position.right,
          }}
          className={cn(
            "z-50 p-3 rounded-full",
            "bg-gradient-to-r from-primary/90 to-primary",
            "text-primary-foreground shadow-lg shadow-primary/20",
            "hover:shadow-primary/30 hover:from-primary hover:to-primary/90",
            "transition-all duration-300",
            "flex items-center justify-center",
            "relative group",
            className
          )}
          aria-label="回到顶部"
        >
          {/* 火箭尾部的火焰效果 */}
          <motion.div
            className="absolute -bottom-2 -z-10"
            initial={false}
            animate={{
              height: isScrolling ? [20, 30, 20] : 0,
              opacity: isScrolling ? [0.5, 1, 0.5] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: isScrolling ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-full mx-auto bg-gradient-to-b from-primary via-orange-400 to-transparent rounded-full blur-sm" />
          </motion.div>

          {/* 火箭图标 */}
          <motion.div
            animate={{ 
              y: isScrolling ? -3 : 0,
              rotate: isScrolling ? -45 : 0,
              transition: { 
                y: {
                  duration: 0.2,
                  repeat: isScrolling ? Infinity : 0,
                  repeatType: "reverse"
                },
                rotate: {
                  duration: 0.3,
                }
              }
            }}
            className="flex items-center justify-center"
          >
            <Rocket className="w-5 h-5" />
          </motion.div>

          {/* 悬浮提示 */}
          <span className="absolute -top-8 whitespace-nowrap text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            点击返回顶部
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 