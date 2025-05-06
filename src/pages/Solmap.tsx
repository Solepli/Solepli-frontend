import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import { Outlet } from 'react-router-dom';

const Solmap: React.FC = () => {
  return (
    <div>
      <BottomSheet>
        <Outlet />
      </BottomSheet>
    </div>
  );
};

export default Solmap;
