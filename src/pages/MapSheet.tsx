import React, { useEffect, useRef } from 'react';

const MapSheet: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const center = new naver.maps.LatLng(37.3595704, 127.105399);
    mapInstance.current = new naver.maps.Map(mapElement.current, {
      center: center,
      zoom: 16,
    });
  }, []);

  return <div ref={mapElement} className='w-dvw h-dvh' />;
};

export default MapSheet;
