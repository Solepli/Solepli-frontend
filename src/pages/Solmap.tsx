import React, { useEffect } from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchArea from '../components/Searching/SearchArea';
import SearchPanel from '../components/Searching/SearchPanel';
import { useSearchStore } from '../store/searchStore';
import { usePlaceStore } from '../store/placeStore';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces } from '../api/placeApi';
import MapSheet from './MapSheet';

const Solmap: React.FC = () => {
  const { isFocused } = useSearchStore();

  const setPlaces = usePlaceStore((state) => state.setPlaces);

  const { data, isLoading, error } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });
  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
    console.log(data);
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
        <SearchArea />
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
