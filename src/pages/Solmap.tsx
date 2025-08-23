import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchPanel from '../components/Searching/SearchPanel';
import { useSearchStore } from '../store/searchStore';
import MapSheet from '../components/Map/MapSheet';
import MapSearchBar from '../components/Searching/MapSearchBar';

const Solmap: React.FC = () => {
  const { isFocused } = useSearchStore();

  return (
    <div className='h-dvh w-full'>
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
