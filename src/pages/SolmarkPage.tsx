import React from 'react'
import SolmarkTab from '../components/Solmark/SolmarkTab'
import { Outlet, useLocation, useParams } from 'react-router-dom';
import SolmarkContentPlace from '../components/Solmark/SolmarkContentPlace';

const SolmarkPage = () => {
  return (
    <div>
      {/* 탭바 */}
      <SolmarkTab />

      {/* 컨텐츠 */}
      <div>
          <Outlet />
      </div>
    </div>
  );
}

export default SolmarkPage