import React, { useEffect } from 'react';
import { useState } from 'react';

import heart from '../../assets/heart.svg';
import heartFillWhite from '../../assets/heartFillWhite.svg';
import { usePlaceStore } from '../../store/placeStore';
import { patchSolmark } from '../../api/solmarkApi';
import LoginRequiredAction from '../../auth/LoginRequiredAction';

interface SolmarkChipProps {
  label?: boolean;
  markCount?: number;
  isMarked?: boolean;
  placeId: number;
}

const SolmarkChip: React.FC<SolmarkChipProps> = ({
  placeId,
  label,
  markCount,
  isMarked,
}) => {
  const { selectedPlace } = usePlaceStore();
  const [isSolmark, setIsSolmark] = useState(
    label ? selectedPlace?.isMarked : false
  );
  const [count, setCount] = useState(markCount ? markCount : 0);

  useEffect(() => {
    if (isMarked) {
      setIsSolmark(true);
    }
  }, []);

  const handleClick = () => {
    setIsSolmark((prev) => !prev);
    const array: number[] = [1];
    const empty: number[] = [];

    if (isSolmark) {
      patchSolmark(placeId, empty, array);
      setCount(count - 1);
    } else {
      patchSolmark(placeId, array, empty);
      setCount(count + 1);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <LoginRequiredAction onAction={handleClick}>
        {label ? (
          <div
            className={`flex w-58 h-32 p-2 border rounded-lg justify-center items-center 
        ${isSolmark ? 'border-chip-mark bg-chip-mark' : 'border-chip-bg-mark'}`}>
            <img
              src={isSolmark ? heartFillWhite : heart}
              alt=''
              className='w-24 h-24'
            />
            <p
              className={`w-30 text-center text-xs ${isSolmark ? 'text-white' : 'text-chip-bg-mark'}`}>
              {count}
            </p>
          </div>
        ) : (
          <div
            className={`flex w-24 h-24 border rounded-lg justify-center items-center 
        ${isSolmark ? 'bg-chip-mark border-chip-mark' : 'border-chip-bg-mark'}`}>
            <img
              src={isSolmark ? heartFillWhite : heart}
              alt=''
              className='w-24 h-24'
            />
          </div>
        )}
      </LoginRequiredAction>
    </div>
  );
};

export default SolmarkChip;
