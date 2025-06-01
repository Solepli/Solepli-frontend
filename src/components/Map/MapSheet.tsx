/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import ReloadMarkerButton from '../BottomSheet/ReloadMarkerButton';
import { useQuery } from '@tanstack/react-query';
import { getDisplayMarkers } from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import { useShallow } from 'zustand/shallow';
import { useMarkersStore } from '../../store/markersStore';
import { MarkersInfoType } from '../../types';
import { IconMarkerMap } from '../../utils/icon';

const getUserLatLng = async (): Promise<naver.maps.LatLng> => {
  try {
    // const position = await new Promise<GeolocationPosition>((res, rej) => {
    //   navigator.geolocation.getCurrentPosition(res, rej);
    // });
    // return new naver.maps.LatLng(position.coords.latitude, position.coords.latitude);
    // 사용자의 현재 좌표를 서울 지역으로 하드코딩
    return new naver.maps.LatLng(37.51234, 127.060395);
  } catch {
    return new naver.maps.LatLng(37.5666805, 126.9784147); // 기본 좌표 (서울 시청)
  }
};

const getDisplayBounds = (
  InstanceCurrent: naver.maps.Map | null
): naver.maps.Bounds => {
  const bounds: naver.maps.Bounds = InstanceCurrent!.getBounds();
  return bounds;
};

const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  center: naver.maps.LatLng
) => {
  if (!divRef.current) {
    console.warn('ElementCurrent(mapElement.current)가 null입니다!');
    return;
  }

  const MapOptions = {
    center,
    zoom: 13,
    gl: true,
    customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
  };
  const map = new naver.maps.Map(divRef.current!, MapOptions);
  mapRef.current = map;
  return map;
};

const addMarkers = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  markerObjectList: naver.maps.Marker[]
) => {
  if (!mapRef.current) return;
  // const bounds = new naver.maps.LatLngBounds(
  //   new naver.maps.LatLng(0, 0),
  //   new naver.maps.LatLng(0, 0)
  // );
  // boundsRef.current = bounds;

  markerObjectList.map((m: naver.maps.Marker) => {
    // 마커 객체를 지도 객체에 설정
    m.setMap(mapRef.current);

    // 마커 클릭시 지정한 좌표와 줌 레벨을 사용하는 새로운 위치로 지도를 이동 (유사한 함수 : setCenter, panTo)
    naver.maps.Event.addListener(m, 'click', () => {
      mapRef.current?.morph(m.getPosition(), 18, {
        duration: 1000,
        easing: 'easeOutCubic',
      });
    });
  });

  // const clustering = initCluster(markerObjectList, mapRef.current!);
  /*
   * todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
   * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
   */
};

const deleteMarkers = (
  markerObjectList: naver.maps.Marker[]
  // clearMarkerObjectList: () => void
) => {
  if (markerObjectList.length > 0) {
    // boundsRef.current = null;
    markerObjectList.forEach((m) => {
      m.setMap(null);
    });
    // clearMarkerObjectList();
  }
};

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

const MapSheet = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const boundsRef = useRef<naver.maps.LatLngBounds>(null);

  const { diplayLatLng, setDisplayLatLng } = useMapStore(
    useShallow((state) => ({
      diplayLatLng: state.diplayLatLng,
      setDisplayLatLng: state.setDisplayLatLng,
    }))
  );

  const { markerObjectList, setMarkerObjectList } = useMarkersStore(
    useShallow((state) => ({
      markerObjectList: state.markerObjectList,
      setMarkerObjectList: state.setMarkerObjectList,
    }))
  );

  const { data, error, isError } = useQuery({
    queryKey: ['displayMarkers', diplayLatLng],
    queryFn: () =>
      getDisplayMarkers(
        diplayLatLng!.swX,
        diplayLatLng!.swY,
        diplayLatLng!.neX,
        diplayLatLng!.neY
      ),
  });

  if (isError) {
    console.log('fetchPlacesNearby isError :::', error);
  }

  useLayoutEffect(() => {
    if (!mapElement.current) return;

    getUserLatLng().then((userLatLng) => {
      initMap(mapElement, mapInstance, userLatLng);
      const bounds = getDisplayBounds(mapInstance.current);
      setDisplayLatLng({
        swY: bounds.minY(),
        swX: bounds.minX(),
        neY: bounds.maxY(),
        neX: bounds.maxX(),
      });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = useMarkersStore.subscribe(
      (state) => state.markerObjectList,
      (current, prev) => {
        console.log('current :::', current);
        if (current.length > 0) {
          console.log('prev :::', prev);
          deleteMarkers(prev);
          addMarkers(mapInstance, current);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (data) {
      const markerList: naver.maps.Marker[] = [];
      data.map((place: MarkersInfoType) => {
        const position = new naver.maps.LatLng(place.latitude, place.longitude);
        const icon = IconMarkerMap[place.category];
        const marker = new naver.maps.Marker({
          position: position,
          icon: {
            url: icon,
          },
        });
        markerList.push(marker);
      });
      setMarkerObjectList(markerList);
    }
  }, [data]);

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

  const resetCurrentDisplayBounds = useCallback(() => {
    const bounds = getDisplayBounds(mapInstance.current!);
    setDisplayLatLng({
      swY: bounds.minY(),
      swX: bounds.minX(),
      neY: bounds.maxY(),
      neX: bounds.maxX(),
    });
  }, []);

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

      {/* 임시 버튼: 표시된 마커 기준으로 지도 이동*/}
      {/* <button
        onClick={moveToMarkers}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow px-4 py-2 rounded text-sm z-10'>
        표시된 마커로 지도 이동
      </button> */}

      <ReloadMarkerButton handleClick={resetCurrentDisplayBounds} />

      <CurrentLocationButton handleClick={moveToCurrentLocation} />
    </div>
  );
};

export default MapSheet;
