import React, { useEffect, useRef } from 'react';
import {
  addMarkers,
  createMarkerObjectList,
  createMarkersBounds,
  deleteMarkers,
  expandBounds,
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
    if (!mapElement.current || !polyline.current) return;

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false);
    if (!map) return;

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

    // 1. 마커 객체 생성
    const { objectList } = createMarkerObjectList(placeCoords);
    /* todo : 순서에 맞는 아이콘 지정 */
    // objectList.forEach((v, i) => {
    //   v.setIcon({
    //     url: '', // 01-50 png 파일
    //     size: new naver.maps.Size(24, 24), // 화면에 나타나는 마커의 크기
    //     anchor: naver.maps.Position.CENTER,
    //     origin: new naver.maps.Point(i * 24, 0), // 이 원점 위치로부터 size 속성의 값만큼 화면에 노출 (x: 0, y: 0)
    //   });
    //   v.setOptions('clickable', false);
    // });
    setMarkers(objectList);

    // 2. 모든 마커를 포함하는 bounds 계산
    const bounds = createMarkersBounds(objectList);
    if (!bounds) return;

    // 3. 확장한 bounds 계산
    const newBounds = expandBounds(bounds, mapInstance);
    if (!newBounds) return;

    // 4. panToBounds와 padding 옵션을 사용하여 지도 이동 및 확대/축소
    mapInstance.current.panToBounds(newBounds, {
      duration: 800,
      easing: 'easeOutCubic',
    });

    new naver.maps.Rectangle({
      map: mapInstance.current,
      strokeColor: '#0009c6', // 기존 마커 경계 : 파랑
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#0009c6',
      fillOpacity: 0.1,
      bounds: bounds,
    });

    new naver.maps.Rectangle({
      map: mapInstance.current,
      strokeColor: '#f5725b', // 확장한 마커 경계 : 빨강
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#f5725b',
      fillOpacity: 0.1,
      bounds: newBounds,
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
