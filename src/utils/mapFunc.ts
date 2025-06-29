import { MarkerInfoType } from '../types';
import { IconMarkerMap } from './icon';

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
        url: icon,
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
