import React from 'react';
import { useState } from 'react';

import heart from '../../assets/heart.svg';
import heartFill from '../../assets/heartFill.svg';

const SolmarkChip: React.FC = () => {
  const [isSolmark, setIsSolmark] = useState<boolean>(false);

  const handleClick = () => {
    setIsSolmark((prev) => !prev);
  };

  return (
    <div onClick={handleClick}>
      <div
        className={`w-24 h-24 border rounded-lg flex justify-center items-center 
            ${isSolmark ? 'bg-conic-45 from-gray-600 from-10% via-gray-400 via-70% to-gray-600 border-gray-600' : 'border-gray-400'}`}>
        <img src={isSolmark ? heartFill : heart} alt='' className='w-24 h-24' />
      </div>
    </div>
  );
};

export default SolmarkChip;
