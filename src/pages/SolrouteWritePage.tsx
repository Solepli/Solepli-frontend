import { useShallow } from 'zustand/shallow';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../components/Solroute/SolrouteMap';
import SolroutePlace from '../components/Solroute/SolroutePlace';
import SolroutePlaceAddButton from '../components/Solroute/SolroutePlaceAddButton';
import SolrouteTitle from '../components/Solroute/SolrouteTitle';
import { useSolrouteWriteStore } from '../store/solrouteWriteStore';
import { useEffect } from 'react';
import { MarkerInfoType, SolroutePlacePreview } from '../types';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../components/global/LargeButton';

const placeInfos: SolroutePlacePreview[] = [
  {
    id: 1,
    seq: 1,
    name: '리퍼크',
    detailedCategory: '카페',
    address: '서울특별시 강남구 강남대로 382 메리츠타워 1층',
    memo: '리퍼크 메모 어쩌구',
    category: 'cafe',
    latitude: 37.4969474,
    longitude: 127.0285793,
  },
  {
    id: 2,
    seq: 2,
    name: '양궁카페 로빈훗 강남점',
    detailedCategory: '양궁장',
    address: '서울특별시 강남구 강남대로110길 13',
    memo: ' 메모 어쩌구',
    category: 'entertainment',
    latitude: 37.5039947,
    longitude: 127.0259367,
  },
  {
    id: 20,
    seq: 3,
    name: '티틸 카페+바',
    detailedCategory: '카페',
    address: '서울특별시 강북구 노해로 42',
    memo: ' 메모 어쩌구',
    category: 'cafe',
    latitude: 37.6391587,
    longitude: 127.0229204,
  },
];

const makePlaceCoord = (
  placeInfos: SolroutePlacePreview[]
): MarkerInfoType[] => {
  const dataArray: MarkerInfoType[] = [];
  placeInfos.forEach((v) => {
    dataArray.push({
      id: v.id,
      category: v.category,
      latitude: v.latitude,
      longitude: v.longitude,
    });
  });
  return dataArray;
};

const SolrouteWritePage = () => {
  const navigate = useNavigate();
  const { setPlaceInfos, setPlaceCoords } = useSolrouteWriteStore(
    useShallow((state) => ({
      setPlaceInfos: state.setPlaceInfos,
      setPlaceCoords: state.setPlaceCoords,
    }))
  );

  // 쏠루트 코스 상세조회 api로 데이터 받아 왔을 때
  useEffect(() => {
    setPlaceInfos(placeInfos);
    setPlaceCoords(makePlaceCoord(placeInfos));
  }, []);

  const examples = [0, 1, 2, 3, 4, 5];
  
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
            장소 {examples.length}개
          </p>
        </div>
        {examples.map((e) => {
          return <SolroutePlace key={e} />;
        })}
        <div className='pt-24 pb-48 px-16'>
          {/* TODD:: solmark 페이지로 이동 */}
          <LargeButton text='장소 추가' onClick={() => {navigate('/solroute/write/search')}} />
        </div>
      </div>
    </div>
  );
};

export default SolrouteWritePage;
