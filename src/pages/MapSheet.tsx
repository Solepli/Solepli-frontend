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

    markers.current = places.map((place) => {
      const position = new naver.maps.LatLng(place.latitude, place.longitude);

      const marker = new naver.maps.Marker({
        position: position,
        map: mapInstance.current || undefined,
        title: place.title,
      });

      return marker;
    });
  });

  return <div ref={mapElement} className='w-dvw h-dvh' />;
};

export default MapSheet;
