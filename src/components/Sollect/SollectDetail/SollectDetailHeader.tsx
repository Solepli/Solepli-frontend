import React from 'react';
import arrowTail from '../../../assets/arrowTail.svg';
import arrowTailWhite from '../../../assets/arrowTailWhite.svg';

import { useNavigate } from 'react-router-dom';

const SollectDetailHeader = ({ isTop }: { isTop: boolean }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-54 flex items-center fixed z-10 pl-9 ${isTop ? 'bg-transparent' : 'bg-white'} transition-colors duration-300`}
      onClick={() => navigate(-1)}>
      <img
        src={isTop ? arrowTailWhite : arrowTail}
        alt='arrowTail'
        className='rotate-180 w-30 h-30'
      />
    </div>
  );
};

export default SollectDetailHeader;
