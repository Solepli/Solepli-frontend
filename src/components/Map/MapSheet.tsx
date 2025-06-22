/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import ReloadMarkerButton from '../BottomSheet/ReloadMarkerButton';
import { getDisplayMarkers } from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useMarkerStore } from '../../store/markerStore';
import { getUserLocation } from '../../utils/geolocation';

import {
  createMarkerObjectList, // 마커를 객체로 생성 후 반환
} from '../../utils/mapFunc';

/* 지도 생성 */
const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  center: naver.maps.LatLng,
  isSearchBounds: boolean,
  lastBounds: naver.maps.Bounds | undefined,
  lastZoom: number
) => {
  if (!divRef.current) return;

  const MapOptions = {
    zoom: lastZoom || 16,
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
  objectList: naver.maps.Marker[] | null
) => {
  if (!mapRef.current || !objectList) return;

  objectList.forEach((m: naver.maps.Marker) => {
    // 지도에 마커 객체 설정
    m.setMap(mapRef.current);

    // 이벤트 리스너 (마커 클릭)
    naver.maps.Event.addListener(m, 'click', () => {
      mapRef.current?.morph(m.getPosition(), 18, {
        duration: 1000,
        easing: 'easeOutCubic',
      });
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
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  const {
    initCenter,
    isSearchBounds,
    setIsSearchBounds,
    lastBounds,
    setLastBounds,
    lastZoom,
    setLastZoom,
  } = useMapStore(
    useShallow((state) => ({
      initCenter: state.initCenter,
      setInitCenter: state.setInitCenter,
      isSearchBounds: state.isSearchBounds,
      setIsSearchBounds: state.setIsSearchBounds,
      lastBounds: state.lastBounds,
      setLastBounds: state.setLastBounds,
      lastZoom: state.lastZoom,
      setLastZoom: state.setLastZoom,
    }))
  );

  const { newMarkerObjectList, setNewMarkerObjectList, prevMarkerObjectList } =
    useMarkerStore(
      useShallow((state) => ({
        newMarkerObjectList: state.newMarkerObjectList,
        setNewMarkerObjectList: state.setNewMarkerObjectList,
        prevMarkerObjectList: state.prevMarkerObjectList,
        setPrevMarkerObjectList: state.setPrevMarkerObjectList,
      }))
    );

  useLayoutEffect(() => {
    if (!mapElement.current) return;

    // 지도 생성
    const center = new naver.maps.LatLng(initCenter.lat, initCenter.lng);
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

    // 추가할 마커 객체가 없으면 getDisplayMarkers api 호출
    if (!newMarkerObjectList) {
      getDisplayMarkers(
        newBounds.getMin().x,
        newBounds.getMin().y,
        newBounds.getMax().x,
        newBounds.getMax().y
      ).then((res) => {
        const newObjects = createMarkerObjectList(res);
        setNewMarkerObjectList(newObjects);
      });
    }

    return () => {
      naver.maps.Event.removeListener(idleEventListener);
      map.destroy();
    };
  }, []);

  // useEffect(() => {
  //   console.log('lastBounds:', lastBounds);
  //   console.log('getZoom:', mapInstance.current?.getZoom());
  // }, [lastBounds]);

  /* [useEffect] prevMarkerObjectList 변경될 때 */
  useEffect(() => {
    deleteMarkers(prevMarkerObjectList);
  }, [prevMarkerObjectList]);

  /* [useEffect] newMarkerObjectList 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current) return;

    // 지도에 마커 추가
    addMarkers(mapInstance, newMarkerObjectList);
  }, [newMarkerObjectList]);

  /* 현재 지도 화면을 기준으로 마커 재검색 함수 */
  const researchMarker = useCallback(async () => {
    if (!mapInstance.current) return;

    const currentBounds = mapInstance.current.getBounds();
    const data = await getDisplayMarkers(
      currentBounds.getMin().x,
      currentBounds.getMin().y,
      currentBounds.getMax().x,
      currentBounds.getMax().y
    );

    const newObjects = createMarkerObjectList(data);
    setNewMarkerObjectList(newObjects);
  }, []);

  /* 실시간 사용자 위치로 지도 이동 */
  const moveToUserLocation = useCallback(async () => {
    if (!mapInstance.current) return;

    const { lat, lng } = await getUserLocation();
    mapInstance.current.panTo(new naver.maps.LatLng(lat, lng));
  }, []);

  return (
    <div className='relative w-dvw h-dvh'>
      <div ref={mapElement} className='w-full h-full' />

      <ReloadMarkerButton handleClick={researchMarker} />
      <CurrentLocationButton handleClick={moveToUserLocation} />
    </div>
  );
};

export default MapSheet;
