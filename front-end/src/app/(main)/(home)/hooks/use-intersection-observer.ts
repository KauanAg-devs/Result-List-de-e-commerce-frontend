import { useEffect } from "react";

export const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLDivElement>,
  lazy: boolean,
  setIsVisible: (visible: boolean) => void,
  setIsLoaded: (loaded: boolean) => void
) => {
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setIsLoaded(true), 300);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [lazy, elementRef, setIsVisible, setIsLoaded]);
};
