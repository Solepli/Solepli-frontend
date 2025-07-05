import { useShallow } from 'zustand/shallow';
import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../components/Solroute/SolrouteMap';
import SolroutePlace from '../components/Solroute/SolroutePlace';
import SolrouteTitle from '../components/Solroute/SolrouteTitle';
import { useSolrouteWriteStore } from '../store/solrouteWriteStore';
import { MarkerInfoType, SolroutePlacePreview } from '../types';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../components/global/LargeButton';

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
  const { placeInfos } = useSolrouteWriteStore(
    useShallow((state) => ({
      placeInfos: state.placeInfos,
    }))
  );

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
        {placeInfos.map((place) => {
          return <SolroutePlace key={place.id} place={place} />;
        })}
        <div className='pt-24 pb-48 px-16'>
          {/* TODD:: solmark 페이지로 이동 */}
          <LargeButton
            text='장소 추가'
            onClick={() => {
              navigate('/solroute/write/search');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SolrouteWritePage;
