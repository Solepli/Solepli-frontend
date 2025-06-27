import React from 'react';
import arrowTail from '../../../assets/arrowTail.svg';
import { useNavigate } from 'react-router-dom';

const SollectDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className='w-full h-54 flex items-center fixed z-10 bg-white pl-9'
      onClick={() => navigate(-1)}>
      <img src={arrowTail} alt='' className='rotate-180 w-30 h-30' />
    </div>
  );
};

export default SollectDetailHeader;
