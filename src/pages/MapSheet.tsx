import React, { useEffect, useRef } from 'react';
import { places } from '../places';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markers = useRef<naver.maps.Marker[]>([]);

  // 기본 좌표 (서울 시청)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultCenter = new naver.maps.LatLng(37.5666805, 126.9784147);

  useEffect(() => {
    if (!mapElement.current) return;

    // 현재 위치를 비동기로 가져와 지도 초기화
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        initMap(currentLocation);
      },
      () => {
        // 위치를 가져오지 못했을 경우 기본 좌표로 설정
        initMap(defaultCenter);
      }
    );
  }, [defaultCenter]);

  // 지도 초기화 함수
  const initMap = (center: naver.maps.LatLng) => {
    mapInstance.current = new naver.maps.Map(mapElement.current!, {
      center: center,
      zoom: 16,
    });
  };

  useEffect(() => {
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

    // 마커가 하나 이상 있을 경우, 경계에 맞춰 지도 이동
    // 유사한 함수 : fitBounds
    if (markers.current.length > 0) {
      mapInstance.current.panToBounds(
        bounds,
        {
          duration: 1000,
          easing: 'easeOutCubic',
        },
        {
          top: 30,
          right: 30,
          bottom: 200,
          left: 30,
        }
      );
    }

    return () => naver.maps.Event.clearListeners(markers, 'click');
  }, [mapInstance.current]);

  return <div ref={mapElement} className='w-dvw h-dvh' />;
};

export default MapSheet;
