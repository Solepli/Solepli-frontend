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
import SolrouteNums26 from '../../assets/marker/solroute-nums-26.png';

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

  const { placeInfos, nextMarkers, prevMarkers, setMarkers } =
    useSolrouteWriteStore(
      useShallow((state) => ({
        placeInfos: state.placeInfos,
        nextMarkers: state.nextMarkers,
        prevMarkers: state.prevMarkers,
        setMarkers: state.setMarkers,
      }))
    );

  useEffect(() => {
    if (!mapElement.current || !polyline.current) return;

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false);
    if (!map) return;
    map.setOptions('padding', {
      top: 24,
      right: 0,
      bottom: 24,
      left: 0,
    });

    // 폴리라인 설정
    polyline.current.setMap(map);

    return () => {
      if (polyline.current) {
        polyline.current.setMap(null);
      }
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  /* [useEffect] placeCoords 변경될 때 */
  useEffect(() => {
    if (!mapInstance.current || !placeCoords || placeCoords.length === 0)
      return;

    // 마커 객체 생성 및 아이콘 지정
    const { objectList } = createMarkerObjectList(placeInfos);
    objectList.forEach((v, i) => {
      v.setIcon({
        url: SolrouteNums26, // png 파일
        size: new naver.maps.Size(26, 26), // 화면에 나타나는 마커의 크기
        anchor: naver.maps.Position.CENTER, // 마커 중심 설정
        origin: new naver.maps.Point(i * 26, 0), // 이 원점 위치로부터 size 속성의 값만큼 화면에 노출 (x: 0, y: 0)
      });
      v.setOptions('clickable', false);
    });
    setMarkers(objectList);

    // 지도 이동
    const bounds = createMarkersBounds(objectList);
    if (!bounds) return;
    mapInstance.current.fitBounds(bounds, {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24,
    });
  }, [placeInfos]);

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
    placeInfos.forEach((coord) => {
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
