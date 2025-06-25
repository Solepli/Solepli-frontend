/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {
  NavigateFunction,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
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
  createMarkerObjectList, // 마커를 객체로 생성 후 반환
  createMarkersBounds,
} from '../../utils/mapFunc';
import { useSearchStore } from '../../store/searchStore';
import { getPlaceDetail } from '../../api/placeApi';
import { usePlaceStore } from '../../store/placeStore';

/* 지도 생성 */
const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  center: naver.maps.LatLng | null,
  isSearchBounds: boolean,
  lastBounds: naver.maps.Bounds | undefined,
  lastZoom: number
) => {
  if (!divRef.current) return;

  const MapOptions = {
    zoom: lastZoom,
    center: lastBounds?.getCenter() || center,
    gl: true,
    customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
    scaleControl: false,
    mapDataControl: false,
    logoControl: false,
    keyboardShortcuts: false,
    disableKineticPan: false,
  } as naver.maps.MapOptions & {
    bounds?: naver.maps.Bounds;
  };

  // 조건부로 bounds 추가 (center, zoom 무시)
  if (isSearchBounds && lastBounds) {
    MapOptions.bounds = lastBounds;
  }

  // divRef에 지도를 생성
  const map = new naver.maps.Map(divRef.current!, MapOptions);
  // mapRef에 객체 지정
  mapRef.current = map;

  return map;
};

/* 마커 추가 함수 */
const addMarkers = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  objectList: naver.maps.Marker[] | null,
  markerIdList: number[] | null,
  navigate: NavigateFunction
) => {
  if (!mapRef.current || !objectList || !markerIdList) return;

  objectList.forEach((m: naver.maps.Marker, index: number) => {
    // 지도에 마커 객체 설정
    m.setMap(mapRef.current);

    // 이벤트 리스너 (마커 클릭)
    naver.maps.Event.addListener(m, 'click', () => {
      mapRef.current?.morph(m.getPosition(), 18, {
        duration: 1000,
        easing: 'easeOutCubic',
      });

      const isSame = window.location.pathname.includes(
        `/map/detail/${markerIdList[index]}`
      );

      if (!isSame) {
        navigate(`/map/detail/${markerIdList[index]}`);
      }
    });
  });

  // const clustering = initCluster(markerObjectList, mapRef.current!);
  /* todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
   * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
   */
};

/* 마커 제거 함수 */
const deleteMarkers = (objectList: naver.maps.Marker[] | null) => {
  if (!objectList) return;

  objectList.forEach((m) => {
    m.setMap(null);
  });
};

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
    let center = null;
    if (userLatLng) {
      center = new naver.maps.LatLng(userLatLng.lat, userLatLng.lng);
    }
    const map = initMap(
      mapElement,
      mapInstance,
      center,
      isSearchBounds,
      lastBounds,
      lastZoom
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

    return () => {
      naver.maps.Event.removeListener(idleEventListener);
      map.destroy();
    };
  }, []);

  /* [useEffect] queryType 값에 따른 마커 변경 */
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        if (queryType === 'category') {
          // 카테고리 선택시 마커 표시
          const newInfo = await getMarkersByDisplay(
            lastBounds!.getMin().y,
            lastBounds!.getMin().x,
            lastBounds!.getMax().y,
            lastBounds!.getMax().x,
            selectedCategory ?? undefined
          );
          const result = createMarkerObjectList(newInfo);
          const { objectList, idList } = result;
          setNewMarkerObjectList(objectList);
          setMarkerIdList(idList);
        } else if (queryType === 'region' && selectedRegion) {
          // 검색창에서 지역명 선택/enter시 마커 표시
          const newInfo = await getMarkersByRegion(selectedRegion);
          const result = createMarkerObjectList(newInfo);
          applyMarkerResult(result);
        } else if (queryType === 'idList' && relatedPlaceIdList) {
          // 검색창에서 장소 id 리스트 enter시 마커 표시
          const newInfo = await getMarkersByIdList(relatedPlaceIdList);
          const result = createMarkerObjectList(newInfo);
          applyMarkerResult(result);
        } else if (detailType === 'searching' && placeId) {
          // 검색창에서 특정 장소 선택시 마커 표시
          const placeDetail = await getPlaceDetail(parseInt(placeId));
          const result = createMarkerObjectList([
            {
              id: placeDetail.place.id,
              category: placeDetail.place.category,
              latitude: placeDetail.place.latitude,
              longitude: placeDetail.place.longitude,
            },
          ]);
          applyMarkerResult(result);
        }
      } catch (error) {
        console.error('마커를 불러오는 중 오류 발생:', error);
      }
    };

    fetchMarkers();
  }, [queryType, selectedCategory, selectedRegion, detailType, placeId]);

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
    addMarkers(mapInstance, newMarkerObjectList, markerIdList, navigate);
  }, [newMarkerObjectList]);

  /* 현재 지도 화면을 기준으로 마커 재검색 함수 */
  const researchMarker = useCallback(async () => {
    if (!mapInstance.current) return;

    console.log('selectedCategory:', selectedCategory);

    const data = await getMarkersByDisplay(
      lastBounds!.getMin().y,
      lastBounds!.getMin().x,
      lastBounds!.getMax().y,
      lastBounds!.getMax().x,
      selectedCategory ?? undefined
    );

    const result = createMarkerObjectList(data);
    const { objectList, idList } = result;
    setNewMarkerObjectList(objectList);
    setMarkerIdList(idList);

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
