import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../components/Solroute/SolrouteMap';
import SolroutePlaceAddButton from '../components/Solroute/SolroutePlaceAddButton';
import SolrouteTile from '../components/Solroute/SolrouteTitle';

const SollectWritePage = () => {
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
        <SolrouteTile />
        <SolrouteMap />
        <div className='pt-24 pb-48 px-16'>
          <SolroutePlaceAddButton />
        </div>
      </div>
    </div>
  );
};

export default SollectWritePage;
