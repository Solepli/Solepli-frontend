import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import SollectWriteAddedPlace from './SollectWriteAddedPlace';

const PlaceAddButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className='w-full h-48 rounded-lg bg-primary-700 flex justify-center items-center text-primary-50 text-sm font-normal leading-tight'
      onClick={() => {
        navigate('/sollect/write/search');
      }}>
      장소 추가
    </div>
  );
};

const SollectWritePlacese = () => {
  const { places } = useSollectWriteStore(
    useShallow((state) => ({ places: state.places }))
  );

  return (
    <div className='flex-1 flex flex-col px-16 gap-12 overflow-y-auto'>
      {places.map((place) => (
        <SollectWriteAddedPlace
          key={place.id}
          place={place}
        />
      ))}
      <div className=''></div>
      <PlaceAddButton />
    </div>
  );
};

export default SollectWritePlacese;
