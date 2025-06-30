import React, { useEffect, useRef } from 'react';
import {
  addMarkers,
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

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false);
    if (!map) return;

    return () => {
      map.destroy();
    };
  }, []);

  /* [useEffect] placeCoords 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current) return;

    // 마커 객체 생성
    const { objectList } = createMarkerObjectList(placeCoords);

    // 마커 추가
    addMarkers(mapInstance, objectList);

    // 지도 이동
    const bounds = createMarkersBounds(objectList);
    if (!bounds) return;
    mapInstance.current.fitBounds(bounds, {
      top: 24,
      right: 0,
      bottom: 24,
      left: 0,
    });
  }, [placeCoords]);

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
