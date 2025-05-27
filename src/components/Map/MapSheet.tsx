/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesNearby } from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { MarkersInfoType } from '../../types';
import { useMarkersStore } from '../../store/markersStore';
import { initCluster } from '../../utils/clusterManager';
import { IconMarkerMap } from '../../utils/icon';
import { getCurrentBounds, getUserLatLng, initMap } from '../../utils/mapFunc';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const boundsRef = useRef<naver.maps.LatLngBounds>(null);

  const { currentLatLng, setCurrentLatLng } = useMapStore(
    useShallow((state) => ({
      currentLatLng: state.currentLatLng,
      setCurrentLatLng: state.setCurrentLatLng,
    }))
  );

  const {
    markersInfo,
    setMarkersInfo,
    markersObject,
    setMarkersObject,
    clearMarkersObject,
  } = useMarkersStore(
    useShallow((state) => ({
      markersInfo: state.markersInfo,
      setMarkersInfo: state.setMarkersInfo,
      markersObject: state.markersObject,
      setMarkersObject: state.setMarkersObject,
      clearMarkersObject: state.clearMarkersObject,
    }))
  );

  const { data, error, isError } = useQuery({
    queryKey: ['placesNearby', currentLatLng],
    queryFn: () =>
      fetchPlacesNearby(
        currentLatLng!.swX,
        currentLatLng!.swY,
        currentLatLng!.neX,
        currentLatLng!.neY
      ),
  });

  if (isError) {
    console.log('fetchPlacesNearby isError :::', error);
  }

  useLayoutEffect(() => {
    if (!mapElement.current) return;

    getUserLatLng().then((userLatLng) => {
      initMap(mapElement, mapInstance, userLatLng);
      getCurrentBounds(mapInstance.current, setCurrentLatLng);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMarkersInfo(data);
    }
  }, [data, setMarkersInfo]);

  useEffect(() => {
    console.log('mapMarkers :::', markersInfo);
    if (markersInfo.length > 0) {
      deleteMarkers();
      addMarkers();
    }
  }, [markersInfo]);

  const addMarkers = () => {
    if (!mapInstance.current) return;

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    boundsRef.current = bounds;

    markersInfo.map((place: MarkersInfoType) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);

      const marker = new naver.maps.Marker({
        position: position,
        icon: {
          url: IconMarkerMap[place.category],
        },
      });
      marker.setMap(mapInstance.current);
      setMarkersObject(marker);

      // 마커 클릭시 지정한 좌표와 줌 레벨을 사용하는 새로운 위치로 지도를 이동
      // 유사한 함수 : setCenter, panTo
      naver.maps.Event.addListener(marker, 'click', () => {
        mapInstance.current?.morph(position, 18, {
          duration: 1000,
          easing: 'easeOutCubic',
        });
      });
    });
    // const clustering = initCluster(markedMarkers, mapInstance.current);
    /*
     * todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
     * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
     */
  };

  const deleteMarkers = () => {
    if (markersObject.length === 0) return;

    boundsRef.current = null;
    markersObject.forEach((m) => {
      m.setMap(null);
    });
    clearMarkersObject();
  };

  // 임시 버튼: 표시된 마커 기준으로 지도 이동
  // const moveToMarkers = useCallback(() => {
  //   if (!mapInstance.current || !boundsRef.current) return;

  //   mapInstance.current.panToBounds(
  //     boundsRef.current,
  //     {
  //       duration: 1000,
  //       easing: 'easeOutCubic',
  //     },
  //     {
  //       top: 30,
  //       right: 30,
  //       bottom: 200,
  //       left: 30,
  //     }
  //   );
  // }, []);

  const moveToCurrentLocation = useCallback(() => {
    if (!mapInstance.current) {
      console.warn('mapInstance.current가 null입니다!');
      return;
    }

    getUserLatLng().then((userLatLng) => {
      mapInstance.current?.panTo(userLatLng);
    });
  }, []);

  return (
    <div className='relative w-dvw h-dvh'>
      <div ref={mapElement} className='w-full h-full' />

      <button
        onClick={() => getCurrentBounds(mapInstance.current!, setCurrentLatLng)}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow px-4 py-2 rounded text-sm z-10'>
        getCurrentBounds
      </button>

      {/* 임시 버튼: 표시된 마커 기준으로 지도 이동*/}
      {/* <button
        onClick={moveToMarkers}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow px-4 py-2 rounded text-sm z-10'>
        표시된 마커로 지도 이동
      </button> */}

      <CurrentLocationButton handleClick={moveToCurrentLocation} />
    </div>
  );
};

export default MapSheet;
