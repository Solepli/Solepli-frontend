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
        <TitleHeader title='성수동 모음' center onClick={handleClick}/>
        <p>장소 </p>
    </div>
  )
}

export default SolmarkPlacePreviewPage