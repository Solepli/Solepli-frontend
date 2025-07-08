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
import { SolroutePreviewSummary } from '../../types';
import PreviewContentSummary from '../../components/Place/PreviewContentSummary';

// todo : 추천코스 백엔드 api 연결
const mockData: SolroutePreviewSummary[] = [
  {
    id: 133,
    name: '벌툰 파리지앵 강남본점',
    detailedCategory: '디저트 카페',
    category: 'entertainment',
    address: '서울특별시 서초구 강남대로65길 7 3층 만화카페 벌툰',
    latitude: 37.5002212,
    longitude: 127.0253161,
    recommendationPercent: 77,
    rating: 3.5,
    tags: ['조용한', '편안한', '고급스러운'],
  },
  {
    id: 2,
    name: '양궁카페 로빈훗 강남점',
    detailedCategory: '양궁장',
    category: 'entertainment',
    address: '서울특별시 강남구 강남대로110길 13',
    latitude: 37.582604,
    longitude: 126.983998,
    recommendationPercent: null,
    rating: null,
    tags: [],
  },
  {
    id: 199,
    name: '남산 야외 식물원',
    detailedCategory: '관광명소',
    category: 'walk',
    address: '서울특별시 용산구 이태원동 259-15',
    latitude: 37.5427327,
    longitude: 126.9936572,
    recommendationPercent: 82,
    rating: 2.8,
    tags: ['기념되는', '굳', '볼거리가 있는'],
  },
];

const SolrouteWritePage = () => {
  const navigate = useNavigate();
  const isSolroute = location.pathname.includes('solroute');

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
    <div className='w-full h-full flex flex-col gap-10 relative overflow-hidden'>
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
          <LargeButton
            text='장소 추가'
            onClick={() => {
              navigate('/solroute/add/place');
            }}
          />
        </div>
      </div>

      {mockData.length > 0 && (
        <div className='flex flex-col border-t-10 border-solid border-primary-100'>
          <div className='flex py-24 px-16 pb-8 items-end border-b-1 border-solid border-primary-100'>
            <p className='grow text-primary-950 text-sm font-semibold leading-[150%] tracking-[-0.35px]'>
              이 장소는 어때요?
            </p>
          </div>
          <div>
            {mockData.map((place: SolroutePreviewSummary) => {
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
