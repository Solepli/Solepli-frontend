import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import StatusChip from '../../components/Solroute/StatusChip';
import SolrouteDetailPlace from '../../components/Solroute/SolrouteDetailPlace';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSolroute, fetchSolroute } from '../../api/solrouteApi';
import { SolroutePlacePreview } from '../../types';
import EditDeletePopover from '../../components/global/EditDeletePopover';
import { useState } from 'react';
import Kebab from '../../assets/kebabGray.svg?react';
import { queryClient } from '../../main';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';

const SolrouteDetailPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { solrouteId } = useParams();

  const { setIcon, setTitle, setPlaceInfos, reset } = useSolrouteWriteStore(
    useShallow((state) => ({
      setIcon: state.setIcon,
      setTitle: state.setTitle,
      setPlaceInfos: state.setPlaceInfos,
      reset: state.reset,
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
    reset();
    navigate('/solroute');
  };

  // 쏠루트 수정
  const funcEdit = () => {
    setIcon(data.iconId);
    setTitle(data.name);
    setPlaceInfos(data.placeInfos);
    navigate(`/solroute/write?solrouteId=${solrouteId}`);
  };

  return (
    <>
      <div>
        <TitleHeader
          title={data.name}
          onClick={() => navigate('/solroute')}
          center
          iconId={data.iconId}>
          {/* 케밥 아이콘 */}
          <div
            className='w-42 h-42 flex justify-center items-center'
            onClick={() => setShowMenu(!showMenu)}>
            <Kebab />
          </div>
        </TitleHeader>
        {showMenu && (
          <EditDeletePopover funcDelete={funcDelete} onEditClick={funcEdit} />
        )}
      </div>
      <div className='mt-58'>
        <SolrouteMap placeInfosOnDisplay={data.placeInfos} />

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
