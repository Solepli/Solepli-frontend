import { NavigateFunction } from 'react-router-dom';
import { MarkerInfoType } from '../types';
import { IconMarkerMap } from './icon';
import MarkedMarker from '../assets/marker/markedMarker.svg?url';

// 마커를 객체로 생성 후 반환 (마커의 id List도 별도로 반환)
export const createMarkerObjectList = (
  markers: MarkerInfoType[]
): {
  objectList: naver.maps.Marker[];
  idList: number[];
} => {
  const objectList: naver.maps.Marker[] = [];
  const idList: number[] = [];

  if (!markers || markers.length === 0) return { objectList, idList };

  markers?.forEach((m: MarkerInfoType) => {
    const position = new naver.maps.LatLng(m.latitude, m.longitude);
    const icon = IconMarkerMap[m.category];
    const marker = new naver.maps.Marker({
      position: position,
      icon: {
        url: m.isMarked ? MarkedMarker : icon,
        anchor: naver.maps.Position.CENTER,
      },
    });
    objectList.push(marker);
    idList.push(m.id);
  });

  return { objectList, idList };
};

// 마커 객체 바운드 생성 후 반환 함수
export const createMarkersBounds = (
  objectList: naver.maps.Marker[]
): naver.maps.Bounds | undefined => {
  if (!objectList.length) return;

  const bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(0, 0),
    new naver.maps.LatLng(0, 0)
  );

  objectList.forEach((m: naver.maps.Marker) => {
    const position = new naver.maps.LatLng(
      m.getPosition().y,
      m.getPosition().x
    );
    bounds.extend(position);
  });

  return bounds;
};

// 지도 생성 함수
export const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  isGl: boolean = true,
  isBounds: boolean = false,
  lastBounds?: naver.maps.Bounds | undefined,
  lastZoom?: number,
  center?: naver.maps.LatLng
) => {
  if (!divRef.current) return;

  const MapOptions = {
    zoom: lastZoom,
    center: lastBounds?.getCenter() || center,
    gl: isGl,
    customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
    scaleControl: false,
    mapDataControl: false,
    logoControl: false,
    logoControlOptions: {
      position: naver.maps.Position.RIGHT_TOP,
    },
    keyboardShortcuts: false,
    disableKineticPan: false,
  } as naver.maps.MapOptions & {
    bounds?: naver.maps.Bounds;
  };
  // 조건부로 bounds 추가 (center, zoom 무시)
  if (isBounds && lastBounds) {
    MapOptions.bounds = lastBounds;
  }

  // divRef에 지도를 생성
  const map = new naver.maps.Map(divRef.current!, MapOptions);
  // mapRef에 객체 지정
  mapRef.current = map;

  return map;
};

// 마커 추가 함수
export const addMarkers = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  objectList: naver.maps.Marker[] | null,
  isClickAble: boolean = false,
  markerIdList?: number[] | null,
  navigate?: NavigateFunction
) => {
  if (!mapRef.current || !objectList) return;

  objectList.forEach((m: naver.maps.Marker, index: number) => {
    // 지도에 마커 객체 설정
    m.setMap(mapRef.current);

    // 이벤트 리스너 (마커 클릭)
    if (!isClickAble || !markerIdList || !navigate) return;
    naver.maps.Event.addListener(m, 'click', () => {
      mapRef.current?.morph(m.getPosition(), 18, {
        duration: 1000,
        easing: 'easeOutCubic',
      });

      const isSame = window.location.pathname.includes(
        `/map/detail/${markerIdList[index]}`
      );

      if (!isSame) {
        navigate(`/map/detail/${markerIdList[index]}`);
      }
    });
  });

  // const clustering = initCluster(markerObjectList, mapRef.current!);
  /* todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
   * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
   */
};

// 마커 제거 함수
export const deleteMarkers = (objectList: naver.maps.Marker[] | null) => {
  if (!objectList) return;

  objectList.forEach((m) => {
    m.setMap(null);
  });
};
