import { useNavigate } from 'react-router-dom';
import { usePlaceStore } from '../../../store/placeStore';
import Arrow from './../../../assets/arrow.svg?react';

const ShowAllReviewsButton: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlace } = usePlaceStore();
  if (!selectedPlace) return <></>;

  return selectedPlace ? (
    <div
      onClick={() =>
        navigate(`/map/reviews/${selectedPlace.id}`, {
          state: { name: selectedPlace.name },
        })
      }
      className='w-full p-16 flex justify-center items-center cursor-pointer'>
      <span className='text-primary-500 text-xs font-normal underline leading-none'>
        리뷰 더보기
      </span>
      <Arrow />
    </div>
  ) : null;
};

export default ShowAllReviewsButton;
