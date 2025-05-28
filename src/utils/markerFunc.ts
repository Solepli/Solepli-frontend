import { MarkersInfoType } from '../types';
import { IconMarkerMap } from './icon';

export const addMarkers = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  markersInfo: MarkersInfoType[],
  setMarkersObject: (marker: naver.maps.Marker) => void
) => {
  if (!mapRef.current) return;

  // const bounds = new naver.maps.LatLngBounds(
  //   new naver.maps.LatLng(0, 0),
  //   new naver.maps.LatLng(0, 0)
  // );
  // boundsRef.current = bounds;

  markersInfo.map((place: MarkersInfoType) => {
    const position = new naver.maps.LatLng(place.latitude, place.longitude);
    // bounds.extend(position);

    const marker = new naver.maps.Marker({
      position: position,
      icon: {
        url: IconMarkerMap[place.category],
      },
    });
    marker.setMap(mapRef.current);
    setMarkersObject(marker);

    // 마커 클릭시 지정한 좌표와 줌 레벨을 사용하는 새로운 위치로 지도를 이동
    // 유사한 함수 : setCenter, panTo
    naver.maps.Event.addListener(marker, 'click', () => {
      mapRef.current?.morph(position, 18, {
        duration: 1000,
        easing: 'easeOutCubic',
      });
    });
  });
  // const clustering = initCluster(markedMarkers, mapRef.current);
  /*
   * todo : naver cloud api map forum에서 클러스터별 최상단 마커의 종류에 따른 (클러스터 아이콘) 설정이 가능하다고 답변받을시
   * clustering.setIcons([clusterIconList[카테고리]])를 사용하여 클러스터 아이콘 지정 구현
   */
};

export const deleteMarkers = (
  markersObject: naver.maps.Marker[],
  clearMarkersObject: () => void
) => {
  if (markersObject.length === 0) return;

  // boundsRef.current = null;
  markersObject.forEach((m) => {
    m.setMap(null);
  });
  clearMarkersObject();
};
