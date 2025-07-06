import { useEffect } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRelatedSollect } from '../api/sollectApi';
import SollectList from '../components/Sollect/SollectList';
import { useSollectStore } from '../store/sollectStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useScrollSentinel } from '../hooks/useInfiniteScrollQuery';

const RelatedSollect = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();

  const { setSollects } = useSollectStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['relatedSollect', placeId],
      queryFn: ({ pageParam = undefined }) =>
        fetchRelatedSollect(Number(placeId), pageParam),
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
    <div>
      <TitleHeader title='관련 쏠렉트' onClick={() => navigate(-1)} />

      <SollectList customStyle='pt-58' />
      <div ref={sentinelRef} style={{ height: '1px' }} />
    </div>
  );
};

export default RelatedSollect;
