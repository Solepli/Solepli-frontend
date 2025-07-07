// src/pages/sollect-write/SollectWriteLayout.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import TitleHeader from '../components/global/TitleHeader';

const SolroutePlaceAddLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-dvh flex flex-col relative overflow-hidden'>
      {/* header */}
      <TitleHeader title='장소 불러오기' onClick={() => navigate(-1)}/>

      {/* content */}
      <div className='mt-58 flex-1 overflow-y-auto'>
        <Outlet /> 
      </div>
    </div>
  );
};

export default SolroutePlaceAddLayout;
