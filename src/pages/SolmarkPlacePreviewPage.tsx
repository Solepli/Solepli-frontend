import { useEffect } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesByCollectionId } from '../api/solmarkApi';
import { useSolmarkStore } from '../store/solmarkStore';

const SolmarkPlacePreviewPage = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();

  const { list, places, setPlaces } = useSolmarkStore();

  const handleClick = () => {
    navigate(-1);
  };

  const { data } = useQuery({
    queryKey: ['collectionPlaces', collectionId],
    queryFn: () => fetchPlacesByCollectionId(Number(collectionId)),
  });

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, []);

  return (
    <div>
      <TitleHeader
        title={list.collectionName || '저장 리스트'}
        center
        onClick={handleClick}
      />
      <div className='pt-58'>
        <p className='text-primary-950 text-sm py-24 px-16 pb-8'>
          장소 {places.length}개
        </p>
      </div>
    </div>
  );
};

export default SolmarkPlacePreviewPage;
