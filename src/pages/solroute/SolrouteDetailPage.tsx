import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import StatusChip from '../../components/Solroute/StatusChip';
import SolrouteDetailPlace from '../../components/Solroute/SolrouteDetailPlace';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteSolroute, fetchSolroute } from '../../api/solrouteApi';
import { SolroutePlacePreview } from '../../types';
import EditDeletePopover from '../../components/global/EditDeletePopover';
import { useCallback, useEffect, useRef, useState } from 'react';
import Kebab from '../../assets/kebabGray.svg?react';
import { queryClient } from '../../main';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useShallow } from 'zustand/shallow';
import Loading from '../../components/global/Loading';

const SolrouteDetailPage = () => {
  const navigate = useNavigate();
  const { solrouteId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [topHeight, setTopHeight] = useState<number>(400);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_A_HEIGHT = 214;
  const MAX_A_HEIGHT = 400;

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const newTopHeight = mouseY;
      const constrainedHeight = Math.min(
        Math.max(newTopHeight, MIN_A_HEIGHT),
        MAX_A_HEIGHT
      );

      setTopHeight(constrainedHeight);
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const touchY = e.touches[0].clientY - rect.top;
      const newTopHeight = touchY;
      const constrainedHeight = Math.min(
        Math.max(newTopHeight, MIN_A_HEIGHT),
        MAX_A_HEIGHT
      );

      setTopHeight(constrainedHeight);
      e.preventDefault();
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);

      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);

      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);

      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

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

  if (isLoading) {
    return <></>;
  }

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
            className='w-42 h-42 flex justify-center items-center button'
            onClick={() => setShowMenu(!showMenu)}>
            <Kebab />
          </div>
        </TitleHeader>
        {showMenu && (
          <EditDeletePopover funcDelete={funcDelete} onEditClick={funcEdit} />
        )}
      </div>

      <div ref={containerRef} className='pt-50 flex flex-col h-screen'>
        {/* 지도 컨테이너 */}
        <div style={{ height: `${topHeight}px` }}>
          <SolrouteMap
            placeInfosOnDisplay={data.placeInfos}
            mapHeight={topHeight}
          />
        </div>

        {/* 장소 정보 컨테이너 */}
        <div
          className='flex flex-col grow'
          style={{ height: `calc(100vh - ${topHeight}px)` }}>
          <div
            className='px-16 pt-16 pb-8 flex'
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}>
            <div className='flex-1 text-primary-950 text-sm font-normal leading-tight start-end'>
              장소{data.placeInfos.length}개
            </div>
            <div className='py-4'>
              <StatusChip id={data.id} status={data.status} />
            </div>
          </div>
          <div className='flex flex-col overflow-y-auto h-fit'>
            {data.placeInfos.map((solroutePlace: SolroutePlacePreview) => (
              <SolrouteDetailPlace
                place={solroutePlace}
                key={solroutePlace.seq}
              />
            ))}
          </div>
        </div>
      </div>

      {<Loading active={isLoading} text='쏠루트 삭제 중' />}
    </>
  );
};

export default SolrouteDetailPage;
