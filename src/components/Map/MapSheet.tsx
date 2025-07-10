/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import ReloadMarkerButton from '../BottomSheet/ReloadMarkerButton';
import {
  getMarkersByDisplay,
  getMarkersByIdList,
  getMarkersByRegion,
} from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useMarkerStore } from '../../store/markerStore';
import {
  addMarkers, // 마커 추가 함수
  createMarkerObjectList, // 마커를 객체로 생성 후 반환
  createMarkersBounds, // 마커 객체 바운드 생성 후 반환 함수
  deleteMarkers, // 마커 제거 함수
  initMap, // 지도 생성
} from '../../utils/mapFunc';
import { useSearchStore } from '../../store/searchStore';
import { getPlaceDetail } from '../../api/placeApi';
import { usePlaceStore } from '../../store/placeStore';
import { useQuery } from '@tanstack/react-query';

/* // 클러스터 생성 함수
const initCluster = (markerArray: naver.maps.Marker[], map: naver.maps.Map) => {
  const markerClustering = new MarkerClustering({
    map: map,
    markers: markerArray,
    disableClickZoom: false,
    minClusterSize: 2,
    maxZoom: 20,
    gridSize: 120,
    icons: [
      {
        url: '/src/assets/cluster/defaultCluster.svg',
      },
    ],
    averageCenter: true,
  });

  return markerClustering;
};
*/

/* MapSheet.tsx */
const MapSheet = () => {
  const navigate = useNavigate();
  const { placeId } = useParams<{ placeId: string }>();
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get('queryType');
  const detailType = searchParams.get('detailType');

  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  const {
    userLatLng,
    isSearchBounds,
    setIsSearchBounds,
    lastBounds,
    setLastBounds,
    lastZoom,
    setLastZoom,
  } = useMapStore(
    useShallow((state) => ({
      userLatLng: state.userLatLng,
      isSearchBounds: state.isSearchBounds,
      setIsSearchBounds: state.setIsSearchBounds,
      lastBounds: state.lastBounds,
      setLastBounds: state.setLastBounds,
      lastZoom: state.lastZoom,
      setLastZoom: state.setLastZoom,
    }))
  );

  const {
    markerIdList,
    setMarkerIdList,
    newMarkerObjectList,
    setNewMarkerObjectList,
    prevMarkerObjectList,
  } = useMarkerStore(
    useShallow((state) => ({
      markerIdList: state.markerIdList,
      setMarkerIdList: state.setMarkerIdList,
      newMarkerObjectList: state.newMarkerObjectList,
      setNewMarkerObjectList: state.setNewMarkerObjectList,
      prevMarkerObjectList: state.prevMarkerObjectList,
      setPrevMarkerObjectList: state.setPrevMarkerObjectList,
    }))
  );

  const { selectedRegion, relatedPlaceIdList } = useSearchStore(
    useShallow((state) => ({
      selectedRegion: state.selectedRegion,
      relatedPlaceIdList: state.relatedPlaceIdList,
    }))
  );

  const { selectedCategory } = usePlaceStore();

  /* [useLayoutEffect] 지도 생성 및 초기 마커 추가 */
  useLayoutEffect(() => {
    if (!mapElement.current) return;

    // 지도 생성
    let center;
    if (userLatLng) {
      center = new naver.maps.LatLng(userLatLng.lat, userLatLng.lng);
    }
    const map = initMap(
      mapElement,
      mapInstance,
      true,
      isSearchBounds,
      lastBounds,
      lastZoom,
      center
    );

    if (!map) return;
    if (isSearchBounds) setIsSearchBounds(false);

    // 이벤트 리스너 추가
    const idleEventListener = naver.maps.Event.addListener(map, 'idle', () => {
      const idleBounds = map.getBounds();
      const idleZoom = map.getZoom();
      setLastBounds(idleBounds);
      setLastZoom(idleZoom);
    });

    const newBounds = map.getBounds();

    // 초기 마커 추가
    if (newMarkerObjectList === null) {
      getMarkersByDisplay(
        newBounds.getMin().y,
        newBounds.getMin().x,
        newBounds.getMax().y,
        newBounds.getMax().x
      ).then((res) => {
        const result = createMarkerObjectList(res);
        const { objectList, idList } = result;
        setNewMarkerObjectList(objectList);
        setMarkerIdList(idList);
      });
    }

    // // 초기 장소들
    // getPlacesByDisplay(
    //   newBounds!.getMin().y,
    //   newBounds!.getMin().x,
    //   newBounds!.getMax().y,
    //   newBounds!.getMax().x,
    //   userLatLng!.lat,
    //   userLatLng!.lng
    // ).then((res) => {
    //   console.log(res);
    //   setPlaces(res.places);
    // });

    return () => {
      naver.maps.Event.removeListener(idleEventListener);
      map.destroy();
    };
  }, []);

  /* [useEffect] queryType 값에 따른 마커 변경 */
  const { data: queryCategory } = useQuery({
    queryKey: ['queryCategory', selectedCategory],
    queryFn: () => {
      if (!lastBounds) return null;
      return getMarkersByDisplay(
        lastBounds.getMin().y,
        lastBounds.getMin().x,
        lastBounds.getMax().y,
        lastBounds.getMax().x,
        selectedCategory ?? undefined
      );
    },
    enabled: !!lastBounds && queryType === 'category',
  });
  const { data: queryRegion } = useQuery({
    queryKey: ['queryRegion', selectedRegion],
    queryFn: () => getMarkersByRegion(selectedRegion),
    enabled: !!selectedRegion && queryType === 'region',
  });
  const { data: queryIdList } = useQuery({
    queryKey: ['queryIdList', relatedPlaceIdList],
    queryFn: () => getMarkersByIdList(relatedPlaceIdList),
    enabled: !!relatedPlaceIdList && queryType === 'idList',
  });
  const { data: detailSearching } = useQuery({
    queryKey: ['detailSearching', placeId],
    queryFn: () => {
      if (!placeId) return null;
      return getPlaceDetail(parseInt(placeId));
    },
    enabled: !!placeId && detailType === 'searching',
  });

  useEffect(() => {
    if (queryType === 'category' && queryCategory) {
      // 카테고리 선택시 마커 표시
      // SolmarkChip에서 invalidateQueries 호출 시 queryCategory가 업데이트되어 마커 아이콘도 함께 업데이트됨
      const result = createMarkerObjectList(queryCategory);
      const { objectList, idList } = result;
      setNewMarkerObjectList(objectList);
      setMarkerIdList(idList);
    } else if (queryType === 'region' && queryRegion) {
      // 검색창에서 지역명 선택/enter시 마커 표시
      // SolmarkChip에서 invalidateQueries 호출 시 queryRegion이 업데이트되어 마커 아이콘도 함께 업데이트됨
      const result = createMarkerObjectList(queryRegion);
      applyMarkerResult(result);
    } else if (queryType === 'idList' && queryIdList) {
      // 검색창에서 장소 id 리스트 enter시 마커 표시
      // SolmarkChip에서 invalidateQueries 호출 시 queryIdList가 업데이트되어 마커 아이콘도 함께 업데이트됨
      const result = createMarkerObjectList(queryIdList);
      applyMarkerResult(result);
    } else if (detailType === 'searching' && detailSearching) {
      // 검색창에서 특정 장소 선택시 마커 표시
      // SolmarkChip에서 invalidateQueries 호출 시 detailSearching이 업데이트되어 마커 아이콘도 함께 업데이트됨
      const result = createMarkerObjectList([
        {
          id: detailSearching.place.id,
          category: detailSearching.place.category,
          latitude: detailSearching.place.latitude,
          longitude: detailSearching.place.longitude,
          isMarked: detailSearching.place.isMarked,
        },
      ]);
      applyMarkerResult(result);
    }
  }, [queryCategory, queryRegion, queryIdList, detailSearching]);

  const applyMarkerResult = (
    result: ReturnType<typeof createMarkerObjectList>
  ) => {
    const { objectList, idList } = result;
    setNewMarkerObjectList(objectList);
    setMarkerIdList(idList);

    const newBounds = createMarkersBounds(objectList);
    if (!newBounds) return;

    mapInstance.current?.fitBounds(newBounds, {
      bottom: idList.length === 1 ? 3200 : 480,
      maxZoom: 16,
    });
  };

  /* [useEffect] prevMarkerObjectList 변경될 때 */
  useEffect(() => {
    deleteMarkers(prevMarkerObjectList);
  }, [prevMarkerObjectList]);

  /* [useEffect] newMarkerObjectList 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current) return;

    // 지도에 마커 추가
    addMarkers(mapInstance, newMarkerObjectList, true, markerIdList, navigate);
  }, [newMarkerObjectList]);

  /* 현재 지도 화면을 기준으로 마커 재검색 함수 */
  const { increaseRefreshTrigger } = usePlaceStore();
  const researchMarker = useCallback(async () => {
    if (!mapInstance.current) return;

    console.log('selectedCategory:', selectedCategory);

    if (!lastBounds) {
      console.warn('lastBounds가 설정되지 않았습니다.');
      return;
    }

    const data = await getMarkersByDisplay(
      lastBounds.getMin().y,
      lastBounds.getMin().x,
      lastBounds.getMax().y,
      lastBounds.getMax().x,
      selectedCategory ?? undefined
    );

    // preview list 재검색을 위해 increase refresh
    increaseRefreshTrigger();

    const result = createMarkerObjectList(data);

    const { objectList, idList } = result;
    setNewMarkerObjectList(objectList);
    setMarkerIdList(idList);
    // setPlaces(preview.places);

    navigate('/map/list?queryType=category');
  }, [lastBounds, selectedCategory]);

  /* 실시간 사용자 위치로 지도 이동 */
  const moveToUserLocation = useCallback(async () => {
    if (!mapInstance.current) return;

    if (userLatLng == null) {
      alert('사용자의 현재 위치를 불러올 수 없습니다.');
      return;
    }

    mapInstance.current.panTo(
      new naver.maps.LatLng(userLatLng.lat, userLatLng.lng)
    );
  }, [userLatLng]);

  return (
    <div className='relative w-dvw h-dvh'>
      <div ref={mapElement} className='w-full h-full' />

      <ReloadMarkerButton handleClick={researchMarker} />
      <CurrentLocationButton handleClick={moveToUserLocation} />
    </div>
  );
};

export default MapSheet;
