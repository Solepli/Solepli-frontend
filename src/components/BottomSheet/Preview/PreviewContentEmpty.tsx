import React, { useEffect } from 'react';
import PreviewContent from './PreviewContent';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMapStore } from '../../../store/mapStore';
import { getPlacesNearby } from '../../../api/placeApi';
import { useScrollSentinel } from '../../../hooks/useInfiniteScrollQuery';
import { usePlaceStore } from '../../../store/placeStore';

const PreviewContentEmpty: React.FC = () => {
  const { recommendedPlaces, setRecommendedPlaces } = usePlaceStore();
  const { userLatLng } = useMapStore();

  const placesNearbyQuery = useInfiniteQuery({
    queryKey: ['placesNearby', userLatLng],
    queryFn: ({ pageParam = { cursorId: undefined, cursorDist: undefined } }) =>
      getPlacesNearby(
        userLatLng!.lat,
        userLatLng!.lng,
        pageParam.cursorId,
        pageParam.cursorDist
      ),
    enabled: !!userLatLng,
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
      <div className='flex py-80 flex-col items-start'>
        <div className='flex px-16 flex-col justify-center items-center gap-4 self-stretch'>
          <p className='font-bold leading-[120%] tracking-[-0.4px] text-center text-primary-900'>
            검색 결과를 찾지 못 했어요
          </p>
          <p className='text-xs text-primary-900'>검색어를 다시 입력해주세요</p>
        </div>
      </div>

      {recommendedPlaces.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default PreviewContentEmpty;
