import { CurrentLatLng } from '../types';

export const getUserLatLng = async (): Promise<naver.maps.LatLng> => {
  try {
    // const position = await new Promise<GeolocationPosition>((res, rej) => {
    //   navigator.geolocation.getCurrentPosition(res, rej);
    // });
    // return new naver.maps.LatLng(position.coords.latitude, position.coords.latitude);
    // 사용자의 현재 좌표를 서울 지역으로 하드코딩
    return new naver.maps.LatLng(37.51234, 127.060395);
  } catch {
    return new naver.maps.LatLng(37.5666805, 126.9784147); // 기본 좌표 (서울 시청)
  }
};

export const getCurrentBounds = (
  InstanceCurrent: naver.maps.Map | null,
  callback: (latlng: CurrentLatLng) => void
) => {
  const bounds: naver.maps.Bounds = InstanceCurrent!.getBounds();
  callback({
    swY: bounds.minY(),
    swX: bounds.minX(),
    neY: bounds.maxY(),
    neX: bounds.maxX(),
  });
};

export const initMap = (
  divRef: React.RefObject<HTMLDivElement | null>,
  mapRef: React.RefObject<naver.maps.Map | null>,
  center: naver.maps.LatLng
) => {
  if (!divRef.current) {
    console.warn('ElementCurrent(mapElement.current)가 null입니다!');
    return;
  }

  const MapOptions = {
    center,
    zoom: 13,
    gl: true,
    customStyleId: import.meta.env.VITE_MAP_STYLE_ID,
  };
  const map = new naver.maps.Map(divRef.current!, MapOptions);
  mapRef.current = map;
  return map;
};
