import TitleHeader from '../../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import SolrouteMap from '../../components/Solroute/SolrouteMap';
import StatusChip from '../../components/Solroute/StatusChip';
import { SolroutePlacePreview } from '../../types';
import SolrouteDetailPlace from '../../components/Solroute/SolrouteDetailPlace';

const SolrouteDetailPage = () => {
  const navigate = useNavigate();
  const solroutePlaces: SolroutePlacePreview[] = [{
    id: 1,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 1,
    memo: 'asefa',
  },
  {
    id: 12,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 2,
    memo: '',
  },
    {
    id: 3,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 12,
    memo: 'sfasdf',
  },  {
    id: 12,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 2,
    memo: '',
  },
   {
    id: 12,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 2,
    memo: '줄바꿈\n테sfsfsfsafsdffsdfsdfasfasdfsasdfsefsfsfsefsfsfsfsfsfsfsfsfsesefsfessfsfsffsefsefsfsfsefsefsfsfse스트\neeasfsdfsdfsdf',
  },
   {
    id: 12,
    name: '몽중ㅣㅣㄱ',
    detailedCategory: '카페',
    address: 'dkssud',
    category: 'cafe',
    latitude: 17.3,
    longitude: 18.3,
    seq: 2,
    memo: 'sd',
  },
]
  return (
    <>
      <div>
        <TitleHeader title='dd' onClick={() => navigate(-1)} center />
      </div>
      <div className='mt-58'>
        <SolrouteMap />

        {/* 장소 개수 */}
        <div className='px-16 pt-16 pb-8 flex'>
          <div className='flex-1 text-primary-950 text-sm font-normal leading-tight start-end'>장소{solroutePlaces.length}개</div>
          <div className='py-4'>
          <StatusChip id={1} status={true} />

          </div>
        </div>
        {solroutePlaces.map(solroutePlace => 
            <SolrouteDetailPlace place={solroutePlace} key={solroutePlace.seq}/>
        )}
      </div>
    </>
  );
};

export default SolrouteDetailPage;
