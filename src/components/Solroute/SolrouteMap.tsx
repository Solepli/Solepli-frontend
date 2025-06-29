import React, { useEffect, useRef } from 'react';
import {
  createMarkerObjectList,
  createMarkersBounds,
  initMap,
} from '../../utils/mapFunc';

const markerInfoList = [
  {
    id: 1,
    latitude: 37.4969474,
    longitude: 127.0285793,
    category: 'cafe',
    isMarked: false,
  },
  {
    id: 2,
    latitude: 37.5039947,
    longitude: 127.0259367,
    category: 'entertainment',
    isMarked: false,
  },
  {
    id: 3,
    latitude: 37.4997641,
    longitude: 127.027458,
    category: 'entertainment',
    isMarked: false,
  },
];

// interface SolrouteMapProps {}

const SolrouteMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  useEffect(() => {
    if (!mapElement.current) return;

    const { objectList } = createMarkerObjectList(markerInfoList);
    const bounds = createMarkersBounds(objectList);

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false, true, bounds);
    if (!map) return;

    return () => {
      map.destroy();
    };
  }, []);

  return (
    <>
      {mapInstance ? (
        <div
          ref={mapElement}
          className='self-stretch h-214 pt-66 pb-8 bg-primary-100'
        />
      ) : (
        <div>지도 로딩중</div>
      )}
    </>
  );
};

export default SolrouteMap;
