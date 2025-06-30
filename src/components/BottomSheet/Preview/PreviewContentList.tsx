import React, { act, useEffect } from 'react';
import PreviewContent from './PreviewContent';
import { usePlaceStore } from '../../../store/placeStore';
import { useMapStore } from '../../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchStore } from '../../../store/searchStore';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getPlaceByIdList,
  getPlacesByDisplay,
  getPlacesByRegion,
} from '../../../api/placeApi';
import PreviewContentEmpty from './PreviewContentEmpty';
import { useScrollSentinel } from '../../../hooks/useInfiniteScrollQuery';

const PreviewContentList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get('queryType');

  const { filteredPlaces, selectedCategory, setPlaces, refreshTrigger } = usePlaceStore();

  const { userLatLng, lastBounds } = useMapStore(
    useShallow((state) => ({
      userLatLng: state.userLatLng,
      lastBounds: state.lastBounds,
    }))
  );

  const { selectedRegion, relatedPlaceIdList } = useSearchStore(
    useShallow((state) => ({
      selectedRegion: state.selectedRegion,
      relatedPlaceIdList: state.relatedPlaceIdList,
    }))
  );

  // 무한 스크롤 적용

  const placesRegionQuery = useInfiniteQuery({
    queryKey: ['placesRegion', selectedCategory, refreshTrigger],
    queryFn: ({ pageParam = {cursorId:undefined, cursorDist:undefined} }) =>
      getPlacesByRegion(
        selectedRegion,
        userLatLng!.lat,
        userLatLng!.lng,
        undefined,
        pageParam.cursorId,
        pageParam.cursorDist,
        undefined
      ),
    enabled: queryType === 'region',
    getNextPageParam: (lastPage) => {
       if (!lastPage?.nextCursor) return undefined;
      return {
        cursorId: lastPage.nextCursor,
        cursorDist: lastPage.nextCursorDist,
      };
    },
    initialPageParam: {cursorId:undefined, cursorDist:undefined},
  });

const placesIdListQuery = useInfiniteQuery({
  queryKey: ['placesIdList', selectedCategory, refreshTrigger],
  queryFn: ({ pageParam = undefined }) =>
    getPlaceByIdList(relatedPlaceIdList, pageParam),
  enabled: queryType === 'idList',
  getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
  },
    initialPageParam: undefined,
});

  const placesDisplayQuery = useInfiniteQuery({
    queryKey: ['placesDisplay', selectedCategory, refreshTrigger],
    queryFn: ({ pageParam = {cursorId:undefined, cursorDist:undefined} }) =>
      getPlacesByDisplay(
        lastBounds!.getMin().y,
        lastBounds!.getMin().x,
        lastBounds!.getMax().y,
        lastBounds!.getMax().x,
        userLatLng!.lat,
        userLatLng!.lng,
        selectedCategory ?? undefined,
        pageParam.cursorId,
        pageParam.cursorDist,
        undefined
      ),
    enabled: queryType === 'category',
    getNextPageParam: (lastPage) => {
       if (!lastPage?.nextCursor) return undefined;
      return {
        cursorId: lastPage.nextCursor,
        cursorDist: lastPage.nextCursorDist,
      };
    },
    initialPageParam: {cursorId:undefined, cursorDist:undefined},
  });


  const activeQuery =
    queryType === 'region'
    ? placesRegionQuery
    : queryType === 'idList'
    ? placesIdListQuery
    : queryType === 'category'
    ? placesDisplayQuery
    : null;

  // 스크롤 끝까지 했는지 sentinel 감시
  const sentinelRef = useScrollSentinel({
    hasNextPage: activeQuery?.hasNextPage ?? false,
    fetchNextPage: activeQuery?.fetchNextPage ?? (() => {}),
    isFetchingNextPage: activeQuery?.isFetchingNextPage ?? false,
  });

  // complete api: 지역 이름으로 프리뷰 리스트 호출 api
  // useEffect(() => {
  //   if (placesRegionQuery.data) {
  //     console.log('places[Region]Query:', placesRegionQuery);
  //     // setPlaces(placesRegionQuery);
  //   }
  // }, [placesRegionQuery.data, setPlaces]);

  // // complete api: 검색창에서 enter시 연관검색어에서 추출한 장소 id 리스트로 프리뷰 리스트 호출 api
  // useEffect(() => {
  //   if (placesIdListQuery.data) {
  //     console.log('places[IdList]Query:', placesIdListQuery);
  //     // setPlaces(placesIdListQuery.data.places);
  //   }
  // }, [placesIdListQuery.data, setPlaces]);

  // // complete api: 카테고리 선택시 현재 화면 기준으로 프리뷰 리스트 호출 api
  // useEffect(() => {
  //   if (placesDisplayQuery.data) {
  //     console.log('places[Display]Query:', placesDisplayQuery);
  //     // setPlaces(placesDisplayQuery);
  //   }
  // }, [placesDisplayQuery.data, setPlaces]);


  useEffect(()=>{
    if (!activeQuery?.data) return;
    console.log(activeQuery.data.pages);
    const places = activeQuery.data.pages.flatMap((page)=>page.places);
    setPlaces(places);
  },[activeQuery?.data, setPlaces]);

  // const isLoading =  (queryType === 'region' && placesRegionQuery.isLoading) ||
  // (queryType === 'idList' && placesIdListQuery.isLoading) ||
  // (queryType === 'category' && placesDisplayQuery.isLoading);

  if(activeQuery?.isLoading){
    return <div>로딩</div>
  }

  return (
    <div>
      <div>
        {filteredPlaces.map((place) => (
          <PreviewContent key={place.id} place={place} />
        ))}

        {filteredPlaces.length == 0 && <PreviewContentEmpty />}
        <div ref={sentinelRef}></div>
      </div>
    </div>
  );
};

export default PreviewContentList;
