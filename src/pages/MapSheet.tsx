import React, { useEffect, useRef } from 'react';
import { places } from '../places';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapElement.current) return;

    const center = new naver.maps.LatLng(37.513213, 126.94656);
    mapInstance.current = new naver.maps.Map(mapElement.current, {
      center: center,
      zoom: 16,
    });
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    // 기존 마커 삭제
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];

    // 새로운 bounds 생성 (모든 마커를 포함하는 경계 박스)
    const bounds = new naver.maps.LatLngBounds(
      // 기본값
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );

    markers.current = places.map((place) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);

      const marker = new naver.maps.Marker({
        position: position,
        map: mapInstance.current || undefined,
        title: place.title,
      });

      return marker;
    });

    // 모든 마커를 포함하도록 지도 조정
    if (markers.current.length > 0) {
      mapInstance.current.fitBounds(bounds, {
        // bounds의 여백(margin) 설정 옵션
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      });
    }
  }, []);

  return <div ref={mapElement} className='w-dvw h-dvh' />;
};

export default MapSheet;
