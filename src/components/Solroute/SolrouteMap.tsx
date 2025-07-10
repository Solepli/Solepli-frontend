import React, { useEffect, useRef, useMemo } from 'react';
import {
  createMarkerObjectList,
  createMarkersBounds,
  initMap,
} from '../../utils/mapFunc';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';
import SolrouteNums26 from '../../assets/marker/solroute-nums-26.png';
import { SolroutePlacePreview } from '../../types';

interface SolrouteMapProps {
  placeInfosOnDisplay?: SolroutePlacePreview[];
}

const SolrouteMap: React.FC<SolrouteMapProps> = ({ placeInfosOnDisplay }) => {
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

  const { placeInfos, nextMarkers, setMarkers } = useSolrouteWriteStore(
    useShallow((state) => ({
      placeInfos: state.placeInfos,
      nextMarkers: state.nextMarkers,
      setMarkers: state.setMarkers,
    }))
  );

  // 데이터 소스 결정: props가 있으면 props 사용, 없으면 store 사용
  const currentPlaceInfos = useMemo(() => {
    return placeInfosOnDisplay?.length ? placeInfosOnDisplay : placeInfos;
  }, [placeInfosOnDisplay, placeInfos]);

  // 지도 초기화
  useEffect(() => {
    if (!mapElement.current || !polyline.current) return;

    // 지도 생성
    const map = initMap(mapElement, mapInstance, false);
    if (!map) return;

    // 폴리라인 설정
    polyline.current.setMap(map);

    return () => {
      const currentPolyline = polyline.current;
      if (currentPolyline) {
        currentPolyline.setMap(null);
      }
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  // 마커 및 폴리라인 업데이트
  useEffect(() => {
    if (!mapInstance.current || !currentPlaceInfos?.length) return;

    // 기존 마커 삭제
    const existingMarkers = nextMarkers;
    existingMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    // 폴리라인 초기화
    polyline.current.setPath([]);

    // 새 마커 생성 및 추가
    const { objectList } = createMarkerObjectList(currentPlaceInfos);
    objectList.forEach((marker, index) => {
      marker.setIcon({
        url: SolrouteNums26, // png 파일
        size: new naver.maps.Size(26, 26), // 화면에 나타나는 마커의 크기
        anchor: naver.maps.Position.CENTER, // 마커 중심 설정
        origin: new naver.maps.Point(index * 26, 0), // 이 원점 위치로부터 size 속성의 값만큼 화면에 노출 (x: 0, y: 0)
      });
      marker.setOptions('clickable', false);
      marker.setMap(mapInstance.current);
    });
    setMarkers(objectList);

    // 폴리라인 추가
    const path: naver.maps.LatLng[] = [];
    currentPlaceInfos.forEach((coord) => {
      path.push(new naver.maps.LatLng(coord.latitude, coord.longitude));
    });
    polyline.current.setPath(path);

    // 모든 마커를 포함하는 bounds 계산 및 지도 이동
    const bounds = createMarkersBounds(objectList);
    if (bounds) {
      // 3. 확장한 bounds 계산
      // const newBounds = expandBounds(bounds, mapInstance);
      // if (!newBounds) return;

      // 4. panToBounds와 padding 옵션을 사용하여 지도 이동 및 확대/축소
      mapInstance.current.panToBounds(
        bounds,
        {
          duration: 800,
          easing: 'easeOutCubic',
        },
        {
          top: 13,
          right: 13,
          bottom: 13,
          left: 13,
        }
      );

      // new naver.maps.Rectangle({
      //   map: mapInstance.current,
      //   strokeColor: '#0009c6', // 기존 마커 경계 : 파랑
      //   strokeOpacity: 0.8,
      //   strokeWeight: 1,
      //   fillColor: '#0009c6',
      //   fillOpacity: 0.1,
      //   bounds: bounds,
      // });

      // new naver.maps.Rectangle({
      //   map: mapInstance.current,
      //   strokeColor: '#f5725b', // 확장한 마커 경계 : 빨강
      //   strokeOpacity: 0.8,
      //   strokeWeight: 1,
      //   fillColor: '#f5725b',
      //   fillOpacity: 0.1,
      //   bounds: newBounds,
      // });
    }
  }, [currentPlaceInfos, setMarkers]);

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
