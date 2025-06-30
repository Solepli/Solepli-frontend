import React, { useState } from 'react';
import heartFill from '../../assets/heartFill.svg';
import { useNavigate } from 'react-router-dom';
import { SolmarkPlaceList } from '../../types';

interface SolmarkPlaceListProps {
  list:SolmarkPlaceList;
}

const SolmarkPlaceListCard:React.FC<SolmarkPlaceListProps> = ({list}) => {
  const navigate = useNavigate();

  return (
    <div
      className='py-8 px-10 flex bg-white rounded-lg border-1 border-primary-200 items-center gap-10'
      onClick={() => navigate(`/mark/place/list/${list.collectionId}`)}>
      <div className='w-40 h-40 p-8 bg-primary-50 rounded'>
        <img src={heartFill} alt='' />
      </div>
      <div>
        <p className='text-primary-950 text-sm font-bold'>{list.collectionName}</p>
        <p className='text-primary-600 text-xs'>장소 {list.placeCount}개</p>
      </div>
    </div>
  );
};

export default SolmarkPlaceListCard;
