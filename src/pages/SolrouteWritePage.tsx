import { useShallow } from 'zustand/shallow';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../components/Solroute/SolrouteMap';
import SolroutePlace from '../components/Solroute/SolroutePlace';
import SolrouteTitle from '../components/Solroute/SolrouteTitle';
import { useSolrouteWriteStore } from '../store/solrouteWriteStore';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../components/global/LargeButton';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

const SolrouteWritePage = () => {
  const navigate = useNavigate();

  const { placeInfos, setPlaceInfos } = useSolrouteWriteStore(
    useShallow((state) => ({
      placeInfos: state.placeInfos,
      setPlaceInfos: state.setPlaceInfos,
    }))
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(placeInfos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlaceInfos(items);
  };

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <div className='fixed top-0 left-0 right-0 z-10 '>
        <SollectWriteHeader
          leftText='취소'
          rightText='등록'
          onLeft={() => window.history.back()}
          onRight={() => console.log('완료 버튼 클릭')}
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
          <LargeButton text='장소 추가' onClick={() => {navigate('/solroute/add/place')}} />
        </div>
      </div>
    </div>
  );
};

export default SolrouteWritePage;
