import React from 'react';
import { useState } from 'react';

import heart from '../../assets/heart.svg';
import heartFill from '../../assets/heartFill.svg';

interface SolmarkChipProps {
  label?: boolean;
}

const SolmarkChip: React.FC<SolmarkChipProps> = ({ label }) => {
  const [isSolmark, setIsSolmark] = useState<boolean>(false);

  const handleClick = () => {
    setIsSolmark((prev) => !prev);
  };

  const gradient = 'bg-linear-120 from-gray-400 via-gray-600 to-gray-400 border-gray-600';

  return (
    <div onClick={handleClick}>
      {label ? (
        <div
          className={`flex w-58 h-32 p-2 border rounded-lg justify-center items-center 
        ${isSolmark ? gradient : 'border-gray-400'}`}>
          <p
            className={`w-30 text-center text-xs ${isSolmark ? 'text-white' : 'text-gray-400'}`}>
            1
          </p>
          <img
            src={isSolmark ? heartFill : heart}
            alt=''
            className='w-24 h-24'
          />
        </div>
      ) : (
        <div
          className={`flex w-24 h-24 border rounded-lg justify-center items-center 
        ${isSolmark ? gradient : 'border-gray-400'}`}>
          <img
            src={isSolmark ? heartFill : heart}
            alt=''
            className='w-24 h-24'
          />
        </div>
      )}
    </div>
  );
};

export default SolmarkChip;
