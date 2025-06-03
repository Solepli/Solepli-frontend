import { LatLngType } from '../types';

// 유저의 현재 위치를 반환하는 함수
// (지금은 사용자의 현재 좌표를 서울 지역으로 하드코딩)
export const getUserLocation = async (): Promise<LatLngType> => {
  try {
    // const position = await new Promise<GeolocationPosition>((res, rej) => {
    //   navigator.geolocation.getCurrentPosition(res, rej);
    // });
    // return new naver.maps.LatLng(position.coords.latitude, position.coords.latitude);
    return { lat: 37.51234, lng: 127.060395 };
  } catch {
    return { lat: 37.5666805, lng: 126.9784147 }; // 기본 좌표 (서울 시청)
  }
};

// 위치 변경 감지 함수
// export const watchUserLocation = (
//   onSuccess: (pos: GeolocationPosition) => void,
//   onError?: (err: GeolocationPositionError) => void
// ): number | null => {
//   if (!navigator.geolocation) return null;

//   return navigator.geolocation.watchPosition(onSuccess, onError, {
//     enableHighAccuracy: true,
//   });
// };
