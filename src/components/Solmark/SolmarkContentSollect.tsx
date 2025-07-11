import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchSolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import SolmarkNoResult from './SolmarkNoResult';
import { useSollectStore } from '../../store/sollectStore';
import { SollectPhotoType } from '../../types';
import { useScrollSentinel } from '../../hooks/useInfiniteScrollQuery';

const SolmarkContentSollect = () => {
  const { sollects, setSollects } = useSollectStore();

   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
     useInfiniteQuery({
       queryKey: ['solmarkSollects'],
       queryFn: ({ pageParam = undefined }) => fetchSolmarkSollect(pageParam),
       getNextPageParam: (lastPage) => {
         if (!lastPage?.cursorInfo) return undefined;
         return lastPage?.cursorInfo.nextCursorId;
       },
       initialPageParam: undefined,
     });

  useEffect(() => {
    // 데이터 합침
    const flattened =
      data?.pages.flatMap((page) =>
        page.contents.map((sollect: SollectPhotoType) => ({
          ...sollect,
          isMarked: true,
        }))
      ) ?? [];
    setSollects(flattened);
  }, [data, setSollects]);
  
  const sentinelRef = useScrollSentinel({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });



  return (
    <div className='py-16'>
      {sollects.length !== 0 ? (
        <div>
          <SollectList />
          <div ref={sentinelRef} style={{ height: '1px' }} />
        </div>
      ) : (
        <SolmarkNoResult type='sollect' />
      )}
    </div>
  );
};

export default SolmarkContentSollect;
