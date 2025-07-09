import { useShallow } from 'zustand/shallow';
import SollectWriteHeader from '../../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import SolroutePlace from '../../components/Solroute/SolroutePlace';
import SolrouteTitle from '../../components/Solroute/SolrouteTitle';
import { useSolrouteWriteStore } from '../../store/solrouteWriteStore';
import { useNavigate } from 'react-router-dom';
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
import { getPlaceNearby, postSolroute } from '../../api/solrouteApi';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const SolrouteWritePage = () => {
  const navigate = useNavigate();
  const isSolroute = location.pathname.includes('solroute');

  const { icon, title, placeInfos, setPlaceInfos } = useSolrouteWriteStore(
    useShallow((state) => ({
      icon: state.icon,
      title: state.title,
      placeInfos: state.placeInfos,
      setPlaceInfos: state.setPlaceInfos,
    }))
  );

  const lastPlaceId = useMemo(() => {
    return placeInfos.length > 0 ? placeInfos[placeInfos.length - 1].id : null;
  }, [placeInfos]);

  const { data } = useQuery({
    queryKey: ['placeNearby', lastPlaceId],
    queryFn: () => getPlaceNearby(lastPlaceId!),
    enabled: !!lastPlaceId,
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(placeInfos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaceInfos(items);
  };

  const validateToPost = () => {
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

    const res = await postSolroute(payload); // boolean
    if (!res) {
      toast(<Warn title='코스를 등록하는데 실패했습니다.' />);
      return;
    }

    navigate(`/solroute`);
  };

  const handleRight = async () => {
    if (!icon) {
      toast(<Warn title='코스 아이콘을 선택해주세요.' />);
      return;
    } else if (!title || title.length === 0) {
      toast(<Warn title='코스명을 입력해주세요.' />);
      return;
    } else if (placeInfos.length === 0) {
      toast(<Warn title='아직 장소가 추가되지 않았어요!' />);
      return;
    }
    await submitSolroute();
  };

  return (
    <div className='w-full h-full flex flex-col gap-10 relative overflow-hidden'>
      <div className='fixed top-0 left-0 right-0 z-10 '>
        <SollectWriteHeader
          leftText='취소'
          rightText='등록'
          onLeft={() => window.history.back()}
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

      {data && (
        <div className='flex flex-col border-t-10 border-solid border-primary-100'>
          <div className='flex py-24 px-16 pb-8 items-end border-b-1 border-solid border-primary-100'>
            <p className='grow text-primary-950 text-sm font-semibold leading-[150%] tracking-[-0.35px]'>
              이 장소는 어때요?
            </p>
          </div>
          <div>
            {data.map((place: SolroutePreviewSummary) => {
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
    </div>
  );
};

export default SolrouteWritePage;
