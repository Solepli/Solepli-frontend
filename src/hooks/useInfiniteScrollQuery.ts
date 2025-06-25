import { useEffect, useRef } from 'react';

interface useInfiniteScrollOptions {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  rootMargin?: string;
};


// 스크롤을 끝까지 했는지 감지 -> 다음 페이지 자동 Fetch 도와줌
export const useScrollSentinel = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  rootMargin = '100px',
}: useInfiniteScrollOptions) => {
  // 감시할 요소
  // sentinelRef가 화면에 보인다 = 끝까지 스크롤 했다
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          // sentinel이 화면에 보임 & 다음 페이지 있음 -> 다음 페이지 fetch
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return sentinelRef;
};
