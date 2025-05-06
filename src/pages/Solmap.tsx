import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchArea from '../components/Searching/SearchArea';
import SearchPanel from '../components/Searching/SearchPanel';
import useSearchStore from '../store/searchStore';

const Solmap: React.FC = () => {
  const { isFocused } = useSearchStore();

  return (
    <div className='h-full'>
      {!isFocused && (
        <div className='z-50 fixed top-0 inset-x-0'>
          <SearchArea />
        </div>
      )}

      {isFocused && <SearchPanel />}

      <BottomSheet>
        <Outlet />
      </BottomSheet>
    </div>
  );
};

export default Solmap;
