import { useQuery } from '@tanstack/react-query';
import { fetchSolroutes } from '../../api/solrouteApi';
import SolrouteListCard from '../../components/Solroute/SolroutePreviewCard';
import { SolroutePreview } from '../../types';
import LargeButton from '../../components/global/LargeButton';
import { useNavigate } from 'react-router-dom';

const SolroutePage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['solroutes'],
    queryFn: () => fetchSolroutes(),
  });

  return (
    <div className='w-full h-full flex flex-col relative'>
      <h1 className='text-[#000] w-full fixed top-0 px-20 pt-24 pb-12 text-xl font-bold leading-[120%] tracking-[-0.5px] bg-white z-10'>
        쏠루트
      </h1>

      {/* 컨텐츠 */}
      <div className='mt-64 mb-64 px-16 flex flex-col gap-12 overflow-auto'>
        {data &&
          data.map((preview: SolroutePreview, i: number) => {
            return <SolrouteListCard preview={preview} key={i} />;
          })}
      </div>

      {/* 코스 추가 버튼 */}
      <div className='w-full px-16 absolute bottom-16'>
        <LargeButton
          text='코스 생성'
          onClick={() => navigate('/solroute/write')}
        />
      </div>
    </div>
  );
};

export default SolroutePage;
