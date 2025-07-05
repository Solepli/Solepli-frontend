import SolmarkTab from '../components/Solmark/SolmarkTab';
import { Outlet } from 'react-router-dom';

const SolmarkPage = () => {
  return (
    <div>
      <h1 className='px-20 pt-24 pb-12 text-xl font-bold'>쏠마크</h1>
      {/* 탭바 */}
      <SolmarkTab />

      {/* 컨텐츠 */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SolmarkPage;
