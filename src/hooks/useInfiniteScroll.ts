import { useEffect } from "react";

export function useInfiniteScroll(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) callback();
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );
    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref, isActive, callback]);
}
