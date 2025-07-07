import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import StatusChip from '../../components/Solroute/StatusChip';
import SolrouteDetailPlace from '../../components/Solroute/SolrouteDetailPlace';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSolroute, fetchSolroute } from '../../api/solrouteApi';
import { SolroutePlacePreview } from '../../types';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';
import EditDeletePopover from '../../components/global/EditDeletePopover';
import { useState } from 'react';
import Kebab from '../../assets/kebabGray.svg?react';
import { queryClient } from '../../main';

const SolrouteDetailPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
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

  const mutation = useMutation({
  mutationFn: () => deleteSolroute(Number(solrouteId)),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['solroutes'] });
  },
});

  if (isLoading) {
    return <>로딩 중...</>;
  }

  // 쏠루트 삭제
  const funcDelete = async () => {
    await mutation.mutateAsync();
    setShowMenu(false);
    navigate('/solroute');
  };

  // 쏠루트 수정
    const funcEdit = () => {
      console.log('쏠루트 수정입니다.');
      navigate('/solroute/write');
    }

  //여기 이후부턴 data에 값이 존재

  //map에 마커를 표시하기 위해 setPalceInfos를 설정
  setPlaceInfos(data.placeInfos);

  return (
    <>
      <div>
        <TitleHeader
          title={data.name}
          onClick={() => navigate(-1)}
          center
          iconId={data.iconId}>
          {/* 케밥 아이콘 */}
          <div
            className='w-42 h-42 flex justify-center items-center'
            onClick={() => setShowMenu(!showMenu)}>
            <Kebab />
          </div>
        </TitleHeader>
        {showMenu && <EditDeletePopover funcDelete={funcDelete} onEditClick={funcEdit} />}
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
