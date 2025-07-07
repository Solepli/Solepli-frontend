import { useQuery } from '@tanstack/react-query';
import { fetchSolroutes } from '../api/solrouteApi';
import SolrouteListCard from '../components/Solroute/SolroutePreviewCard';
import { SolroutePreview } from '../types';

const SolroutePage = () => {
  const { data, } = useQuery({
    queryKey: ['solroutes'],
    queryFn: () => fetchSolroutes(),
    
  });

  return (
    <div>
      <h1 className='px-20 pt-24 pb-12 text-xl font-bold'>쏠루트</h1>

      {/* 컨텐츠 */}
      <div className='p-16 flex flex-col gap-12'>
        {data &&
          data.map((preview: SolroutePreview, i: number) => {
            return <SolrouteListCard preview={preview} key={i} />;
          })}
      </div>
    </div>
  );
};

export default SolroutePage;
