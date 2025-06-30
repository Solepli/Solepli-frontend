import React, { useEffect, useRef } from 'react';
import {
  addMarkers,
  createMarkerObjectList,
  createMarkersBounds,
  deleteMarkers,
  initMap,
} from '../../utils/mapFunc';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';

const SolrouteMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const polyline = useRef<naver.maps.Polyline>(
    new naver.maps.Polyline({
      map: undefined,
      path: [],
      strokeColor: '#394C42',
      strokeWeight: 2,
    })
  );

  const { placeCoords, nextMarkers, prevMarkers, setMarkers } =
    useSolrouteWriteStore(
      useShallow((state) => ({
        placeCoords: state.placeCoords,
        nextMarkers: state.nextMarkers,
        prevMarkers: state.prevMarkers,
        setMarkers: state.setMarkers,
      }))
    );

  useEffect(() => {
    if (!mapElement.current) return;

    // 지도 생성
    const map = initMap(mapElement, mapInstance, true);
    if (!map) return;

    // 폴리라인 설정
    polyline.current.setMap(map);

    return () => {
      map.destroy();
    };
  }, []);

  /* [useEffect] placeCoords 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current) return;

    // 마커 객체 생성
    const { objectList } = createMarkerObjectList(placeCoords);
    setMarkers(objectList);

    // 지도 이동
    const bounds = createMarkersBounds(objectList);
    if (!bounds) return;
    mapInstance.current.fitBounds(bounds, {
      top: 48,
      right: 24,
      bottom: 24,
      left: 24,
    });
  }, [placeCoords]);

  /* [useEffect] 마커 삭제 */
  useEffect(() => {
    deleteMarkers(prevMarkers);

    // 폴리라인 삭제
    polyline.current.setPath([]);
  }, [prevMarkers]);

  /* [useEffect] 마커 추가 */
  useEffect(() => {
    if (!mapInstance.current) return;

    addMarkers(mapInstance, nextMarkers, true);

    // 폴리라인 추가
    const path = polyline.current.getPath();
    placeCoords.forEach((coord) => {
      path.push(new naver.maps.LatLng(coord.latitude, coord.longitude));
    });
  }, [nextMarkers]);

  return (
    <>
      {mapInstance ? (
        <div ref={mapElement} className='self-stretch h-214 bg-primary-100' />
      ) : (
        <div>지도 로딩중</div>
      )}
    </>
  );
};

export default SolrouteMap;
