import React from 'react';
import { useState } from 'react';

import heart from '../../assets/heart.svg';
import heartFill from '../../assets/heartFill.svg';

interface SolmarkChipProps {
  label?: boolean;
}

const SolmarkChip: React.FC<SolmarkChipProps> = ({ label }) => {
  const [isSolmark, setIsSolmark] = useState<boolean>(false);

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // 쏠마크칩 클릭 시 navigate 방지
    setIsSolmark((prev) => !prev);
    // TODO: solmark place api 추가
  };


  return (
    <div onClick={handleClick}>
      {label ? (
        <div
          className={`flex w-58 h-32 p-2 border rounded-lg justify-center items-center 
        ${isSolmark ? 'border-chip-mark' : 'border-chip-bg-mark'}`}>
          <p
            className={`w-30 text-center text-xs ${isSolmark ? 'text-chip-mark' : 'text-chip-bg-mark'}`}>
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
        ${isSolmark ? 'border-chip-mark' : 'border-chip-bg-mark'}`}>
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
