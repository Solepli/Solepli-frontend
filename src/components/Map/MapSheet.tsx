/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import ReloadMarkerButton from '../BottomSheet/ReloadMarkerButton';
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
import { usePlaceStore } from '../../store/placeStore';

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
    filters,
    searchByCategory,
    markerInfos,
    markerIdList,
    setMarkerIdList,
    newMarkerObjectList,
    setNewMarkerObjectList,
    prevMarkerObjectList,
  } = useMarkerStore(
    useShallow((state) => ({
      filters: state.filters,
      searchByCategory: state.searchByCategory,
      markerInfos: state.markerInfos,
      markerIdList: state.markerIdList,
      setMarkerIdList: state.setMarkerIdList,
      newMarkerObjectList: state.newMarkerObjectList,
      setNewMarkerObjectList: state.setNewMarkerObjectList,
      prevMarkerObjectList: state.prevMarkerObjectList,
    }))
  );

  const { selectedCategory } = usePlaceStore();

  /* [useLayoutEffect] 지도 생성 및 초기 마커 추가 */
  useLayoutEffect(() => {
    if (!mapElement.current) return;

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

    const idleEventListener = naver.maps.Event.addListener(map, 'idle', () => {
      const idleBounds = map.getBounds();
      const idleZoom = map.getZoom();
      setLastBounds(idleBounds);
      setLastZoom(idleZoom);
    });

    // todo : lastBounds가 없어서 초기 마커 추가 안되고 있음
    if (newMarkerObjectList === null) {
      searchByCategory(null);
    }

    return () => {
      naver.maps.Event.removeListener(idleEventListener);
      map.destroy();
    };
  }, []);

  /* [useEffect] markerInfos 변경될 때 */
  useEffect(() => {
    const result = createMarkerObjectList(markerInfos);
    const { objectList, idList } = result;
    setNewMarkerObjectList(objectList);
    setMarkerIdList(idList);
    if (filters.activeFilter === 'category') return;
    const newBounds = createMarkersBounds(objectList);
    if (!newBounds) return;

    mapInstance.current?.fitBounds(newBounds, {
      bottom: idList.length === 1 ? 3200 : 480,
      maxZoom: 16,
    });
  }, [markerInfos]);

  /* [useEffect] prevMarkerObjectList 변경될 때 */
  useEffect(() => {
    deleteMarkers(prevMarkerObjectList);
  }, [prevMarkerObjectList]);

  /* [useEffect] newMarkerObjectList 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current) return;
    addMarkers(mapInstance, newMarkerObjectList, true, markerIdList, navigate);
  }, [newMarkerObjectList]);

  /* 현재 지도 화면을 기준으로 마커 재검색 함수 */
  const { increaseRefreshTrigger } = usePlaceStore();
  const researchMarker = useCallback(async () => {
    if (!mapInstance.current || !lastBounds) return;

    searchByCategory(null);

    // preview list 재검색을 위해 increase refresh
    increaseRefreshTrigger();

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
