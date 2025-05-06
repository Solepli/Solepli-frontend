import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';
import SearchArea from '../components/Searching/SearchArea';

const Solmap: React.FC = () => {
  return (
    <div className='h-full'>
      <SearchArea />

      <BottomSheet>
        <Outlet />
      </BottomSheet>
    </div>
  );
};

export default Solmap;
