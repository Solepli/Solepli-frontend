import { useShallow } from 'zustand/shallow';
import HeaderBothText from '../../components/global/HeaderBothText';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import SolroutePlace from '../../components/Solroute/SolroutePlace';
import SolrouteTitle from '../../components/Solroute/SolrouteTitle';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LargeButton from '../../components/global/LargeButton';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { SolroutePayload, SolroutePreviewSummary } from '../../types';
import PreviewContentSummary from '../../components/Place/PreviewContentSummary';
import { toast } from 'react-toastify';
import Warn from '../../components/global/Warn';
import {
  editSolroute,
  getPlaceNearby,
  postSolroute,
} from '../../api/solrouteApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Modal from '../../components/global/Modal';
import { queryClient } from '../../main';
import Loading from '../../components/global/Loading';

const SolrouteWritePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isSolroute = location.pathname.includes('solroute');
  const solrouteIdToEdit = searchParams.get('solrouteId');

  const { icon, title, placeInfos, setPlaceInfos, reset } =
    useSolrouteWriteStore(
      useShallow((state) => ({
        icon: state.icon,
        title: state.title,
        placeInfos: state.placeInfos,
        setPlaceInfos: state.setPlaceInfos,
        reset: state.reset,
      }))
    );

  // 마지막으로 추가된 장소 id
  const lastPlaceId = useMemo(() => {
    return placeInfos.length > 0 ? placeInfos[placeInfos.length - 1].id : null;
  }, [placeInfos]);

  // 요청사항 : solrouteIdToEdit가 없을 때만 실행
  const { data: placeNearby } = useQuery({
    queryKey: ['placeNearby', lastPlaceId, solrouteIdToEdit],
    queryFn: () => getPlaceNearby(lastPlaceId!),
    enabled: !!lastPlaceId,
  });

  const editMutation = useMutation({
    mutationFn: (payload: SolroutePayload) =>
      editSolroute(Number(solrouteIdToEdit), payload),
    onSuccess: () => {
      // SolroutePage.tsx 데이터 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['solroutes'],
      });
      // SolrouteDetailPage.tsx 데이터 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['solroute'],
      });
    },
    onError: () => {
      toast(<Warn title='코스를 수정하는데 실패했습니다.' />);
    },
  });

  const postMutation = useMutation({
    mutationFn: (payload: SolroutePayload) => postSolroute(payload),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['solroutes'] });
      navigate(`/solroute`);
    },
    onError: () => {
      toast(<Warn title='코스를 등록하는데 실패했습니다.' />);
    },
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(placeInfos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaceInfos(items);
  };

  const validateToPost = () => {
    if (editMutation.isPending || postMutation.isPending) return false;
    if (!icon || !title || title.length === 0 || placeInfos.length === 0) {
      return false;
    }
    return true;
  };

  const submitSolroute = async () => {
    // placeInfos 추출 및 새로운 seq 지정
    const reorderPlaceInfos = placeInfos.map((p, index) => ({
      id: p.id,
      seq: index + 1,
      memo: p.memo,
    }));

    // 쏠루트 payload 생성
    const payload: SolroutePayload = {
      iconId: icon!,
      name: title!,
      placeInfos: reorderPlaceInfos!,
    };

    if (solrouteIdToEdit) {
      await editMutation.mutateAsync(payload);
    } else {
      await postMutation.mutateAsync(payload);
    }

    navigate(`/solroute`);
  };

  const handleRight = async () => {
    if (!icon) {
      toast(<Warn title='코스 아이콘을 선택해주세요.' />);
      return;
    } else if (!title || title.length === 0) {
      toast(<Warn title='제목을 입력해주세요.' />);
      return;
    } else if (placeInfos.length === 0) {
      toast(
        <Warn
          title='장소를 추가해주세요.'
          message='장소가 한 개 이상 추가되어야 쏠루트를 등록할 수 있어요.'
        />
      );
      return;
    }
    if (editMutation.isPending || postMutation.isPending) return;
    await submitSolroute();
  };

  const handleModalLeft = () => {
    reset();
    setShowDeleteModal(false);
    navigate('/solroute');
  };

  const handleModalRight = () => {
    // todo : 임시저장 기능 구현하기
    setShowDeleteModal(false);
    navigate('/solroute');
  };

  return (
    <div className='w-full h-full flex flex-col gap-10 relative overflow-hidden'>
      <div className='fixed top-0 left-0 right-0 z-10 '>
        <HeaderBothText
          leftText='취소'
          rightText='등록'
          onLeft={() => setShowDeleteModal(true)}
          onRight={handleRight}
          validation={validateToPost()}
        />
      </div>
      <div className='flex-1 overflow-y-auto mt-50'>
        <SolrouteTitle />
        <SolrouteMap />
        <div className='flex pt-24 pb-8 pl-16 items-center gap-10 self-stretch'>
          <p className='text-primary-950 text-sm not-italic font-normal leading-[150%] tracking-[-0.35px]'>
            장소 {placeInfos.length}개
          </p>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='placeList' direction='vertical'>
            {(provided) => (
              <div
                className='placeList'
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {placeInfos.map((place, i) => (
                  <Draggable
                    draggableId={place.id.toString()}
                    index={i}
                    key={place.id}>
                    {(provided) => (
                      <div {...provided.draggableProps} ref={provided.innerRef}>
                        <SolroutePlace
                          place={place}
                          key={place.id}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className='pt-24 pb-48 px-16'>
          <LargeButton
            text='장소 추가'
            onClick={() => {
              navigate('/solroute/add/place');
            }}
          />
        </div>
      </div>

      {/* 추천 장소 content */}
      {/* 수정 모드에서는 보이지 않음 */}
      {!solrouteIdToEdit && placeNearby && (
        <div className='flex flex-col border-t-10 border-solid border-primary-100'>
          <div className='flex py-24 px-16 pb-8 items-end border-b-1 border-solid border-primary-100'>
            <p className='grow text-primary-950 text-sm font-semibold leading-[150%] tracking-[-0.35px]'>
              이 장소는 어때요?
            </p>
          </div>
          <div>
            {placeNearby.map((place: SolroutePreviewSummary) => {
              return (
                <PreviewContentSummary
                  place={place}
                  isMarked={true}
                  key={place.id}
                  isSolroute={isSolroute}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 취소 버튼 확인 modal */}
      {showDeleteModal && (
        <Modal
          title='아직 작성 중인 내용이 있어요!'
          subtitle={
            '임시저장하지 않고 페이지를 벗어날 경우,\n 지금까지 작성된 내용이 사라지게 돼요.'
          }
          leftText='나가기'
          rightText='임시저장'
          onLeftClick={handleModalLeft}
          onRightClick={handleModalRight}
        />
      )}
      {
        <Loading
          active={editMutation.isPending || postMutation.isPending}
          text='쏠루트 작성 중'
        />
      }
    </div>
  );
};

export default SolrouteWritePage;
