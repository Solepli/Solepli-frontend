import SolmarkTab from '../components/Solmark/SolmarkTab';
import { Outlet } from 'react-router-dom';

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
};

export default SolmarkPage;
