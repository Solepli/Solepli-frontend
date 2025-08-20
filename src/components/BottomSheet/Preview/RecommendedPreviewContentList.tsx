import React, { useEffect } from 'react';
import PreviewContent from './PreviewContent';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMapStore } from '../../../store/mapStore';
import { getPlacesNearby } from '../../../api/placeApi';
import { useScrollSentinel } from '../../../hooks/useInfiniteScrollQuery';
import { usePlaceStore } from '../../../store/placeStore';
import { getCenterFromBounds } from '../../../utils/getCenterFromBounds';

const RecommendedPreviewContentList: React.FC = () => {
  const { recommendedPlaces, setRecommendedPlaces } = usePlaceStore();
  const { lastBounds } = useMapStore();

  const placesNearbyQuery = useInfiniteQuery({
    queryKey: ['placesNearby'],
    queryFn: ({
      pageParam = { cursorId: undefined, cursorDist: undefined },
    }) => {
      const { centerY, centerX } = getCenterFromBounds(lastBounds!);
      return getPlacesNearby(
        centerY,
        centerX,
        pageParam.cursorId,
        pageParam.cursorDist
      );
    },
    enabled: !!lastBounds,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.nextCursor) return undefined;
      return {
        cursorId: lastPage.nextCursor,
        cursorDist: lastPage.nextCursorDist,
      };
    },
    initialPageParam: { cursorId: undefined, cursorDist: undefined },
  });

  const sentinelRef = useScrollSentinel({
    hasNextPage: placesNearbyQuery?.hasNextPage ?? false,
    fetchNextPage: placesNearbyQuery?.fetchNextPage ?? (() => {}),
    isFetchingNextPage: placesNearbyQuery?.isFetchingNextPage ?? false,
  });

  useEffect(() => {
    if (!placesNearbyQuery?.data) return;
    const places = placesNearbyQuery.data.pages.flatMap((page) => page.places);
    setRecommendedPlaces(places);
  }, [placesNearbyQuery?.data, setRecommendedPlaces]);

  return (
    <div>
      <div className='flex pt-0 px-16 pb-16 items-center gap-10 self-stretch'>
        <div className='flex-1 h-1 bg-primary-100' />
        <p className='text-sm font-bold leading-[120%] tracking-[-0.21px] text-primary-900 text-center'>
          이런 장소는 어떠세요?
        </p>
        <div className='flex-1 h-1 bg-primary-100' />
      </div>

      {recommendedPlaces.map((place) => (
        <PreviewContent key={place.id} place={place} />
      ))}

      <div ref={sentinelRef} />
    </div>
  );
};

export default RecommendedPreviewContentList;
