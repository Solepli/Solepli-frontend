import React, { useEffect, useRef } from 'react';
import {
  createMarkerObjectList,
  createMarkersBounds,
  initMap,
} from '../../utils/mapFunc';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';

const SolrouteMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  const { placeCoords } = useSolrouteWriteStore(
    useShallow((state) => ({
      placeCoords: state.placeCoords,
    }))
  );

  useEffect(() => {
    if (!mapElement.current) return;

    const { objectList } = createMarkerObjectList(placeCoords);
    const bounds = createMarkersBounds(objectList);

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false, true, bounds);
    if (!map) return;

    return () => {
      map.destroy();
    };
  }, []);

  return (
    <div className='self-stretch h-214 bg-primary-100 overflow-hidden'>
      {mapInstance ? (
        <div ref={mapElement} className='w-full h-[112%]' />
      ) : (
        <div>지도 로딩중</div>
      )}
    </div>
  );
};

export default SolrouteMap;
