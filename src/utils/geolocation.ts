// 유저의 현재 위치를 반환하는 함수
// export const getUserLocation = async (): Promise<LatLngType> => {
//   try {
//     const position = await new Promise<GeolocationPosition>((res, rej) => {
//       navigator.geolocation.getCurrentPosition(res, rej);
//     });
//     return { lat: position.coords.latitude, lng: position.coords.latitude };
//   } catch {
//     return { lat: 37.5666805, lng: 126.9784147 }; // 기본 좌표 (서울 시청)
//   }
// };

// 위치 변경 감지 함수
export const watchUserLocation = (
  onSuccess: (pos: GeolocationPosition) => void,
  onError?: (err: GeolocationPositionError) => void
): number | null => {
  if (!navigator.geolocation) return null;

  return navigator.geolocation.watchPosition(onSuccess, onError, {
    enableHighAccuracy: true,
  });
};
