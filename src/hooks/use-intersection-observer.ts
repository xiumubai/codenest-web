import { RefObject, useEffect } from "react";

interface UseIntersectionObserverProps {
  target: RefObject<Element>;
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  target,
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target.current);
    return () => observer.disconnect();
  }, [enabled, onIntersect, root, rootMargin, target, threshold]);
} 