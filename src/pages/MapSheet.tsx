import React, { useEffect, useRef } from 'react';
import { places } from '../places';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);
  const boundsRef = useRef<naver.maps.LatLngBounds | null>(null);

  const defaultCenter = new naver.maps.LatLng(37.5666805, 126.9784147); // 기본 좌표 (서울 시청)
  let currentLocation: naver.maps.LatLng; // 사용자의 현재 좌표

  useEffect(() => {
    if (!mapElement.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        initMap(currentLocation);
      },
      () => {
        initMap(defaultCenter);
      }
    );
  }, []);

  // 지도 초기화 함수
  const initMap = (center: naver.maps.LatLng) => {
    const map = new naver.maps.Map(mapElement.current!, {
      center,
      zoom: 16,
    });
    mapInstance.current = map;

    // 지도 초기화 후 마커 추가
    addMarkers();
  };

  const addMarkers = () => {
    if (!mapInstance.current) return;

    // 기존 마커 삭제
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];

    // 새로운 bounds 생성 및 초기화 (모든 마커를 포함하는 경계 박스)
    const bounds = new naver.maps.LatLngBounds(
      // 기본값 (sw, ne)
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    boundsRef.current = bounds;

    markers.current = places.map((place) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);

      const marker = new naver.maps.Marker({
        position: position,
        map: mapInstance.current || undefined,
        title: place.title,
      });

      // 마커 클릭시 지정한 좌표와 줌 레벨을 사용하는 새로운 위치로 지도를 이동
      // 유사한 함수 : setCenter, panTo
      naver.maps.Event.addListener(marker, 'click', () => {
        mapInstance.current?.morph(marker.getPosition(), 18, {
          duration: 1000,
          easing: 'easeOutCubic',
        });
      });

      return marker;
    });
  };

  return (
    <div className='relative w-dvw h-dvh'>
      <div ref={mapElement} className='w-full h-full' />
    </div>
  );
};

export default MapSheet;
