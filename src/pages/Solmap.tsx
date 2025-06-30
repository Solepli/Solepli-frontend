import React, { useEffect, useRef } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchPanel from '../components/Searching/SearchPanel';
import { useSearchStore } from '../store/searchStore';
import MapSheet from '../components/Map/MapSheet';
import MapSearchBar from '../components/Searching/MapSearchBar';
import { watchUserLocation } from '../utils/geolocation';
import { useMapStore } from '../store/mapStore';
import { useShallow } from 'zustand/shallow';

const Solmap: React.FC = () => {
  const watchIdRef = useRef<number | null>(null);

  const { isFocused } = useSearchStore();

  const { setUserLatLng } = useMapStore(
    useShallow((state) => ({
      setUserLatLng: state.setUserLatLng,
    }))
  );

  /* [useEffect] 위치 변경 감지 시작 */
  useEffect(() => {
    watchIdRef.current = watchUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatLng({ lat: latitude, lng: longitude }); // [원본 코드]
        // setUserLatLng({ lat: 37.51234, lng: 127.060395 }); // [대체 코드] 만약 본인 주변에 장소가 없다고 나온다면 이것을 주석을 풀어서 사용할 것 / todo : 배포할 때 풀어서 배포하기
      },
      (error) => {
        alert('사용자의 현재 위치를 불러올 수 없습니다.');
        console.error('위치 추적 중 에러 발생:', error.message);
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className='h-full'>
      <div className='z-100 fixed top-0 inset-x-0'>
        {/* SearchArea */}
        <MapSearchBar />
      </div>

      <MapSheet />

      {isFocused && <SearchPanel />}

      <BottomSheet>
        <Outlet />
      </BottomSheet>
    </div>
  );
};

export default Solmap;
