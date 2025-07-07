import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import StatusChip from '../../components/Solroute/StatusChip';
import SolrouteDetailPlace from '../../components/Solroute/SolrouteDetailPlace';
import { useQuery } from '@tanstack/react-query';
import { fetchSolroute } from '../../api/solrouteApi';
import { SolroutePlacePreview } from '../../types';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';

const SolrouteDetailPage = () => {
  const navigate = useNavigate();
  const { solrouteId } = useParams();
  const { setPlaceInfos } = useSolrouteWriteStore(
    useShallow((state) => ({
      setPlaceInfos: state.setPlaceInfos,
    }))
  );
  const { data, isLoading } = useQuery({
    queryKey: ['solroute'],
    queryFn: () => fetchSolroute(Number(solrouteId)),
  });

  if (isLoading) {
    return <>로딩 중...</>;
  }

  //여기 이후부턴 data에 값이 존재

  //map에 마커를 표시하기 위해 setPalceInfos를 설정
  setPlaceInfos(data.placeInfos);

  return (
    <>
      <div>
        <TitleHeader title='dd' onClick={() => navigate(-1)} center />
      </div>
      <div className='mt-58'>
        <SolrouteMap />

        {/* 장소 개수 */}
        <div className='px-16 pt-16 pb-8 flex'>
          <div className='flex-1 text-primary-950 text-sm font-normal leading-tight start-end'>
            장소{data.placeInfos.length}개
          </div>
          <div className='py-4'>
            <StatusChip id={data.id} status={data.status} />
          </div>
        </div>
        {data.placeInfos.map((solroutePlace: SolroutePlacePreview) => (
          <SolrouteDetailPlace place={solroutePlace} key={solroutePlace.seq} />
        ))}
      </div>
    </>
  );
};

export default SolrouteDetailPage;
