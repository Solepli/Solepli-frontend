/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import CurrentLocationButton from '../BottomSheet/CurrentLocationButton';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesNearby } from '../../api/mapApi';
import { useMapStore } from '../../store/mapStore';
import CafeMarker from '../../assets/category-icons/mapMarker/cafeMarker.svg?url';
import CultureMarker from '../../assets/category-icons/mapMarker/cultureMarker.svg?url';
import DrinkMarker from '../../assets/category-icons/mapMarker/drinkMarker.svg?url';
import EntertainmentMarker from '../../assets/category-icons/mapMarker/entertainmentMarker.svg?url';
import FoodMarker from '../../assets/category-icons/mapMarker/foodMarker.svg?url';
import ShopMarker from '../../assets/category-icons/mapMarker/shopMarker.svg?url';
import WalkMarker from '../../assets/category-icons/mapMarker/walkMarker.svg?url';
import WorkMarker from '../../assets/category-icons/mapMarker/workMarker.svg?url';
import { initCluster } from '../../utils/clusterManager';
import { useShallow } from 'zustand/shallow';
import { mapMarkerType } from '../../types';
import { useMarkerStore } from '../../store/markerStore';

const markerIconMap: Record<string, string> = {
  food: FoodMarker,
  cafe: CafeMarker,
  drink: DrinkMarker,
  entertainment: EntertainmentMarker,
  culture: CultureMarker,
  shop: ShopMarker,
  walk: WalkMarker,
  work: WorkMarker,
};

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const boundsRef = useRef<naver.maps.LatLngBounds>(null);
  const markers = useRef<naver.maps.Marker[]>([]);

  const { currentLatLng, setCurrentLatLng } = useMapStore(
    useShallow((state) => ({
      currentLatLng: state.currentLatLng,
      setCurrentLatLng: state.setCurrentLatLng,
    }))
  );

  const { mapMarkers, setMapMarkers } = useMarkerStore(
    useShallow((state) => ({
      mapMarkers: state.mapMarkers,
      setMapMarkers: state.setMapMarkers,
    }))
  );

  const { data, error, isError } = useQuery({
    queryKey: ['placesNearby'],
    queryFn: () =>
      fetchPlacesNearby(
        currentLatLng!.swX,
        currentLatLng!.swY,
        currentLatLng!.neX,
        currentLatLng!.neY
      ),
    enabled: currentLatLng !== undefined,
  });

  if (isError) {
    console.log('fetchPlacesNearby isError :::', error);
  }

  const defaultCenter = new naver.maps.LatLng(37.5666805, 126.9784147); // 기본 좌표 (서울 시청)
  let currentLocation: naver.maps.LatLng; // 사용자의 현재 좌표

  useEffect(() => {
    if (data) {
      setMapMarkers(data);
    }
  }, [data, setMapMarkers]);

  useEffect(() => {
    console.log('mapMarkers :::', mapMarkers);
    if (mapMarkers.length > 0) {
      addMarkers();
    }
  }, [mapMarkers]);

  useEffect(() => {
    if (!mapElement.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation = new naver.maps.LatLng(
          // position.coords.latitude,
          // position.coords.longitude
          // 지도 화면 내 마커 정보를 받기 위해 사용자의 현재 좌표를 서울 지역으로 하드코딩
          37.51234,
          127.060395
        );
        initMap(currentLocation);
      },
      () => {
        initMap(defaultCenter);
      }
    );
  }, []);

  const initMap = (center: naver.maps.LatLng) => {
    const MapOptions = {
      center,
      zoom: 13,
      gl: true,
      customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
    };
    const map = new naver.maps.Map(mapElement.current!, MapOptions);
    mapInstance.current = map;

    getCurrentBounds(map);
  };

  const getCurrentBounds = (map: naver.maps.Map) => {
    const bounds: naver.maps.Bounds = map.getBounds();
    setCurrentLatLng({
      swY: bounds.minY(),
      swX: bounds.minX(),
      neY: bounds.maxY(),
      neX: bounds.maxX(),
    });
  };

  const addMarkers = () => {
    if (!mapInstance.current) return;

    // 기존 마커 삭제
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    boundsRef.current = bounds;

    markers.current = mapMarkers.map((place: mapMarkerType) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);

      const marker = new naver.maps.Marker({
        position: position,
        map: mapInstance.current || undefined,
        icon: {
          url: markerIconMap[place.category],
        },
      });

      // 마커 클릭시 지정한 좌표와 줌 레벨을 사용하는 새로운 위치로 지도를 이동
      // 유사한 함수 : setCenter, panTo
      naver.maps.Event.addListener(marker, 'click', () => {
        const adjustedPosition = new naver.maps.LatLng(
          position.lat(),
          position.lng()
        );
        mapInstance.current?.morph(adjustedPosition, 18, {
          duration: 1000,
          easing: 'easeOutCubic',
        });
      });

      return marker;
    });
    const clustering = initCluster(markers.current, mapInstance.current);
    /*
     * todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
     * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
     */
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
    if (!mapInstance.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        mapInstance.current?.panTo(currentLocation);
      },
      () => {
        mapInstance.current?.panTo(defaultCenter);
      }
    );
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

      <CurrentLocationButton handleClick={moveToCurrentLocation} />
    </div>
  );
};

export default MapSheet;
