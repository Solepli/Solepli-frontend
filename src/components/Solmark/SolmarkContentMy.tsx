import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchMySolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import SolmarkNoResult from './SolmarkNoResult';
import { useSollectStore } from '../../store/sollectStore';
import { useScrollSentinel } from '../../hooks/useInfiniteScrollQuery';

const SolmarkContentMy = () => {
  const { sollects, setSollects } = useSollectStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['solmarkSollects'],
      queryFn: ({ pageParam = undefined }) => fetchMySolmarkSollect(pageParam),
      getNextPageParam: (lastPage) => {
        if (!lastPage?.cursorInfo) return undefined;
        return lastPage?.cursorInfo.nextCursorId;
      },
      initialPageParam: undefined,
    });

  useEffect(() => {
    // 데이터 합침
    const flattened = data?.pages.flatMap((page) => page.contents) ?? [];
    setSollects(flattened);
  }, [data, setSollects]);

  const sentinelRef = useScrollSentinel({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className='py-16'>
      {sollects.length != 0 ? (
        <div>
          <SollectList isMine />
          <div ref={sentinelRef} style={{ height: '1px' }} />
        </div>
      ) : (
        <SolmarkNoResult type='my' />
      )}
    </div>
  );
};

export default SolmarkContentMy;
