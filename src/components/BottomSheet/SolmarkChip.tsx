import React from 'react';
import { useState } from 'react';

import heart from '../../assets/heart.svg';
import heartFill from '../../assets/heartFill.svg';
import { usePlaceStore } from '../../store/placeStore';
import { patchSolmark } from '../../api/solmarkApi';

interface SolmarkChipProps {
  label?: boolean;
  markCount?: number;
  placeId: number;
}

const SolmarkChip: React.FC<SolmarkChipProps> = ({
  placeId,
  label,
  markCount,
}) => {
  const { selectedPlace } = usePlaceStore();
  const [isSolmark, setIsSolmark] = useState(
    label ? selectedPlace?.isMarked : false
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 쏠마크칩 클릭 시 navigate 방지
    setIsSolmark((prev) => !prev);
    // TODO: solmark place api 추가
    const array: number[] = [1];
    const empty: number[] = [];
    console.log(isSolmark);

    if (isSolmark) {
      patchSolmark(placeId, empty, array);
    } else {
      patchSolmark(placeId, array, empty);
    }
  };

  return (
    <div onClick={handleClick}>
      {label ? (
        <div
          className={`flex w-58 h-32 p-2 border rounded-lg justify-center items-center 
        ${isSolmark ? 'border-chip-mark' : 'border-chip-bg-mark'}`}>
          <img
            src={isSolmark ? heartFill : heart}
            alt=''
            className='w-24 h-24'
          />
          <p
            className={`w-30 text-center text-xs ${isSolmark ? 'text-chip-mark' : 'text-chip-bg-mark'}`}>
            {markCount}
          </p>
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
