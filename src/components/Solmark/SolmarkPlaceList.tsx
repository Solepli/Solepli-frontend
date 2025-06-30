import React, { useState } from 'react';
import heartFill from '../../assets/heartFill.svg';
import { useNavigate } from 'react-router-dom';

const SolmarkPlaceList = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  return (
    <div
      className='py-8 px-10 flex bg-white rounded-lg border-1 border-primary-200 items-center gap-10'
      onClick={() => navigate('/mark/place/list')}>
      <div className='w-40 h-40 p-8 bg-primary-50 rounded'>
        <img src={heartFill} alt='' />
      </div>
      <div>
        <p className='text-primary-950 text-sm font-bold'>저장 리스트</p>
        <p className='text-primary-600 text-xs'>장소 {count}개</p>
      </div>
    </div>
  );
};

export default SolmarkPlaceList;
