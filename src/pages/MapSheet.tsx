import React, { useCallback, useEffect, useRef } from 'react';
import CurrentLocationButton from '../components/BottomSheet/CurrentLocationButton';
import { useQuery } from '@tanstack/react-query';
import { fetchMockPlacesNearby } from '../api/mapApi';
import { useBoundsStore } from '../store/mapStore';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);
  const boundsRef = useRef<naver.maps.LatLngBounds | null>(null);

  const { valueLngLat, setLngLat } = useBoundsStore();

  // cors 문제로 주석처리
  // 문제 해결 전까지 mock 데이터는 fetchMockPlacesNearby로 가져옴.
  // const { data } = useQuery({
  //   queryKey: ['placesNearby'],
  //   queryFn: fetchPlaceNearby(
  //     valueLngLat!.swX,
  //     valueLngLat!.swY,
  //     valueLngLat!.neX,
  //     valueLngLat!.neY
  //   ),
  //   enabled: valueLngLat !== undefined,
  // });

  // Mock Data Api
  const { data } = useQuery({
    queryKey: ['placesNearby'],
    queryFn: fetchMockPlacesNearby,
  });

  const defaultCenter = new naver.maps.LatLng(37.5666805, 126.9784147); // 기본 좌표 (서울 시청)
  let currentLocation: naver.maps.LatLng; // 사용자의 현재 좌표

  useEffect(() => {
    if (!mapElement.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const map = new naver.maps.Map(mapElement.current!, {
      center,
      zoom: 16,
    });
    mapInstance.current = map;

    getCurrentBounds(map);

    addMarkers();
  };

  const getCurrentBounds = (map: naver.maps.Map) => {
    const bounds: naver.maps.Bounds = map.getBounds();
    setLngLat({
      swX: bounds.minX(),
      swY: bounds.minY(),
      neX: bounds.maxX(),
      neY: bounds.maxY(),
    });
  };

  const addMarkers = () => {
    if (!mapInstance.current) return;

    // 기존 마커 삭제
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];

    // 새로운 bounds 생성 및 초기화 (모든 마커를 포함하는 경계 박스)
    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    boundsRef.current = bounds;

    markers.current = data!.places.map((place) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);

      const marker = new naver.maps.Marker({
        position: position,
        map: mapInstance.current || undefined,
        title: place.category,
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
