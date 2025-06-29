import React, { useEffect, useRef } from 'react';
import {
  createMarkerObjectList,
  createMarkersBounds,
  initMap,
} from '../../utils/mapFunc';
import { MarkerInfoType } from '../../types';

interface SolrouteMapProps {
  markerInfoList: MarkerInfoType[];
}

const SolrouteMap: React.FC<SolrouteMapProps> = ({ markerInfoList }) => {
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
