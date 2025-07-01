import SollectWriteHeader from '../components/Sollect/SollectWrite/SollectWriteHeader';
import SolrouteMap from '../components/Solroute/SolrouteMap';
import SolroutePlace from '../components/Solroute/SolroutePlace';
import SolroutePlaceAddButton from '../components/Solroute/SolroutePlaceAddButton';
import SolrouteTitle from '../components/Solroute/SolrouteTitle';

const examples = [0, 1, 2, 3, 4, 5];

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
          <SolroutePlaceAddButton />
        </div>
      </div>
    </div>
  );
};

export default SollectWritePage;
