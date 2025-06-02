import SollectWritePlacese from '../components/Sollect/SollectWrite/SollectWritePlaces';

const SollectWritePlacePage = () => {
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <div className='w-full h-67 pt-24 pb-16 px-16 flex justify-center items-center text-primary-950 text-lg font-bold leading-tight'>
        쏠플러가 방문한 장소를 알려주세요!
      </div>
      <SollectWritePlacese />
    </div>
  );
};

export default SollectWritePlacePage;
