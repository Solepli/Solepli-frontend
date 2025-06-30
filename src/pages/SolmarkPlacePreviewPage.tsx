import React from 'react'
import TitleHeader from '../components/global/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlacesByCollectionId } from '../api/solmarkApi';

const SolmarkPlacePreviewPage = () => {
    const navigate = useNavigate();
    const {collectionId} = useParams();

    const handleClick = () =>{
        navigate(-1);
    }

    const { data } = useQuery({
      queryKey: ['solmarkPlaces', collectionId],
      queryFn: () => fetchPlacesByCollectionId(Number(collectionId)),
    });

  return (
    <div>
      <TitleHeader title='저장 리스트' center onClick={handleClick} />
      <div className='pt-58'>
        <p className='text-primary-950 text-sm py-24 px-16 pb-8'>장소 {}</p>
      </div>
    </div>
  );
}

export default SolmarkPlacePreviewPage