import React, { useEffect, useRef } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchArea from '../components/Searching/SearchArea';
import SearchPanel from '../components/Searching/SearchPanel';
import { useSearchStore } from '../store/searchStore';
import { usePlaceStore } from '../store/placeStore';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '../api/placeApi';
import MapSheet from '../components/Map/MapSheet';
import MapSearchBar from '../components/Searching/MapSearchBar';
import { watchUserLocation } from '../utils/geolocation';
import { useMapStore } from '../store/mapStore';
import { useShallow } from 'zustand/shallow';

const Solmap: React.FC = () => {
  const watchIdRef = useRef<number | null>(null);

  const { isFocused } = useSearchStore();

  const setPlaces = usePlaceStore((state) => state.setPlaces);

  const { setUserLatLng } = useMapStore(
    useShallow((state) => ({
      setUserLatLng: state.setUserLatLng,
    }))
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });

  /* [useEffect] 위치 변경 감지 시작 */
  useEffect(() => {
    watchIdRef.current = watchUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatLng({ lat: latitude, lng: longitude });
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

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>에러 발생</p>;
  }

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
