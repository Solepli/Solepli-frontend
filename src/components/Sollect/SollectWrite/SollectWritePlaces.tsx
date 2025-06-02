import { useNavigate } from 'react-router-dom';

const PlaceAddButton = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-48 rounded-lg bg-primary-700 flex justify-center items-center text-primary-50 text-sm font-normal leading-tight'
      onClick={() => {
        navigate('/sollect/write/search');
      }
    }>
      장소 추가하기
    </div>
  );
};

const SollectWritePlacese = () => {
  return (
    <div className='flex-1 flex flex-col px-16 gap-12 overflow-y-auto'>
      <div className=''></div>
      <PlaceAddButton />
    </div>
  );
};

export default SollectWritePlacese;
